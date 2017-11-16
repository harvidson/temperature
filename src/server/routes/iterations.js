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

//get all one-word responses for one iteration
router.get('/:id/one-words', authorize, (req, res, next) => {
  const iterationId = Number.parseInt(req.params.id);
  const userId = req.claim.userId

  if (Number.isNaN(iterationId)) {
    return next(boom.create(404, 'Not found.'));
  }

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

    return knex('reflections')
      .select('one_word_id', 'one_word_intensity')
      .where('iteration_id', iterationId)
    })
    .then((reflections) => {
      if (reflections.length <= 0) res.send([])

      const oneWords = getWordData(reflections)
      const worded = []

      for (const w of oneWords) {
        worded.push(getWord(w))
      }
      return Promise.all(worded)
    }).then((data) => {
        const wordData = aggregateWords(data)
        res.send(wordData)
    }).catch((err) => {
      console.log(err);
      next(err)
    });

    function getWordData(reflections) {
      const oneWords = [];

      for (const r of reflections) {
        const w = {
          id: r.one_word_id,
          intensity: r.one_word_intensity,
        }
        oneWords.push(w);
      }
      return oneWords
    }

    function getWord(word) {
      return knex('one_words')
        .where('id', word.id)
        .first()
        .then((data) => {
          word.word = data.word
          return Promise.resolve(word)
        })
    }

    function aggregateWords(data) {
      let total = 0
      const wordMap = {}
      const wordMapWithIntensity = {}

      for (let i = 0; i < data.length; i++) {

          if (wordMap.hasOwnProperty(data[i].word) ) {
            wordMap[data[i].word]++
            wordMapWithIntensity[data[i].word] += data[i].intensity
          } else {
            wordMap[data[i].word] = 1
            wordMapWithIntensity[data[i].word] = data[i].intensity
          }
          total += data[i].intensity
      }

      const oneWords = []
      const oneWordsWithIntensity = []

      for (const key in wordMap) {
        const newWord = {
          word: key,
          score: wordMap[key],
        }

        const newWordIntensity = {
          word: key,
          //TODO: should this be divided by total or not??
          score: wordMapWithIntensity[key]
          // / total
        }

        oneWords.push(newWord)
        oneWordsWithIntensity.push(newWordIntensity)
      }

      return {oneWords: oneWords, oneWordsWithIntensity: oneWordsWithIntensity}
    }
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
    res.send(data)
  })
  .catch((err) => {
    console.log(err);
    next(err)
  });

})







module.exports = router;
