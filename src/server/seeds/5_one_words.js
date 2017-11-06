'use strict';

const wordsList = [
  {
    id: 1,
    word: 'elated',
    word_analytics: '{"documentSentiment":{ "magnitude":0.8, "score": 0.8 }, "language": "en", "sentences": [ {  "text": { "content": "I feel elated", "beginOffset": 0  },  "sentiment": { "magnitude": 0.8, "score": 0.8  } } ]}'
  }, {
    id: 2,
    word: 'confident',
    word_analytics: '{"documentSentiment": { "magnitude": 0.8, "score": 0.8 }, "language":"en", "sentences": [ {  "text": { "content": "I feel confident", "beginOffset": 0  },  "sentiment": { "magnitude": 0.8, "score": 0.8}}]}'
  }, {
    id: 3,
    word: 'inspired',
    word_analytics: '{"documentSentiment": { "magnitude": 0.8, "score": 0.8 }, "language": "en", "sentences": [ {  "text": { "content": "I feel inspired", "beginOffset": 0  },  "sentiment": { "magnitude": 0.8, "score": 0.8  } } ]}'
  }, {
    id: 4,
    word: 'happy',
    word_analytics: '{ "documentSentiment": { "magnitude": 0.8, "score": 0.8 }, "language": "en", "sentences": [ {  "text": { "content": "I feel happy", "beginOffset": 0  },  "sentiment": { "magnitude": 0.8, "score": 0.8  } } ]}'
  }, {
    id: 5,
    word: 'excited',
    word_analytics: '{ "documentSentiment": { "magnitude":0.7, "score": 0.7 }, "language": "en", "sentences": [ {  "text": { "content": "I am excited", "beginOffset": 0  },  "sentiment": { "magnitude": 0.7, "score": 0.7  } } ]}'
  }, {
    id: 7,
    word: 'cheerful',
    word_analytics: '{ "documentSentiment": { "magnitude": 0.6, "score": 0.6 }, "language": "en", "sentences": [ {  "text": { "content": "i feel cheerful", "beginOffset": 0  },  "sentiment": { "magnitude": 0.6, "score": 0.6  } } ]}'
  }, {
    id: 8,
    word: 'energized',
    word_analytics: '{ "documentSentiment": { "magnitude": 0.5, "score": 0.5 }, "language": "en", "sentences": [ {  "text": { "content": "I feel energized", "beginOffset": 0  },  "sentiment": { "magnitude": 0.5, "score": 0.5  } } ]}'
  }, {
    id: 9,
    word: 'focused',
    word_analytics: '{ "documentSentiment": { "magnitude": 0.3, "score": 0.3 }, "language": "en", "sentences": [ {  "text": { "content": "I am focused",  "beginOffset": 0  },  "sentiment": { "magnitude": 0.3, "score": 0.3  } } ]}'
  }, {
    id: 10,
    word: 'neutral',
    word_analytics: '{ "documentSentiment": { "magnitude": 0.1, "score": 0.1 }, "language": "en", "sentences": [ {  "text": { "content": "I am feeling neutral", "beginOffset": 0  },  "sentiment": { "magnitude": 0.1, "score": 0.1  } } ]}'
  }, {
    id: 11,
    word: 'meh',
    word_analytics: '{ "documentSentiment": { "magnitude": 0, "score": 0 }, "language": "en", "sentences": [ {  "text": { "content": "I am feeling meh",  "beginOffset": 0  },  "sentiment": { "magnitude": 0, "score": 0  } } ]}'
  }, {
    id: 12,
    word: 'confused',
    word_analytics: '{ "documentSentiment": { "magnitude": 0.3, "score": -0.3 }, "language": "en", "sentences": [ {  "text": { "content": "I am confused",  "beginOffset": 0  },  "sentiment": { "magnitude": 0.3, "score": -0.3  } } ]}'
  }, {
    id: 13,
    word: 'sad',
    word_analytics: '{ "documentSentiment": { "magnitude": 0.3, "score": -0.3 }, "language": "en", "sentences": [ {  "text": { "content": "I am sad",  "beginOffset": 0  },  "sentiment": { "magnitude": 0.3, "score": -0.3  } } ]}'
  }, {
    id: 14,
    word: 'upset',
    word_analytics: '{ "documentSentiment": { "magnitude": 0.3, "score": -0.3 }, "language": "en", "sentences": [ {  "text": { "content": "I am upset", "beginOffset": 0  },  "sentiment": { "magnitude": 0.3, "score": -0.3  } } ]}'
  }, {
    id: 15,
    word: 'annoyed',
    word_analytics: '{ "documentSentiment": { "magnitude": 0.6, "score": -0.6 }, "language": "en", "sentences": [ {  "text": { "content": "I am annoyed",  "beginOffset": 0  }, "sentiment": { "magnitude": 0.6, "score": -0.6  } } ]}'
  }, {
    id: 16,
    word: 'frustrated',
    word_analytics: '{ "documentSentiment": { "magnitude": 0.4, "score": -0.4 }, "language": "en", "sentences": [ {  "text": { "content": "I am frustrated", "beginOffset": 0  },  "sentiment": { "magnitude": 0.4, "score": -0.4  } } ]}'
  }, {
    id: 17,
    word: 'disappointed',
    word_analytics: '{ "documentSentiment": { "magnitude": 0.4, "score": -0.4 }, "language": "en", "sentences": [ {  "text": { "content": "I feel disappointed", "beginOffset": 0  },  "sentiment": { "magnitude": 0.4, "score": -0.4  } } ]}'
  }, {
    id: 18,
    word: 'angry',
    word_analytics: '{ "documentSentiment": { "magnitude": 0.6, "score": -0.6 }, "language": "en", "sentences": [ {  "text": { "content": "I am pissed off",  "beginOffset": 0  },  "sentiment": { "magnitude": 0.6, "score": -0.6  } } ]}'
  }, {
    id: 19,
    word: 'awful',
    word_analytics: '{ "documentSentiment": { "magnitude": 0.7, "score": -0.7 }, "language": "en", "sentences": [ {  "text": { "content": "I feel awful",  "beginOffset": 0  },  "sentiment": { "magnitude": 0.7, "score": -0.7  } } ]}'
  },
  // {
  //  id: 20,
  //  word: '',
  //  word_analytics: ''
  // },
]

exports.seed = function(knex, Promise) {
  return knex('one_words').del().then(function() {
    return knex('one_words').insert(wordsList);
  }).then(() => {
    return knex.raw("SELECT setval('one_words_id_seq', (SELECT MAX(id) FROM one_words));")
  })
};
