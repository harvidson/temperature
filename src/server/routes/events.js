'use strict';

const express = require('express')
const knex = require('../knex')
const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const jwt = require('jsonwebtoken');
const {camelizeKeys, decamelizeKeys} = require('humps');
const moment = require('moment')

const router = express.Router();

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized.'));
    }
    req.claim = payload;
    next();
  });
};

//get all of a user's events
router.get('/', authorize, (req, res, next) => {
  const userId = req.claim.userId;
  const eventsLeading = [];
  const promises = [];

  knex('events_users').where('user_id', userId).then((rows) => {

    for (const row of rows) {
      promises.push(promisifyEvent(row))
    }

    return Promise.all(promises)
  }).then((events) => {
    const lead = [];
    for (const event of events) {
      if (event.is_lead) {
        eventsLeading.push(event)
      }
      if (event.is_participant) {
        lead.push(getLead(event))
      }
    }
    return Promise.all(lead)
  }).then((eventsWriting) => {
    res.send({leading: eventsLeading, writing: eventsWriting})
  }).catch((err) => {
    console.log(err);
    next(err)
  });

  function promisifyEvent(row) {
    const isLead = row.is_lead;
    const isParticipant = row.is_participant;

    return new Promise((resolve, reject) => {
      knex('events').where('id', row.event_id).first().then((event) => {
        if (isLead) {
          event.is_lead = true;
        } else {
          event.is_lead = false;
        }

        if (isParticipant) {
          event.is_participant = true;
        } else {
          event.is_participant = false;
        }
        resolve(event)
      }).catch((err) => {
        reject(err);
      })
    })
  }

  function getLead(event) {
    return knex('events_users').where({'event_id': event.id, 'is_lead': true}).first().then((lead) => {
      return knex('users').where('id', lead.user_id).first()
    }).then((user) => {
      const name = user.first_name + ' ' + user.last_name;
      event.lead = name;
      return Promise.resolve(event);
    })
  }
});

//add new event
router.post('/', authorize, (req, res, next) => {
  const userId = req.claim.userId;
  let newEvent;
  const registered = [];
  const notRegistered = [];
  let gotLead = false;

  knex('events')
  .insert({
    title: req.body.title,
    description: req.body.description,
    default_prompt: req.body.defaultPrompt
  }, '*')
  .then((event) => {
    newEvent = camelizeKeys(event[0])
    const eventParticipants = []

    for (const participant of req.body.participants) {
      eventParticipants.push(checkParticipant(participant))
    }

    return Promise.all(eventParticipants)
  }).then((eventParticipants) => {
    const participantsAdded = []

    for (const p of eventParticipants) {
      if (p.id) {
        registered.push(p.email)
        if (p.lead) {
          gotLead = true;
        }
        participantsAdded.push(addParticipant(p))

      } else {
        notRegistered.push(p.email)
      }
    }
    newEvent.participants = {
      registered,
      notRegistered
    }

    if (!gotLead)
      participantsAdded.push(addLead())
    return Promise.all(participantsAdded)
  }).then((participantsAdded) => {
    res.send(newEvent)
  }).catch((err) => {
    console.log(err);
    next(err)
  });

  function checkParticipant(email) {
    const participant = {
      id: null,
      email: email,
      lead: false
    }
    return knex('users').where('email', email).first().then((row) => {
      if (!row) {
        return Promise.resolve(participant)
      } else {
        participant.id = row.id
        if (participant.id === userId)
          participant.lead = true;
        return Promise.resolve(participant)
      }
    })
  }

  function addParticipant(p) {
    return knex('events_users').insert({
      event_id: newEvent.id,
      user_id: p.id,
      is_lead: p.lead,
      is_participant: true
    }, '*').then((row) => {
      return Promise.resolve(row)
    })
  }

  function addLead() {
    return knex('events_users').insert({
      event_id: newEvent.id,
      user_id: userId,
      is_lead: true,
      is_participant: false
    }, '*').then((row) => {
      return Promise.resolve(row)
    })
  }
});

//get a single event
router.get('/:id', authorize, (req, res, next) => {
  const eventId = Number.parseInt(req.params.id);
  const userId = req.claim.userId;
  let isLead;
  let isParticipant;

  if (Number.isNaN(eventId)) {
    return next(boom.create(404, 'Not found.'));
  }

  //check that user is involved in this event
  knex('events_users').where({'event_id': eventId, 'user_id': userId}).then((rows) => {
    isLead = rows[0].is_lead
    isParticipant = rows[0].is_participant
    if (!rows)
      return next(boom.create(401, 'Unauthorized.'));

    return knex('events').where('id', eventId).first()
  }).then((event) => {
    event.is_lead = isLead
    event.is_participant = isParticipant
    res.send(event)
  })
});

