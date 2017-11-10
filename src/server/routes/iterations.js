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

const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();

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


router.get('/:id', authorize, (req, res, next) => {
  const iterationId = Number.parseInt(req.params.id);
  let iteration;

  if (Number.isNaN(iterationId)) {
    return next(boom.create(404, 'Not found.'));
  }

  knex('iterations')
  .where('id', iterationId)
  .first()
  .then((row) => {
    console.log('iteration ', row);
    iteration = row

    return knex('events')
      .where('id', iteration.event_id)
      .first()
  })
  .then((event) => {
    iteration.event_title = event.title
    res.send(iteration)
  })
  .catch((err) => {
    console.log(err);
  })

})


//get a count of the number of reflections submitted for an iteration
router.get('/:id/reflections', authorize, (req, res, next) => {
  const iterationId = Number.parseInt(req.params.id);
  const userId = req.claim.userId


  if (Number.isNaN(iterationId)) {
    return next(boom.create(404, 'Not found.'));
  }

//check whether logged in user has lead access to this event
  knex('iterations')
  .where('id', iterationId)
  .first()
  .then((iteration) => {
    return knex('events_users')
    .where({
      'event_id': iteration.event_id,
      'is_lead': true
    })
    .first()
  })
  .then((row) => {
    if (row.user_id !== userId) {
      return next(boom.create(401, 'Unauthorized.'));
    }

    return knex.raw(`SELECT COUNT(*) AS reflections_in FROM reflections WHERE iteration_id=${iterationId}`)
  })
  .then((count) => {
    const number = count.rows[0].reflections_in
    res.send(number)
  })
  .catch((err) => {
    console.log(err);
    next(err)
  });
})

//post new reflection
router.post('/:id/reflections', authorize, (req, res, next) => {
  const iterationId = Number.parseInt(req.params.id);
  const userId = req.claim.userId;
  const text = req.body.title + ' ' + req.body.content;

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  if (Number.isNaN(iterationId)) {
    return next(boom.create(404, 'Not found.'));
  }

  //check that this user is a registered participant in this event
  knex('events_users')
  .where({
    event_id: req.body.event_id,
    user_id: userId,
    is_participant: true
  })
  .first()
  .then((row) => {
    console.log('row from events_users ', row);
    if (!row) {
      return next(boom.create(401, 'Unauthorized.'))
    }
  //check that user has not yet posted a reflection for this iteration
    return knex('reflections')
      .where({
        iteration_id: iterationId,
        user_id: userId,
      })
      .first()
  })
  .then((row) => {
    if (row) {
      return next(boom.create(401, 'Unauthorized.'))
    }
    //get sentiment analysis
    return client.analyzeSentiment({document: document})
  })
  .then(sentimentResults => {

    return knex('reflections')
    .insert({
      iteration_id: iterationId,
      user_id: userId,
      title: req.body.title,
      content: req.body.content,
      one_word_id: req.body.oneWord.value,
      one_word_intensity: req.body.oneWordIntensity,
      text_analytics: sentimentResults[0]
    }, '*')
  })
  .then((data) => {
    console.log(data);
    res.send(data)
  })
  .catch((err) => {
    console.log(err);
    next(err)
  });

})







module.exports = router;
