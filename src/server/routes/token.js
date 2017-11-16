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
      name: payload.name
    });
  });
});

//on login, give user a cookie
router.post('/', (req, res, next) => {
  let user;

  knex('users')
    .where('email', req.body.email)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(401, 'Invalid email or password.')
      };
      user = camelizeKeys(row);
      return bcrypt.compare(req.body.password, user.hashedPassword)
    })
    .then(() => {
      const claim = {
        userId: user.id,
        name: user.firstName
      };
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '7 days'
      });

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        secure: router.get('env') === 'production'
      });
      delete user.hashedPassword;
      res.send(user);
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      res.status(401).send('Invalid login.');
    })
    .catch((err) => {
      console.log(err);
      return next(boom.create(500, 'Internal server error, /token POST.'));
    });
})

//on logout, delete cookie
router.delete('/', (req, res, next) => {
  res.clearCookie('token');
  res.end();
})

module.exports = router;