//participants: get iterations for an event, and any reflections written
router.get('/:id/writer', authorize, (req, res, next) => {
  const eventId = Number.parseInt(req.params.id);
  const userId = req.claim.userId;
  const iterations = []

  if (Number.isNaN(eventId)) {
    return next(boom.create(404, 'Not found.'));
  }
  //check that user is a participant in this event
  knex('events_users').where({'event_id': eventId, 'user_id': userId, 'is_participant': true}).then((rows) => {
    if (!rows)
      return next(boom.create(401, 'Unauthorized.'));

    //get all iterations of event
    return knex('iterations').where('event_id', eventId).whereNull('iterations.deleted_at').orderBy('due_date', 'desc')
  }).then((iterations) => {
    console.log(iterations);
    const array = []

    //look for a reflection for each iteration
    for (const i of iterations) {
      array.push(getReflection(i))
    }

    return Promise.all(array)

  }).then(iterationsWithReflections => {
    res.send(iterationsWithReflections)
  }).catch((err) => {
    console.log(err);
  });

  function getReflection(iteration) {
    return knex('reflections').where({iteration_id: iteration.id, user_id: userId}).first().then((reflection) => {
      if (!reflection)
        throw new NotAnError()

      iteration.reflection = reflection

      return knex('one_words').where('id', reflection.one_word_id).first()
    }).then((row) => {
      iteration.reflection.one_word = row.word;
      iteration.reflection.one_word_analytics = row.word_analytics
      return Promise.resolve(iteration)
    }).catch((noReflections) => {
      if (noReflections instanceof NotAnError) {
        return Promise.resolve(iteration);
      }

      throw noReflections;
    })
  }

  class NotAnError {
    constructor() {}
  }
});

// TODO: convert this route to a query parameter (?role=lead; access by req.query property); could also put a limit on it
//leads: get full iterations for an event
router.get('/:id/iterations/lead', authorize, (req, res, next) => {
  const eventId = Number.parseInt(req.params.id);
  const userId = req.claim.userId;

  if (Number.isNaN(eventId) || userId < 0) {
    return next(boom.create(404, 'Not found.'));
  }

  knex('iterations')
  .select('iterations.id AS iteration_id', 'iterations.event_id', 'iterations.due_date', 'iterations.prompt', 'iterations.created_at AS iteration_created_at', 'iterations.is_anonymous', 'iterations.prompt', 'iterations.min_word_count', 'events_users.is_lead', 'events_users.is_participant')
  .leftJoin('events_users', 'events_users.event_id', 'iterations.event_id')
  .where({
    'iterations.event_id': eventId,
    'iterations.deleted_at': null,
    'events_users.user_id': userId,
    'events_users.is_lead': true
  })
  .orderBy('iterations.due_date', 'desc').then((iterations) => {
    res.send(iterations)
  }).catch((err) => {
    console.log(err);
  })
});

//get iterations and due_dates
router.get('/:id/dates', authorize, (req, res, next) => {
  const eventId = Number.parseInt(req.params.id);
  const userId = req.claim.userId;

  if (Number.isNaN(eventId) || userId < 0) {
    return next(boom.create(404, 'Not found.'));
  }

  knex('iterations').select('iterations.id', 'iterations.due_date').where({'iterations.event_id': eventId, 'iterations.deleted_at': null}).orderBy('iterations.due_date', 'desc').then((iterationDates) => {
    const dates = []

    for (const i of iterationDates) {
      const date = {
        value: i.id,
        label: moment(i.due_date).format('MMMM D, YYYY')
      }
      dates.push(date)
    }
    res.send(dates)
  }).catch((err) => {
    console.log(err);
  })
});

//post new iteration
router.post('/:id/iterations', authorize, (req, res, next) => {
  const eventId = Number.parseInt(req.params.id);
  const userId = req.claim.userId;

  if (Number.isNaN(eventId) || userId < 0) {
    return next(boom.create(404, 'Not found.'));
  }

  knex('iterations')
  .insert({
    event_id: eventId,
    due_date: req.body.dueDate,
    prompt: req.body.prompt,
    min_word_count: req.body.minWordCount,
    is_anonymous: req.body.isAnonymous
    }, '*')
  .then((iteration) => {
    res.send(iteration)
  }).catch((err) => {
    console.log(err);
    next(err)
  })
});

