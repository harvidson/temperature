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

//get aggregate data for one-words
router.get('/:id/one-words', authorize, (req, res,next) => {
  const eventId = Number.parseInt(req.params.id);
  const userId = req.claim.userId;

  if (Number.isNaN(eventId) || userId < 0) {
    return next(boom.create(404, 'Not found.'));
  }

  //check that user is lead on this event
  knex('events_users')
  .where({
    'event_id': eventId,
    'user_id': userId,
    'is_lead': true
  })
  .first()
  .then((row) => {
    if (!row) return next(boom.create(401, 'Unauthorized.'));

  //grab all iterations of this eventId
    return knex('iterations')
      .where('event_id', eventId)
  })
  .then((iterations) => {
    //for each row, get one-word data from relections
    const words = []

    for (const i of iterations){
      words.push(getWordData(i.id))
    }

    return Promise.all(words)
  })
  .then((words) => {
    const wordsFlattened = words.reduce(function(arr, item) {
      return arr.concat(item)
    }, [])
    const worded = []

    for (const w of wordsFlattened) {
      worded.push(getWord(w))
    }

    return Promise.all(worded)
  })
  .then((data) => {
    data.sort(function (a, b) {
      return b.id - a.id;
    })
    const wordData = aggregateWords(data)
    res.send(wordData)
  })
  .catch((err) => {
    console.log(err);
    next(err)
  })

  function getWordData(iterationId) {
    return knex('reflections')
      .where('iteration_id', iterationId)
      .then((reflections) => {
        if (!reflections) throw new NotAnError()

        const oneWords = [];

        for (const r of reflections) {
          const oneWord = {
            id: r.one_word_id,
            intensity: r.one_word_intensity,
          }
          oneWords.push(oneWord);
        }
        return Promise.resolve(oneWords)
      })
      .catch((noReflections) => {
        if(noReflections instanceof NotAnError){
          return Promise.resolve({});
        }

        throw noReflections;
      })
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

  class NotAnError{
    construcor(){ }
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
  ;
    return {oneWords: oneWords, oneWordsWithIntensity: oneWordsWithIntensity}
  }
})

//get aggregate writer's own data for one-words
router.get('/:id/one-words-writer', authorize, (req, res,next) => {
  const eventId = Number.parseInt(req.params.id);
  const userId = req.claim.userId;

  if (Number.isNaN(eventId) || userId < 0) {
    return next(boom.create(404, 'Not found.'));
  }

  //check that user is participant on this event
  knex('events_users')
  .where({
    'event_id': eventId,
    'user_id': userId,
    'is_participant': true
  })
  .first()
  .then((row) => {
    if (!row) return next(boom.create(401, 'Unauthorized.'));

  //grab all iterations of this eventId
    return knex('iterations')
      .where('event_id', eventId)
  })
  .then((iterations) => {
    //for each row, get one-word data from relections
    const words = []

    for (const i of iterations){
      words.push(getWordData(i.id))
    }

    return Promise.all(words)
  })
  .then((words) => {
    const wordsFlattened = words.reduce(function(arr, item) {
      return arr.concat(item)
    }, [])
    const worded = []

    for (const w of wordsFlattened) {
      worded.push(getWord(w))
    }

    return Promise.all(worded)
  })
  .then((data) => {
    const wordData = aggregateWords(data)
    res.send(wordData)
  })
  .catch((err) => {
    console.log(err);
    next(err)
  })

  function getWordData(iterationId) {
    return knex('reflections')
      .where({
        'iteration_id': iterationId,
        'user_id': userId
      })
      .then((reflections) => {
        if (!reflections) throw new NotAnError()

        const oneWords = [];

        for (const r of reflections) {
          const oneWord = {
            id: r.one_word_id,
            intensity: r.one_word_intensity,
          }
          oneWords.push(oneWord);
        }
        return Promise.resolve(oneWords)
      })
      .catch((noReflections) => {
        if(noReflections instanceof NotAnError){
          return Promise.resolve({});
        }

        throw noReflections;
      })
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

  class NotAnError{
    construcor(){ }
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
        score: wordMapWithIntensity[key]
      }

      oneWords.push(newWord)
      oneWordsWithIntensity.push(newWordIntensity)
    }
  ;
    return {oneWords: oneWords, oneWordsWithIntensity: oneWordsWithIntensity}
  }
})


