'use strict';

const reflectionsList = [
  //faculty meetings
  {
    id: 1,
    iteration_id: 4, //due 10/23
    user_id: 3,
    title: 'Over Time as Usual',
    content: 'As usual, we used most of the meeting to review things that did not really matter and took three times as long as they should have, then they sprung these huge changes on us right before the meeting was over. That is some serious bullshit, especially since I could tell just by looking at the agenda that it was going to run over. As excited as I am about the changes and as great as it was to vent about how much work we have to do, I would actually just appreciate some information about next year and some reassurance that we are not going to have to do a ton of unpaid work to make this change happen. No one ever answered the question as to why are they making us do all these hours of work to describe our previous project instead of giving us time to plan our next one.',
    text_analytics: '{ "documentSentiment": { "magnitude": 2.8, "score": -0.3 },"language": "en", "sentences": [ { "text": { "content": "Over Time as Usual.", "beginOffset": 0 }, "sentiment": { "magnitude": 0, "score": 0 } }, { "text": { "content": "As usual, we used most of the meeting to review things that did not really matter and took three times as long as they should have, then they sprung these huge changes on us right before the meeting was over.", "beginOffset": 20 }, "sentiment": { "magnitude": 0.4, "score": -0.4 } }, { "text": { "content": "That is some serious bullshit, especially since I could tell just by looking at the agenda that it was going to run over.", "beginOffset": 229 }, "sentiment": { "magnitude": 0.9, "score": -0.9 } }, { "text": { "content": "As excited as I am about the changes and as great as it was to vent about how much work we have to do, I would actually just appreciate some information about next year and some reassurance that we are not going to have to do a ton of unpaid work to make this change happen.", "beginOffset": 351 }, "sentiment": { "magnitude": 0.5, "score": 0.5 } }, { "text": { "content": "No one ever answered the question as to why are they making us do all these hours of work to describe our previous project instead of giving us time to plan our next one.", "beginOffset": 626 }, "sentiment": { "magnitude": 0.8, "score": -0.8 } } ]}',
    one_word_id: 16,
    one_word_intensity: 2,
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  }, {
    id: 2,
    iteration_id: 5, //10/30
    user_id: 3,
    title: 'Excited about New Schedule',
    content: 'I went into the meeting feeling pretty tired and expecting to be bored, but I actually left quite excited about the new schedule. I think it is going to make things easier for the whole team. I appreciated that we started by talking to a partner about something from our week that we were proud of, since it put me in a much better mood. I wish all of our weekly meetings could be this cheerful and useful.',
    text_analytics: '{ "documentSentiment": { "magnitude": 3.8, "score": 0.7 }, "language": "en", "sentences": [ { "text": { "content": "Excited about New Schedule.", "beginOffset": 0 }, "sentiment": { "magnitude": 0.9, "score": 0.9 } }, { "text": { "content": "I went into the meeting feeling pretty tired and expecting to be bored, but I actually left quite excited about the new schedule.", "beginOffset": 28 }, "sentiment": { "magnitude": 0.8, "score": 0.8 } }, { "text": { "content": "I think it is going to make things easier for the whole team.", "beginOffset": 158 }, "sentiment": { "magnitude": 0.5, "score": 0.5 } }, { "text": { "content": "I appreciated that we started by talking to a partner about something from our week that we were proud of, since it put me in a much better mood.", "beginOffset": 220 }, "sentiment": { "magnitude": 0.6, "score": 0.6 } }, { "text": { "content": "I wish all of our weekly meetings could be this cheerful and useful.", "beginOffset": 366 }, "sentiment": { "magnitude": 0.9, "score": 0.9}}]}',
    one_word_id: 5,
    one_word_intensity: 3,
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  }, {
    id: 3,
    iteration_id: 6, //11/06
    user_id: 3,
    title: 'Same People Same Issues',
    content: 'I am so so tired of the same people raising the same issues in every fucking meeting and then us not getting to the agenda items. Why do people think it is ok to raise issues that only have to do with them? Any why does my boss not take control of the situation? It is infuriating to watch him nodding along and taking notes while people go on and on about their personal complaints and priorities while the rest of us are sitting there obviously bored. What is the point of having these meetings if we do not ever talk about what we say we are going to talk about?.',
    text_analytics: '{ "documentSentiment": { "magnitude": 3.7, "score": -0.6 }, "language": "en", "sentences": [ { "text": { "content": "Same People Same Issues.", "beginOffset": 0 }, "sentiment": { "magnitude": 0.7, "score": -0.7 } }, { "text": { "content": "I am so so tired of the same people raising the same issues in every fucking meeting and then us not getting to the agenda items.", "beginOffset": 25 }, "sentiment": { "magnitude": 0.8, "score": -0.8 } }, { "text": { "content": "Why do people think it is ok to raise issues that only have to do with them?", "beginOffset": 155}, "sentiment": { "magnitude": 0.5, "score": -0.5 } }, { "text": { "content": "Any why does my boss not take control of the situation?", "beginOffset": 232 }, "sentiment" : { "magnitude": 0.3, "score": -0.3 } }, { "text": { "content": "It is infuriating to watch him nodding along and taking notes while people go on and on about their personal complaints and priorities while the rest of us are sitting there obviously bored.", "beginOffset": 288 }, "sentiment" : { "magnitude": 0.8, "score": -0.8 } }, { "text": { "content": "What is the point of having these meetings if we do not ever talk about what we say we are going to talk about?.", "beginOffset": 479 }, "sentiment": { "magnitude": 0.2, "score": -0.2 } } ]}',
    one_word_id: 16,
    one_word_intensity: 4,
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  //college group work
  //week 1
  {
    id: 4,
    iteration_id: 9,
    user_id: 15,
    title: 'So Far So Good',
    content: 'We had a really good first session today. The people in my group seem like they are going to work hard and not put all the work on me, and I think the two girls get really good grades, so hopefully we will get an A for the project overall. This project is a good chance to work on my leadership skills to prepare for business school.',
    text_analytics: '{ "documentSentiment": { "magnitude": 2.3, "score": 0.3 }, "language": "en", "sentences": [ { "text": { "content": "So Far So Good. We had a really good first session today.", "beginOffset": 0 }, "sentiment": { "magnitude": 0.9, "score": 0.9 } }, { "text": { "content": "The people in my group seem like they are going to work hard and not put all the work on me, and I think the two girls get really good grades, so hopefully we will get an A for the project overall.", "beginOffset": 57 }, "sentiment" : { "magnitude": 0.6, "score": -0.6 } }, { "text": { "content": "This project is a good chance to work on my leadership skills to prepare for business school.", "beginOffset": 255 }, "sentiment": { "magnitude": 0.7, "score": 0.7 } } ]}',
    one_word_id: 2,
    one_word_intensity: 4,
    created_at: new Date('2017-09-19 14:26:16 UTC'),
    updated_at: new Date('2017-09-19 14:26:16 UTC')
  }, {
    id: 5,
    iteration_id: 9,
    user_id: 14,
    title: 'Seriously?',
    content: 'I can’t believe that literally no one listened to me in this conversation. I suggested that we do The New Age but everyone else was already dead set on doing The Little Review, even though they had no fucking clue about the magazine, it’s just that Grant randomly suggested it. He acts like someone elected him to be president of the group, which I guess is true, since Lydia and Emma are practically salivating over everything he says, even if it’s mundane and I already said it. How do I feel? I feel like I should drop this class. ',
    text_analytics: '{ "documentSentiment": { "magnitude": 2.7, "score": -0.2 }, "language": "en", "sentences": [ { "text": { "content": "Seriously?", "beginOffset": 0 }, "sentiment": { "magnitude": 0.3, "score": -0.3 } }, { "text": { "content": "I can’t believe that literally no one listened to me in this conversation.", "beginOffset": 11 }, "sentiment": { "magnitude": 0.6, "score": -0.6 } }, { "text": { "content": "I suggested that we do The New Age but everyone else was already dead set on doing The Little Review, even though they had no fucking clue about the magazine, it’s just that Grant randomly suggested it.", "beginOffset": 88 }, "sentiment": { "magnitude": 0.6, "score": -0.6 } }, { "text": { "content": "He acts like someone elected him to be president of the group, which I guess is true, since Lydia and Emma are practically salivating over everything he says, even if it’s mundane and I already said it.", "beginOffset": 293 }, "sentiment": { "magnitude": 0.4, "score": -0.4 } }, { "text": { "content": "How do I feel?", "beginOffset": 498 }, "sentiment": { "magnitude": 0, "score": 0 } }, { "text": { "content": "I feel like I should drop this class.", "beginOffset": 513 }, "sentiment": { "magnitude": 0.5, "score": 0.5 } } ]}',
    one_word_id: 18,
    one_word_intensity: 5,
    created_at: new Date('2017-09-18 14:26:16 UTC'),
    updated_at: new Date('2017-09-18 14:26:16 UTC')
  }, {
    id: 6,
    iteration_id: 9,
    user_id: 13,
    title: 'Off to a Great Start!',
    content: 'We did a great job coming up with a project idea! Someone suggested that we do The Little Review which is a really cool little magazine I had never heard of, and everyone agreed that it would be awesome to do something original and unique. Emma seems really nice, and Jay is quiet but also nice, and Grant is really smart, so I think we will be a good team! ',
    text_analytics: '{ "documentSentiment": { "magnitude": 2.6, "score": 0.8 }, "language": "en", "sentences": [ { "text": { "content": "We did a great job coming up with a project idea!", "beginOffset": 0 }, "sentiment": { "magnitude": 0.9, "score": 0.9 } }, { "text": { "content": "Someone suggested that we do The Little Review which is a really cool little magazine I had never heard of, and everyone agreed that it would be awesome to do something original and unique.", "beginOffset": 50 }, "sentiment": { "magnitude": 0.8, "score": 0.8 } }, { "text": { "content": "Emma seems really nice, and Jay is quiet but also nice, and Grant is really smart, so I think we will be a good team!", "beginOffset": 240 }, "sentiment": { "magnitude": 0.8, "score": 0.8 } } ]}',
    one_word_id: 4,
    one_word_intensity: 3,
    created_at: new Date('2017-09-20 14:26:16 UTC'),
    updated_at: new Date('2017-09-20 14:26:16 UTC')
  }, {
    id: 7,
    iteration_id: 9,
    user_id: 12,
    title: 'Excited',
    content: 'Usually I hate group projects, but I got to be in a group with Lydia and Grant, which I’m excited about, and we picked a topic really quickly so we could use the rest of the time to brainstorm about where to go next, which I think was a good idea so we can maximize our use of time. We made a plan for next time that exchanged phone numbers so we can keep in touch, so I think we are solid. ',
    text_analytics: '{ "documentSentiment": { "magnitude": 1.2, "score": 0.6 }, "language": "en", "sentences": [ { "text": { "content": "Excited. Usually I hate group projects, but I got to be in a group with Lydia and Grant, which I’m excited about, and we picked a topic really quickly so we could use the rest of the time to brainstorm about where to go next, which I think was a good idea so we can maximize our use of time.", "beginOffset": 0 }, "sentiment": { "magnitude": 0.9, "score": 0.9 } }, { "text": { "content": "We made a plan for next time that exchanged phone numbers so we can keep in touch, so I think we are solid.", "beginOffset": 293 }, "sentiment": { "magnitude": 0.3, "score": 0.3 } } ]}',
    one_word_id: 5,
    one_word_intensity: 3,
    created_at: new Date('2017-09-20 14:26:16 UTC'),
    updated_at: new Date('2017-09-20 14:26:16 UTC')
  },
  //week 2
  {
    id: 8,
    iteration_id: 10,
    user_id: 15,
    title: 'Second Meeting',
    content: 'I’m feeling good about this project. I seem to be the leader of the group, and everyone is contributing ideas and supporting each other. I’m not sure Jay is doing as much work as the rest of us, he seems kind of checked out. But Lydia and Emma are working super hard and we are flying through the tasks.',
    text_analytics: '{ "documentSentiment": { "magnitude": 1.8, "score": 0.4 }, "language": "en", "sentences": [ { "text": { "content": "Second Meeting. I’m feeling good about this project.", "beginOffset": 0 }, "sentiment": { "magnitude": 0.7, "score": 0.7 } }, { "text": { "content": "I seem to be the leader of the group, and everyone is contributing ideas and supporting each other.", "beginOffset": 54 }, "sentiment": { "magnitude": 0.3, "score": 0.3 } }, { "text": { "content": "I’m not sure Jay is doing as much work as the rest of us, he seems kind of checked out.", "beginOffset": 154 }, "sentiment": { "magnitude": 0.1, "score": 0.1 } }, { "text": { "content": "But Lydia and Emma are working super hard and we are flying through the tasks.", "beginOffset": 244 }, "sentiment": { "magnitude": 0.5, "score": 0.5 } } ]}',
    one_word_id: 2,
    one_word_intensity: 4,
    created_at: new Date('2017-09-27 14:26:16 UTC'),
    updated_at: new Date('2017-09-27 14:26:16 UTC')
  }, {
    id: 9,
    iteration_id: 10,
    user_id: 14,
    title: 'Deja Vu',
    content: 'I have basically given up on anyone listening to me at all. Every time I go to talk, Grant starts talking at the same time and then makes a huge show of letting me talk and then interrupts me. How am I supposed to learn anything if I just have to do what Grant says? I want to talk to the professor but I feel like he will think it’s my fault because no one else in my group seems to be having any problems at all…',
    text_analytics: '{ "documentSentiment": { "magnitude": 2.1, "score": -0.1 }, "language": "en", "sentences": [ { "text": { "content": "Deja Vu. I have basically given up on anyone listening to me at all.", "beginOffset": 0 }, "sentiment": { "magnitude": 0.1, "score": 0.1 } }, { "text": { "content": "Every time I go to talk, Grant starts talking at the same time and then makes a huge show of letting me talk and then interrupts me.", "beginOffset": 68 }, "sentiment": { "magnitude": 0.9, "score": -0.9 } }, { "text": { "content": "How am I supposed to learn anything if I just have to do what Grant says?", "beginOffset": 201 }, "sentiment" : { "magnitude": 0.4, "score": -0.4 } }, { "text": { "content": "I want to talk to the professor but I feel like he will think it’s my fault because no one else in my group seems to be having any problems at all…", "beginOffset": 275  },  "sentiment" : { "magnitude": 0.7, "score": 0.7  }}]}',
    one_word_id: 16,
    one_word_intensity: 4,
    created_at: new Date('2017-09-26 14:26:16 UTC'),
    updated_at: new Date('2017-09-26 14:26:16 UTC')
  }, {
    id: 10,
    iteration_id: 10,
    user_id: 13,
    title: 'Teamwork',
    content: 'I can’t believe how easy this project has been! It’s like someone suggests something and everyone immediately agrees and we are getting so much work done. I feel like we are going to get a good grade on this for sure, and I think Emma and I are going to hang out outside of class even.',
    text_analytics: '{ "documentSentiment": { "magnitude": 1.4, "score": 0.4 }, "language": "en", "sentences": [ { "text": { "content": "Teamwork. I can’t believe how easy this project has been!", "beginOffset": 0 }, "sentiment": { "magnitude": 0.7, "score": 0.7 } }, { "text": { "content": "It’s like someone suggests something and everyone immediately agrees and we are getting so much work done.", "beginOffset": 59 }, "sentiment": { "magnitude": 0.5, "score": 0.5 } }, { "text": { "content": "I feel like we are going to get a good grade on this for sure, and I think Emma and I are going to hang out outside of class even.", "beginOffset": 168 }, "sentiment": { "magnitude": 0.1, "score": 0.1 } } ]}',
    one_word_id: 7,
    one_word_intensity: 2,
    created_at: new Date('2017-09-26 14:26:16 UTC'),
    updated_at: new Date('2017-09-26 14:26:16 UTC')
  }, {
    id: 11,
    iteration_id: 10,
    user_id: 12,
    title: 'Going Great',
    content: 'Our group is actually doing a really good job of working together. We are getting a ton done in every class period, and the professor seems to think our ideas are good. I don’t know what else to say because it’s basically just working super well.',
    text_analytics: '{ "documentSentiment": { "magnitude": 2.6, "score": 0.8 }, "language": "en", "sentences": [ { "text": { "content": "Going Great. Our group is actually doing a really good job of working together.", "beginOffset": 0 }, "sentiment": { "magnitude": 0.9, "score": 0.9 } }, { "text": { "content": "We are getting a ton done in every class period, and the professor seems to think our ideas are good.", "beginOffset": 79 }, "sentiment": { "magnitude": 0.7, "score": 0.7 } }, { "text": { "content": "I don’t know what else to say because it’s basically just working super well.", "beginOffset": 181 }, "sentiment": { "magnitude": 0.8, "score": 0.8 } } ]}',
    one_word_id: 5,
    one_word_intensity: 3,
    created_at: new Date('2017-09-28 14:26:16 UTC'),
    updated_at: new Date('2017-09-28 14:26:16 UTC')
  }

];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reflections').del().then(function() {
    // Inserts seed entries
    return knex('reflections').insert(reflectionsList)
  }).then(() => {
    return knex.raw("SELECT setval('reflections_id_seq', (SELECT MAX(id) FROM reflections));")
  })
};