//get participants for an event
router.get('/:id/users', authorize, (req, res, next) => {
  const eventId = Number.parseInt(req.params.id);
  const userId = req.claim.userId;

  if (Number.isNaN(eventId) || userId < 0) {
    return next(boom.create(404, 'Not found.'));
  }

  //check that user is a lead in this event
  knex('events_users')
  .where({
    'event_id': eventId,
    'user_id': userId,
    'is_lead': true
  })
  .then((rows) => {
    if (!rows)
      return next(boom.create(401, 'Unauthorized.'));

    return knex('events_users')
      .where({
        'event_id': eventId,
        'is_participant': true
      })
    }).then((rows) => {
      if (!rows) res.send([])

      const participants = []

      for (const p of rows) {
        participants.push(getName(p.user_id))
      }
      return Promise.all(participants)
    }).then((participants) => {
      //sort alpha by last name
      participants.sort(function(a,b) {
        return (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1 : 0);
      } );

      res.send(participants);
    }).catch((err) => {
      console.log(err);
      next(err)
    })

    function getName(id) {
      return knex('users')
      .where('id', id)
      .first()
      .then((row) => {
        const participant = {
          id: id,
          email: row.email,
          firstName: row.first_name,
          lastName: row.last_name
        }
        return Promise.resolve(participant)
      })
    }
});

//add new participants to existing event
router.post('/:id/users', authorize, (req, res, next) => {
  const eventId = Number.parseInt(req.params.id);
  const userId = req.claim.userId;

  const registered = [];
  const notRegistered = [];
  const alreadyParticipant = [];
  const updatedParticipants = {};

  if (Number.isNaN(eventId) || userId < 0) {
    return next(boom.create(404, 'Not found.'));
  }

  //check that user is a lead in this event
  knex('events_users')
  .where({
    'event_id': eventId,
    'user_id': userId,
    'is_lead': true
  })
  .then((rows) => {
    if (!rows) return next(boom.create(401, 'Unauthorized.'));

    const checkedEmails = []
    for (const participant of req.body) {
      checkedEmails.push(checkEmail(participant))
    }
    return Promise.all(checkedEmails)
  }).then((checkedEmails) => {

    const newParticipants = []
    const participantsToCheck = []

    for (const p of checkedEmails) {
      if (p.id) {
        registered.push(p.email)
        participantsToCheck.push(p)
      } else {
        notRegistered.push(p.email)
      }
    }

    //check whether participant is already registered in this event
    for (const p of participantsToCheck) {
      newParticipants.push(checkParticipant(p))
    }

    return Promise.all(newParticipants)
  }).then((newParticipants) => {
    updatedParticipants.registered = registered,
    updatedParticipants.notRegistered = notRegistered,
    updatedParticipants.alreadyParticipant = alreadyParticipant

    res.send(updatedParticipants)
  }).catch((err) => {
    console.log(err);
    next(err)
});

//check whether participant has a registered email;
function checkEmail(email) {
  const participant = {
    id: null,
    email: email,
    lead: false
  }
  return knex('users')
    .where('email', email)
    .first()
    .then((row) => {
      if (!row) {
        return Promise.resolve(participant)
      } else {
        participant.id = row.id
        return Promise.resolve(participant)
      }
  })
}

// //check whether participant is already registered for this event
function checkParticipant(p) {
  const newParticipant = []

  return knex('events_users')
    .where({
      event_id: eventId,
      user_id: p.id
    })
    .first()
    .then((row) => {
      if (!row) {
        newParticipant.push(addParticipant(p))
      } else if (row && row.is_lead) {
          newParticipant.push(addLeadAsParticipant(p))
      } else {
        alreadyParticipant.push(p)
      };
    return Promise.resolve(newParticipant)
  })
}

  //add participant to event
  function addParticipant(p) {
    return knex('events_users')
      .insert({
        event_id: eventId,
        user_id: p.id,
        is_lead: p.lead,
        is_participant: true
      }, '*')
      .then((row) => {
        return Promise.resolve(row)
    })
  }

  //update lead as participant
  function addLeadAsParticipant(p) {
    return knex('events_users')
      .update({
        event_id: eventId,
        user_id: p.id,
        is_participant: true
      }, '*')
      .then((row) => {
        return Promise.resolve(row)
      })
  }
})



module.exports = router;