//get aggregate data for reflections over time
router.get('/:id/reflectionsOverTime', authorize, (req, res,next) => {
  const eventId = Number.parseInt(req.params.id);
  const userId = req.claim.userId;

  if (Number.isNaN(eventId) || userId < 0) {
    return next(boom.create(404, 'Not found.'));
  }

  //check that user is lead on this event
  knex('events_users')
  .where({
    'event_id': eventId,
    'user_id': userId,
    'is_lead': true
  })
  .first()
  .then((row) => {
    if (!row) return next(boom.create(401, 'Unauthorized.'));

  //grab all iterations of this eventId
    return knex('iterations')
      .where('event_id', eventId)
  })
  .then((iterations) => {
    const reflectionData = []

    for (const i of iterations) {
      //go get the reflections
      reflectionData.push(getReflections(i))
    }

    return Promise.all(reflectionData)
  })
  .then((data) => {
    if (data.length <= 0) {
      res.send([])
    } else {
      const dataFlattened = data.reduce(function(arr, item) {
        return arr.concat(item)
      }, [])

      const aggregatedReflections = aggregateReflections(dataFlattened)
      res.send(aggregatedReflections)
    }

  })
  .catch((err) => {
    console.log(err);
    next(err)
  })

  function getReflections(iteration) {
    return knex('reflections')
      .where('iteration_id', iteration.id)
      .orderBy('iteration_id')
      .then((reflections) => {

        const reflectionData = [];

        for (const r of reflections) {
          const iterationData = {
            date: iteration.due_date,
            score: r.text_analytics.documentSentiment.score,
            magnitude: r.text_analytics.documentSentiment.magnitude
          }
          reflectionData.push(iterationData)
        }

        return Promise.resolve(reflectionData)
      })
  }

  function aggregateReflections(data) {
    if (data.length <= 0) return {aggregateScores: []}

    //because reflection data is sorted by iteration id, due dates will be arranged in order
    const dataMap = []
    let newObj = {date: data[0].date, cumulativeScore: 0, magnitudeScore: 0, total: 0, totalMagnitude: 0}
    let currentDate = data[0].date;

    for (let i = 0; i < data.length; i++) {
      let total = 0;
      let totalMagnitude = 0;

      //create new date entry in dataMap
      if (data[i].date !== currentDate) {
        //add last date entry to dataMap and reset the tracking variables
        dataMap.push(newObj);
        newObj = {}
        currentDate = data[i].date

        //build object for nex date
        newObj.date = currentDate
        newObj.cumulativeScore = data[i].score
        newObj.magnitudeScore = data[i].score * data[i].magnitude
        newObj.total = 1
        newObj.totalMagnitude = data[i].magnitude
      //add new reflection scores to existing entry in dataMap
      } else {
        newObj.cumulativeScore += data[i].score
        newObj.magnitudeScore += data[i].score * data[i].magnitude
        newObj.total++
        newObj.totalMagnitude += data[i].magnitude
      }
    }
    //push in the final newObj
    dataMap.push(newObj);

    const aggregateScores = []

    for (const d of dataMap) {
      const average = d.cumulativeScore / d.total
      const averageMag = d.magnitudeScore / d.totalMagnitude
      const point = {
        date: d.date,
        score: average,
        scoreMagnitude: averageMag
      }

      aggregateScores.push(point)

    }
    return {aggregateScores: aggregateScores}
  }
})

