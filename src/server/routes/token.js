'use strict';

const express = require('express')
const knex = require('../knex')
const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const {
  camelizeKeys
} = require('humps');
const jwt = require('jsonwebtoken');

const router = express.Router()

//check that user has cookie
router.get('/', (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return res.send({
        authorized: false
      });
    }
    return res.send({
      authorized: true,
      userId: payload.userId,
    });
  });
});

module.exports = router;
