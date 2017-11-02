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
    // console.log('iteration ', iteration);
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
  })
})








module.exports = router;
