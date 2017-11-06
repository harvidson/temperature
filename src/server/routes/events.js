'use strict';

const express = require('express')
const knex = require('../knex')
const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const jwt = require('jsonwebtoken');
const {
  camelizeKeys,
  decamelizeKeys
} = require('humps');

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

  knex('events_users')
    .where('user_id', userId)
    .then((rows) => {

      for (const row of rows) {
        promises.push(promisifyEvent(row))
      }

      return Promise.all(promises)
    })
    .then((events) => {
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
    })
    .then((eventsWriting) => {
      res.send({
        leading: eventsLeading,
        writing: eventsWriting
      })
    })
    .catch((err) => {
      console.log(err);
      next(err)
    });


    function promisifyEvent(row) {
      const isLead = row.is_lead;
      const isParticipant = row.is_participant;

      return new Promise ((resolve,  reject) => {
        knex('events')
          .where('id', row.event_id)
          .first()
          .then((event) => {
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
          })
          .catch((err) => {
            reject(err);
          })
      })
    }

    function getLead(event) {
      return knex('events_users')
      .where({
        'event_id': event.id,
        'is_lead': true
      })
      .first()
      .then((lead) => {
        return knex('users')
          .where('id', lead.user_id)
          .first()
      })
      .then((user) => {
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
    })
    .then((eventParticipants) => {
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
      newEvent.participants = {registered, notRegistered}
      console.log(newEvent);

      if (!gotLead) participantsAdded.push(addLead())
      return Promise.all(participantsAdded)
    })
    .then((participantsAdded) => {
      console.log(participantsAdded);
      res.send(newEvent)
    })
    .catch((err) => {
      console.log(err);
      next(err)
    })

    function checkParticipant(email) {
      const participant = {id: null, email: email, lead: false}

      return knex('users')
      .where('email', email)
      .first()
      .then((row) => {
        if (!row) {
          return Promise.resolve(participant)
        } else {
          participant.id = row.id
          if (participant.id === userId) participant.lead = true;
          return Promise.resolve(participant)
        }
      })
    }

    function addParticipant(p) {
      return knex('events_users')
      .insert({
        event_id: newEvent.id,
        user_id: p.id,
        is_lead: p.lead,
        is_participant: true
      }, '*')
      .then((row) => {
        return Promise.resolve(row)
      })
    }

    function addLead() {
      return knex('events_users')
      .insert({
        event_id: newEvent.id,
        user_id: userId,
        is_lead: true,
        is_participant: false
      }, '*')
      .then((row) => {
        return Promise.resolve(row)
      })
    }


})

//participants: get iterations for an event, and any reflections written
router.get('/:id/writer', authorize, (req, res, next) => {
  const eventId = Number.parseInt(req.params.id);
  const userId = req.claim.userId;

  if (Number.isNaN(eventId) || userId < 0) {
    return next(boom.create(404, 'Not found.'));
  }


  // knex.raw(`SELECT iterations.id AS iteration_id, iterations.event_id, iterations.due_date, iterations.prompt, iterations.created_at AS iteration_created_at, iterations.is_anonymous, reflections.id AS reflection_id, reflections.user_id, reflections.created_at AS reflection_created_at, reflections.title AS reflection_title, reflections.content AS reflection_content, reflections.text_analytics AS reflection_analytics, reflections.one_word_intensity, one_words.word AS one_word, one_words.word_analytics, events_users.is_lead, events_users.is_participant
  //   FROM iterations
  //   LEFT JOIN reflections ON reflections.iteration_id = iterations.id
  //   LEFT JOIN one_words ON one_words.id = reflections.one_word_id
  //   LEFT JOIN events_users ON events_users.event_id = iterations.event_id
  //   WHERE iterations.event_id = ${eventId}
  //   AND iterations.deleted_at IS null AND events_users.user_id = ${userId}
  //   AND events_users.is_participant = true
  //   AND (reflections.user_id = ${userId} OR reflections.user_id IS null)`)

  //get all iterations of event
  knex('iterations')
    .select('iterations.id AS iteration_id', 'iterations.event_id', 'iterations.due_date', 'iterations.prompt', 'iterations.created_at AS iteration_created_at', 'iterations.is_anonymous', 'reflections.id AS reflection_id', 'reflections.user_id', 'reflections.created_at AS reflection_created_at', 'reflections.title AS reflection_title', 'reflections.content AS reflection_content', 'reflections.text_analytics AS reflection_analytics', 'reflections.one_word_intensity', 'one_words.word AS one_word', 'one_words.word_analytics', 'events_users.is_lead', 'events_users.is_participant')
    .leftJoin('reflections', 'reflections.iteration_id', 'iterations.id')
    .leftJoin('one_words', 'one_words.id', 'reflections.one_word_id')
    .leftJoin('events_users', 'events_users.event_id', 'iterations.event_id')
    .where({
      'iterations.event_id': eventId,
      'iterations.deleted_at': null,
      'events_users.user_id': userId,
      'events_users.is_participant': true,
      'reflections.user_id': userId
    })
    .orWhere({
      'iterations.event_id': eventId,
      'iterations.deleted_at': null,
      'events_users.user_id': userId,
      'events_users.is_participant': true,
      'reflections.user_id': null
    })
    .orderBy('iterations.due_date', 'desc')
    .then((iterations) => {
      res.send(iterations)
    })
    .catch((err) => {
      console.log(err);
    })
  })

//leads: get iterations for an event
  router.get('/:id/lead', authorize, (req, res, next) => {
    const eventId = Number.parseInt(req.params.id);
    const userId = req.claim.userId;

    if (Number.isNaN(eventId) || userId < 0) {
      return next(boom.create(404, 'Not found.'));
    }

    knex('iterations')
      .select('iterations.id AS iteration_id', 'iterations.event_id', 'iterations.due_date', 'iterations.prompt', 'iterations.created_at AS iteration_created_at', 'iterations.is_anonymous', 'events_users.is_lead', 'events_users.is_participant')
      .leftJoin('events_users', 'events_users.event_id', 'iterations.event_id')
      .where({
        'iterations.event_id': eventId,
        'iterations.deleted_at': null,
        'events_users.user_id': userId,
        // 'events_users.is_participant': false,
        'events_users.is_lead': true
      })
      .orderBy('iterations.due_date', 'desc')
      .then((iterations) => {
        res.send(iterations)
      })
      .catch((err) => {
        console.log(err);
      })
    })

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
          console.log(iteration);
          res.send(iteration)
        })
        .catch((err) => {
          console.log(err);
          next(err)
        })


    })















module.exports = router;
