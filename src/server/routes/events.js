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
router.get('/', (req, res, next) => {
  const userId = 4;
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
      console.log(events);
      for (const event of events) {
        if (event.is_lead) {
          eventsLeading.push(event)
        } else {
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

      return new Promise ((resolve,  reject) => {
        knex('events')
          .where('id', row.event_id)
          .first()
          .then((event) => {
            console.log(`isLead `, isLead);
            if (isLead) {
              event.is_lead = true;
            } else {
              event.is_lead = false;
            }
            resolve(event)
          })
          .catch((err) => {
            reject(err);
          })
      })
    }
});

module.exports = router;