//get cumulative data for writer's reflections over time
router.get('/:id/writerReflectionsOverTime', authorize, (req, res,next) => {
  const eventId = Number.parseInt(req.params.id);
  const userId = req.claim.userId;

  if (Number.isNaN(eventId) || userId < 0) {
    return next(boom.create(404, 'Not found.'));
  }

  //check that user is participant on this event
  knex('events_users')
  .where({
    'event_id': eventId,
    'user_id': userId,
    'is_participant': true
  })
  .first()
  .then((row) => {
    if (!row) return next(boom.create(401, 'Unauthorized.'));

  //grab all iterations of this eventId
    return knex('iterations')
      .where('event_id', eventId)
  })
  .then((iterations) => {
    const reflectionData = []

    for (const i of iterations) {
      reflectionData.push(getReflections(i))
    }

    return Promise.all(reflectionData)
  })
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      if (Object.keys(data[i]).length === 0 && data[i].constructor === Object) {
        data.splice(i, 1)
      }
    }
    res.send(data)
  })
  .catch((err) => {
    console.log(err);
    next(err)
  })

  function getReflections(iteration) {
    return knex('reflections')
      .where({
        'iteration_id': iteration.id,
        'user_id': userId
      })
      .first()
      .then((reflection) => {
        if (!reflection) return Promise.resolve({})

        const singleReflection = {
          date: reflection.created_at,
          score: reflection.text_analytics.documentSentiment.score,
          scoreMagnitude: reflection.text_analytics.documentSentiment.magnitude
        }

        return Promise.resolve(singleReflection)
      })
  }
})

router.get('/:id/word-cloud', authorize, (req, res, next) => {
  const eventId = Number.parseInt(req.params.id);
  const userId = req.claim.userId;

  if (Number.isNaN(eventId) || userId < 0) {
    return next(boom.create(404, 'Not found.'));
  }

  //check that user is lead on this event
  knex('events_users')
  .where({
    'event_id': eventId,
    'user_id': userId,
    'is_lead': true
  })
  .first()
  .then((row) => {
    if (!row) return next(boom.create(401, 'Unauthorized.'));

  //grab all iterations of this eventId
    return knex('iterations')
      .where('event_id', eventId)
  })
  .then((iterations) => {
    //for each row, get one-word data from relections
    const content = []

    for (const i of iterations){
      content.push(getReflectionContent(i.id))
    }

    return Promise.all(content)
  })
  .then((batchedContent) => {

    const oneBatch = batchedContent.reduce((arr, batch) => {
      return arr.concat(batch)
    }, [])

    const retVal = []
    const wordMap = {}
    const separator = /\W/
    const commonWords = ['and','or','for','to','of','in','on','with','about','really','but','so','since','how','one','two','way','even','up','after','if','by','from','as','at','a','an','i','me','my','not','it','the','this','that','these','those','what','there','their','then','be','is','has','was','did','had','am','are','were','going','have','get','all','just','would','do','doing','like','they','could','next','ever','go','him','while','want','make','actually','let','he','when','any','much','been','no','over','our','some','took','us','little','everyone','ever','out','says','can','could','else','something','things','see','will','everything','seem','someone','basically','getting','because','which','seems','every','come','s','re','ve','m','t','d','off','more','too','very','also','most','than','got','well','say','into','time','them','lot','don','won',' ','']
    let contentArray = []

    for (const reflection of oneBatch) {
      const newContent = reflection.toLowerCase().split(separator)
      contentArray = [...contentArray, ...newContent];
    }

    const filteredContent = contentArray.filter((word) => {
        return (!commonWords.includes(word))
      })


    for (const word of filteredContent) {
      if (wordMap.hasOwnProperty(word)) {
        wordMap[word]++
      } else {
        wordMap[word] = 1
      }
    }

    for (const key in wordMap) {
      //only keep words used more than once
      if (wordMap[key] >= 3){
        const addWord = {
          text: key,
          value: wordMap[key]
        }
        retVal.push(addWord)
      }
    }
    res.send(retVal);

  })
  .catch((err) => {
    console.log(err);
    next(err)
  })

  function getReflectionContent(iterationId) {

    return knex('reflections')
      .select('content')
      .where('iteration_id', iterationId)
      .then((reflections) => {
        const content = []

        for (const r of reflections) {
          content.push(r.content)
        }

        return Promise.resolve(content)
      })

  }


})











module.exports = router;
