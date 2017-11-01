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

//get all of a user's events [[authorize and update userId with req.claim.userId]]
router.get('/', authorize, (req, res, next) => {
  // console.log('req.claim inside events GET', req.claim);
  const userId = req.claim.userId;
  const eventsLeading = [];
  const eventsWriting = [];
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
      // console.log(events);
      for (const event of events) {
        if (event.is_lead) {
          eventsLeading.push(event)

        }
        if (event.is_participant) {
          eventsWriting.push(event)
        }
      }
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
});

//get user's reflections for an event
router.get('/:id/iterations', authorize, (req, res, next) => {
  const eventId = Number.parseInt(req.params.id);
  const userId = req.claim.userId;

  if (Number.isNaN(eventId) || userId < 0) {
    return next(boom.create(404, 'Not found.'));
  }

//get all iterations of event
  knex('iterations')
    .select('iterations.id AS iteration_id', 'iterations.event_id', 'iterations.due_date', 'iterations.prompt', 'iterations.created_at AS iteration_created_at', 'iterations.is_anonymous', 'reflections.id AS reflection_id', 'reflections.user_id', 'reflections.created_at AS reflection_created_at', 'reflections.title AS reflection_title', 'reflections.content AS reflection_content', 'reflections.text_analytics AS reflection_analytics', 'reflections.one_word_intensity', 'one_words.word AS one_word', 'one_words.word_analytics')
    .leftJoin('reflections', 'reflections.iteration_id', 'iterations.id', )
    .leftJoin('one_words', 'one_words.id', 'reflections.one_word_id')
    .leftJoin('events_users', 'events_users.event_id', 'iterations.event_id')
    .where({
      'iterations.event_id': eventId,
      'iterations.deleted_at': null,
      'events_users.user_id': userId
    })
    .orderBy('iterations.due_date', 'desc')
    .then((iterations) => {
      console.log('data');
      console.log(iterations);
      res.send(iterations)


    })
    .catch((err) => {
      console.log(err);


    })

  })














module.exports = router;
