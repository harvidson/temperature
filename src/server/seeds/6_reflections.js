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
    created_at: new Date('2017-10-23 14:26:16 UTC'),
    updated_at: new Date('2017-10-23 14:26:16 UTC')
  }, {
    id: 2,
    iteration_id: 5, //10/30
    user_id: 3,
    title: 'Excited about New Schedule',
    content: 'I went into the meeting feeling pretty tired and expecting to be bored, but I actually left quite excited about the new schedule. I think it is going to make things easier for the whole team. I appreciated that we started by talking to a partner about something from our week that we were proud of, since it put me in a much better mood. I wish all of our weekly meetings could be this cheerful and useful.',
    text_analytics: '{ "documentSentiment": { "magnitude": 3.8, "score": 0.7 }, "language": "en", "sentences": [ { "text": { "content": "Excited about New Schedule.", "beginOffset": 0 }, "sentiment": { "magnitude": 0.9, "score": 0.9 } }, { "text": { "content": "I went into the meeting feeling pretty tired and expecting to be bored, but I actually left quite excited about the new schedule.", "beginOffset": 28 }, "sentiment": { "magnitude": 0.8, "score": 0.8 } }, { "text": { "content": "I think it is going to make things easier for the whole team.", "beginOffset": 158 }, "sentiment": { "magnitude": 0.5, "score": 0.5 } }, { "text": { "content": "I appreciated that we started by talking to a partner about something from our week that we were proud of, since it put me in a much better mood.", "beginOffset": 220 }, "sentiment": { "magnitude": 0.6, "score": 0.6 } }, { "text": { "content": "I wish all of our weekly meetings could be this cheerful and useful.", "beginOffset": 366 }, "sentiment": { "magnitude": 0.9, "score": 0.9}}]}',
    one_word_id: 5,
    one_word_intensity: 3,
    created_at: new Date('2017-10-30 14:26:16 UTC'),
    updated_at: new Date('2017-10-30 14:26:16 UTC')
  }, {
    id: 3,
    iteration_id: 6, //11/06
    user_id: 3,
    title: 'Same People Same Issues',
    content: 'I am so so tired of the same people raising the same issues in every single meeting and then us not getting to the agenda items. Why do people think it is ok to raise issues that only have to do with them? Any why does my boss not take control of the situation? It is infuriating to watch him nodding along and taking notes while people go on and on about their personal complaints and priorities while the rest of us are sitting there obviously bored. What is the point of having these meetings if we do not ever talk about what we say we are going to talk about?.',
    text_analytics: '{ "documentSentiment": { "magnitude": 3.7, "score": -0.6 }, "language": "en", "sentences": [ { "text": { "content": "Same People Same Issues.", "beginOffset": 0 }, "sentiment": { "magnitude": 0.7, "score": -0.7 } }, { "text": { "content": "I am so so tired of the same people raising the same issues in every single meeting and then us not getting to the agenda items.", "beginOffset": 25 }, "sentiment": { "magnitude": 0.8, "score": -0.8 } }, { "text": { "content": "Why do people think it is ok to raise issues that only have to do with them?", "beginOffset": 155}, "sentiment": { "magnitude": 0.5, "score": -0.5 } }, { "text": { "content": "Any why does my boss not take control of the situation?", "beginOffset": 232 }, "sentiment" : { "magnitude": 0.3, "score": -0.3 } }, { "text": { "content": "It is infuriating to watch him nodding along and taking notes while people go on and on about their personal complaints and priorities while the rest of us are sitting there obviously bored.", "beginOffset": 288 }, "sentiment" : { "magnitude": 0.8, "score": -0.8 } }, { "text": { "content": "What is the point of having these meetings if we do not ever talk about what we say we are going to talk about?.", "beginOffset": 479 }, "sentiment": { "magnitude": 0.2, "score": -0.2 } } ]}',
    one_word_id: 16,
    one_word_intensity: 4,
    created_at: new Date('2017-11-06 14:26:16 UTC'),
    updated_at: new Date('2017-11-06 14:26:16 UTC')
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
  }, {
    id: 12,
    iteration_id: 10,
    user_id: 12,
    title: 'Going Great',
    content: 'Our group is actually doing a really good job of working together. We are getting a ton done in every class period, and the professor seems to think our ideas are good. I don’t know what else to say because it’s basically just working super well.',
    text_analytics: '{ "documentSentiment": { "magnitude": 2.6, "score": 0.8 }, "language": "en", "sentences": [ { "text": { "content": "Going Great. Our group is actually doing a really good job of working together.", "beginOffset": 0 }, "sentiment": { "magnitude": 0.9, "score": 0.9 } }, { "text": { "content": "We are getting a ton done in every class period, and the professor seems to think our ideas are good.", "beginOffset": 79 }, "sentiment": { "magnitude": 0.7, "score": 0.7 } }, { "text": { "content": "I don’t know what else to say because it’s basically just working super well.", "beginOffset": 181 }, "sentiment": { "magnitude": 0.8, "score": 0.8 } } ]}',
    one_word_id: 5,
    one_word_intensity: 3,
    created_at: new Date('2017-09-28 14:26:16 UTC'),
    updated_at: new Date('2017-09-28 14:26:16 UTC')
  }, {
    id: 13,
    iteration_id: 4,
    user_id: 1,
    title: 'Good start',
    content: 'I’m excited about the school and the year. There’s a lot I don’t understand yet about how the school works, so the learning curve is feeling pretty steep. I wish there was a manual to explain basic things to me, or that someone would take the time to tell me what our schedule is, how administrative tasks work, what exactly are we supposed to do in advisory??? I thought maybe these meeting would do that but I left today even more confused. Altogether feeling pretty positive, and I still feel good about my choice to come teach here. Let’s see what the year holds.',
    text_analytics: '{ "documentSentiment": { "magnitude": 3.3, "score": 0.3 }}',
    one_word_id: 8,
    one_word_intensity: 3,
    created_at: new Date('2017-10-22 14:26:16 UTC'),
    updated_at: new Date('2017-10-22 14:26:16 UTC')
  }, {
    id: 14,
    iteration_id: 4,
    user_id: 5,
    title: 'Hell in a hand basket.',
    content: 'Folks we’re going to have to do a lot better than this. I was part of the committee putting together the proposal for overhauling our curriculum, and I couldn’t follow outline Sam and Bob laid out. This first meeting was disorganized and incompetent. I expect more from our leaders. And I’d like to have the opportunity to give more input in front of the teaching staff. Bob means well, but he often does not do a persuasive job in representing the steering committee’s vision, and without larger buy in this is going to fall flat on its face.',
    text_analytics: '{ "documentSentiment": { "magnitude": 2.9, "score": -0.1 }}',
    one_word_id: 17,
    one_word_intensity: 3,
    created_at: new Date('2017-10-22 14:26:16 UTC'),
    updated_at: new Date('2017-10-22 14:26:16 UTC')
  }, {
    id: 15,
    iteration_id: 4,
    user_id: 22,
    title: 'Changes',
    content: 'Whoa, I’ve taught here for a long time and we’ve never had so many changes coming down the pipeline at once. I mean, I’ve seen some wild new plans in my day, but this really takes the cake. I remember when Anthony was the boss and he would come up with a crazy new scheme and only give us a week to implement it, but this is a whole new level of crazy. That was inspired disorganization, and I’m not sure what kind of disorganization this is, but I can’t say I like it. Should be interesting to see what other icing they slap on this crazy cake in the future. This is a very draconian top-down approach, and I’m not sure if we’re going to have any voice in what happens next. Not leaving any time for questions or comments at the end of the meeting seemed like a nefarious strategy for not getting input. I guess next week we’ll see if the plot thickens. ',
    text_analytics: '{ "documentSentiment": { "magnitude": 1.8, "score": 0 }}',
    one_word_id: 16,
    one_word_intensity: 4,
    created_at: new Date('2017-10-22 14:26:16 UTC'),
    updated_at: new Date('2017-10-22 14:26:16 UTC')
  }, {
    id: 16,
    iteration_id: 4,
    user_id: 23,
    title: 'Lots of changes happening',
    content: 'I try to keep a positive attitude about these meetings, but I was exasperated today when we didn’t get to some of the most important agenda items until right before the meeting ended. I think these meetings could be a little more organized and it would make a big difference. There’s just a lot of disruption happening right now in the school, so it throws me off to have disruptions in the agenda too. I know that sounds a little ridiculous, but when you say you have an agenda I thought the whole point was to actually follow it. As far as the changes themselves go, I feel apprehensive about the whole implementation of them, and I wish we had had some time to really process our feelings about what’s happening in the near future.',
    text_analytics: '{ "documentSentiment": {"magnitude": 2.700000047683716, "score": 0}}',
    one_word_id: 15,
    one_word_intensity: 2,
    created_at: new Date('2017-10-22 14:26:16 UTC'),
    updated_at: new Date('2017-10-22 14:26:16 UTC')
  }, {
    id: 17,
    iteration_id: 5,
    user_id: 1,
    title: 'Today was fun!',
    content: 'I felt so buoyed up by the conversation about what we’re proud of. I was stumped at first, and nervous to talk to a more experienced teacher, thinking I might come off as arrogant or naive, but she totally set me at ease, and made me feel even prouder with her insights. It was a real confidence boost. Hurray! I’m still confused about how things work, but most people seem to think the changes afoot are a great idea. I’m looking forward to learning more.',
    text_analytics: '{ "documentSentiment": {"magnitude": 4.2, "score": 0.5}}',
    one_word_id: 3,
    one_word_intensity: 2,
    created_at: new Date('2017-10-30 14:26:16 UTC'),
    updated_at: new Date('2017-10-30 14:26:16 UTC')
  }, {
    id: 18,
    iteration_id: 5,
    user_id: 5,
    title: 'Sugar-coated.',
    content: 'The partner exercise seemed a bit of a waste of time but it seemed to put everyone in good spirits. We gleaned a few more details about the proposed changes—and how Bob seems to be interpreting what the steering committee produced last year (not too happy about some of that)—but still not enough. I’d rather spend our time getting down to brass tacks and serious pressing issues than doing the feel good exercises. At any point are they going to ask us what we think would make for a useful meeting? I have a ton of ideas but this week they are mouldering under a thick layer of administration-pushed saccharine.',
    text_analytics: '{ "documentSentiment": {"magnitude": 1.600000023841858, "score": -0.10000000149011612}}',
    one_word_id: 15,
    one_word_intensity: 2,
    created_at: new Date('2017-10-30 14:26:16 UTC'),
    updated_at: new Date('2017-10-30 14:26:16 UTC')
  }, {
    id: 19,
    iteration_id: 5,
    user_id: 22,
    title: 'Better',
    content: 'Well, we started the meeting with a kind of silly exercise but it was actually kind of fun. At least it was better than hearing more bureaucratic details from our commander in chief. And we finally got some details about the changes that are coming up in the not so distant future. They were a week late, but at least they arrived. I wouldn’t say I’m feeling positive about the changes, but they make a lot more sense when they’re actually explained in detail, and some of what they’re talking about I like. I left the meeting at least feeling like the sky wasn’t falling on my head, and perhaps even remembering why I like teaching to begin with. ',
    text_analytics: '{ "documentSentiment": {"magnitude": 2.600000023841858, "score": 0.30000001192092896}}',
    one_word_id: 7,
    one_word_intensity: 3,
    created_at: new Date('2017-10-30 14:26:16 UTC'),
    updated_at: new Date('2017-10-30 14:26:16 UTC')
  }, {
    id: 20,
    iteration_id: 5,
    user_id: 23,
    title: 'Partner activity!',
    content: 'This was a really fun meeting! We got to talk to partners about something we’re proud of, which is a great activity that I want to use in my classroom sometimes soon. I got to partner with Dorothy who shared some really neat ideas that she’s testing out. I just love when we get time to really dig into our accomplishments and celebrate the amazing work we’re doing at the school. I was really grateful that we got to talk about all the changes happening in the school, and I feel a lot more confident that that is all going to work out for the best. I wish all of our meetings could be this fun!',
    text_analytics: '{ "documentSentiment": {"magnitude": 5.5, "score": 0.699999988079071}}',
    one_word_id: 5,
    one_word_intensity: 4,
    created_at: new Date('2017-10-30 14:26:16 UTC'),
    updated_at: new Date('2017-10-30 14:26:16 UTC')
  }, {
    id: 21,
    iteration_id: 6,
    user_id: 1,
    title: 'Wow.',
    content: 'What happened this week?? Meeting got totally derailed. The agenda was a joke. People seemed mad, and I was absolutely confused about what’s happening, and what these meetings are for. And, man, do we have some firecrackers on staff. I’m pretty appreciative that they speak up and push back, but I also feel like there’s not much room for me. They just talked and talked, about what, god knows. I can’t really get into the conversation, but I guess I feel to new to know what to say anyway. So, not feeling great about my job this week. Actually I feel kind of awful. But maybe it was just a hard week…. ',
    text_analytics: '{ "documentSentiment": {"magnitude": 3.5999999046325684, "score": -0.10000000149011612}}',
    one_word_id: 19,
    one_word_intensity: 2,
    created_at: new Date('2017-11-06 14:26:16 UTC'),
    updated_at: new Date('2017-11-06 14:26:16 UTC')
  },{
    id: 22,
    iteration_id: 6,
    user_id: 5,
    title: 'Hallelujah.',
    content: 'Today we finally bloody well got somewhere. I had a lot to say, not only about the proposed changes, but also about how we’re preparing students for college and how we’re teaching critical thinking skills. It did me good—and I’d like to think it did us all good—to have some extended time to hash these things out. They’re serious, they get at the very heart of our shared mission, and yet there’s never a chance to get into them. I’m grateful that Bob was willing to cede some meeting space.',
    text_analytics: '{ "documentSentiment": {"magnitude": 2.5999999046325684, "score": 0.30000001192092896}}',
    one_word_id: 8,
    one_word_intensity: 3,
    created_at: new Date('2017-11-06 14:26:16 UTC'),
    updated_at: new Date('2017-09-30 14:26:16 UTC')
  },{
    id: 23,
    iteration_id: 6,
    user_id: 22,
    title: 'Finally',
    content: 'Finally, the chance to say what’s been on my mind about the changes. A few other old-timers spoke up too, and I think we finally got through to the ringleader about all the hassle and stress this is causing. I told Bob and Sam about all the changes I’ve seen and what made them work or not, and I actually got enough time and space to say what was really on my mind. The commander in chief didn’t respond at all to the comments, even when I asked a direct question, but he was at least nodding along and seemed to be paying some real attention. The more I write about the meeting the more I have to say it was surprisingly effective and organized and perhaps even a little fun. Complaining can be therapeutic sometimes, and I took full advantage of the therapy offered to me today. I feel almost a little optimistic about the future. ',
    text_analytics: '{ "documentSentiment": {"magnitude": 4.5, "score": 0.10000000149011612}}',
    one_word_id: 2,
    one_word_intensity: 3,
    created_at: new Date('2017-11-06 14:26:16 UTC'),
    updated_at: new Date('2017-11-06 14:26:16 UTC')
  },{
    id: 24,
    iteration_id: 6,
    user_id: 23,
    title: 'Complainers',
    content: 'I know that Paul has worked here a long time and has a lot to say, but I’ve worked here a long time too and I don’t think that entitles me to talk to a room full of people for ten minutes straight about the whole history of the school and then opine about everything that’s wrong. Why can’t Sam cut people off when they talk too long? He was nodding along and taking notes as the entire rest of the faculty was so pissed off and bored they were practically climbing under their chairs or just checked out on their email. I miss the days when faculty meetings felt like a time to gather and be in dialogue rather than a place to listed to a few people complain, complain, complain and complain some more. Honestly, it makes me really angry to have to listen to other people’s complaints. I have enough of my own!',
    text_analytics: '{ "documentSentiment": {"magnitude": 2.4000000953674316, "score": -0.10000000149011612}}',
    one_word_id: 18,
    one_word_intensity: 2,
    created_at: new Date('2017-11-06 14:26:16 UTC'),
    updated_at: new Date('2017-11-06 14:26:16 UTC')
  }, {
    id: 25,
    iteration_id: 15,
    user_id: 1,
    title: 'I have so checked out.',
    content: 'Bob and Sam have really lost my attention. Shit hit the fan at the end of the meeting as we once again wandered off into the weeds astride hobbyhorses and broomsticks, and then amid some pretty intense concerns and distress about workload, Bob and Sam just kept charging ahead with a pretty ill-thought project that’s just going to pile the work on. Anyway, I’m so overwhelmed I can hardly get through the day to day, so I guess I didn’t listen too closely. Will there be more information in writing about what we’re supposed to do? As usual, I’m confused. What’s new is I’m demoralized. Starting to worry that I never should have taken this job. ',
    text_analytics: '{ "documentSentiment": {"magnitude": 2.200000047683716, "score": -0.20000000298023224}}',
    one_word_id: 16,
    one_word_intensity: 4,
    created_at: new Date('2017-11-13 14:26:16 UTC'),
    updated_at: new Date('2017-11-13 14:26:16 UTC')
  }, {
    id: 26,
    iteration_id: 15,
    user_id: 5,
    title: 'Lost momentum.',
    content: 'Today we were back into crossing t’s and dotting i’s; pointless things that could well be conveyed in an email that leave no space at all for discussion. Not like we kept to the agenda, either. It was all higgledy piggledy and airing personal grievances. If I have to hear anymore about how the language teachers expect to see students every day of the week I really might just scream. Stress levels are high. I hope you’re listening to us, Sam.',
    text_analytics: '{ "documentSentiment": {"magnitude": 1.7999999523162842, "score": -0.10000000149011612}}',
    one_word_id: 16,
    one_word_intensity: 4,
    created_at: new Date('2017-11-13 14:26:16 UTC'),
    updated_at: new Date('2017-11-13 14:26:16 UTC')
  }, {
    id: 27,
    iteration_id: 15,
    user_id: 22,
    title: 'Busy',
    content: 'In the twenty-five years I’ve worked at this school I don’t think I’ve ever been so busy. I’ve been sick twice already this year and had to miss work, which adds even more work. I thought that last week the old commander had finally taken some goddamn notes about all the crazy shit that’s happening and maybe he was going to contemplate those notes and do something about it, but instead they just spent an hour reminding us of all the insane work that we need to do that has nothing to do with teaching our actual classes, the thing that we’re supposedly being paid to do. I hate to say it, but I’m thinking of quitting. Probably just a pipe dream, since I like the kids too much to leave (and am too old to change careers), but honestly today was one of those days when throwing in the towel seems like the best option. ',
    text_analytics: '{ "documentSentiment": {"magnitude": 2.700000047683716, "score": -0.20000000298023224}}',
    one_word_id: 16,
    one_word_intensity: 5,
    created_at: new Date('2017-11-13 14:26:16 UTC'),
    updated_at: new Date('2017-11-13 14:26:16 UTC')
  }, {
    id: 28,
    iteration_id: 15,
    user_id: 23,
    title: 'So much work…',
    content: 'I hate to complain so much, but these days it just feels hard to keep my head above water. To go to these meetings on top of a very booked and hectic days of classes feels like a lot. I know it’s important, but sometimes I just get frustrated by how much they expect us to do and how little time we have to do it. That’s not really about the meeting itself, but it feels like when we go to the meetings they give us all these details about more things we need to get done on ridiculous timelines. What happened to the meetings where we actually got to talk to our colleagues about things that matter? It feels like',
    text_analytics: '{ "documentSentiment": {"magnitude": 2.5, "score": 0}}',
    one_word_id: 16,
    one_word_intensity: 3,
    created_at: new Date('2017-11-13 14:26:16 UTC'),
    updated_at: new Date('2017-11-13 14:26:16 UTC')
  }, {
    id: 29,
    iteration_id: 16,
    user_id: 1,
    title: 'Oh thank god for responsive bosses.',
    content: ' I don’t think they’ve done a good job this fall in keeping track of where we’re at, but at least they seem to be registering that morale is impossibly low and it feels like mutiny in the ranks. And snacks go a long way :). That was nice of them. At my old school there were never any frills like that, so, I’m a cheap recruit. But it felt really good after what’s been a hellish few weeks. I think I can see a clearing ahead, and I have new found respect for my colleagues. ',
    text_analytics: '{ "documentSentiment": {"magnitude": 3.9000000953674316, "score": 0.5}}',
    one_word_id: 7,
    one_word_intensity: 3,
    created_at: new Date('2017-11-19 14:26:16 UTC'),
    updated_at: new Date('2017-11-19 14:26:16 UTC')
  },{
    id: 30,
    iteration_id: 16,
    user_id: 5,
    title: 'Ending on a good note.',
    content: 'Spirits were much higher this week, and some treats never hurt. I feel like I could have much more efficiently informed Sam and Bob of what they needed to know about how the meetings are going, but oh well, why not jump through a few more hoops in the name of being democratic. It’s not a bad thing, but these things take time. Anyway, we got some good, concrete work done in our teams today. I think I was especially on my game—-I’ve got some terrific ideas to pass along to Bob. ',
    text_analytics: '{ "documentSentiment": {"magnitude": 3.0999999046325684, "score": 0.4000000059604645}}',
    one_word_id: 7,
    one_word_intensity: 2,
    created_at: new Date('2017-11-19 14:26:16 UTC'),
    updated_at: new Date('2017-11-19 14:26:16 UTC')
  }, {
    id: 31,
    iteration_id: 16,
    user_id: 22,
    title: 'Ok',
    content: 'If the bossman thinks that some brownies and tortilla chips are going to solve the problems here, he’s out to lunch. I did have a brownie, though, which was an improvement on other weeks. At least we got a chance to talk to the people who we actually teach with and make some plans for our actual teaching. I’m not exactly optimistic, but I’m at least in a better mood after this meeting than previous ones. That might be because this meeting was shorter and no one dropped any bombs at the end of it, but I can’t complain. ',
    text_analytics: '{ "documentSentiment": {"magnitude": 1.399999976158142, "score": 0.20000000298023224}}',
    one_word_id: 10,
    one_word_intensity: 1,
    created_at: new Date('2017-11-19 14:26:16 UTC'),
    updated_at: new Date('2017-11-19 14:26:16 UTC')
  }, {
    id: 32,
    iteration_id: 16,
    user_id: 23,
    title: 'Less hungry, more happy ',
    content: 'This was a great meeting! There was food, which is something we requested and they really listened to us about how this could improve things. Everyone seemed a lot happier just from not being so hungry. It was so pleasant that we got out of the meeting early and had some time to talk in our teaching teams. That feels like a really useful way to spend our meeting time, and I appreciate that the administration listened to some of our requests—not just about the food, but also about how to spend meeting time to make it more productive and fun. I’m happy to report that this meeting was both efficient and enjoyable. ',
    text_analytics: '{ "documentSentiment": {"magnitude": 4.5, "score": 0.699999988079071}}',
    one_word_id: 7,
    one_word_intensity: 4,
    created_at: new Date('2017-11-19 14:26:16 UTC'),
    updated_at: new Date('2017-11-19 14:26:16 UTC')
  }, {
    id: 33,
    iteration_id: 15,
    user_id: 3,
    title: 'So Very Tired',
    content: 'I am so exhausted. I know that’s not the fault of faculty meetings, which is what we’re supposed to be reflecting on, but I wonder when the administration is going to realize that we’re exhausted and try to help us be less exhausted rather than piling more work onto our plates. I feel really frustrated that they don’t seem to be listening to us. I’m not sure what else to say. I’m just coming apart at the seams, and this didn’t help at all. Everyone seems really fried and some people even seem genuinely angry, which makes me sad and demoralized. Sigh. ',
    text_analytics: '{ "documentSentiment": {"magnitude": 3.299999952316284, "score": -0.20000000298023224}}',
    one_word_id: 16,
    one_word_intensity: 2,
    created_at: new Date('2017-11-13 14:26:16 UTC'),
    updated_at: new Date('2017-11-13 14:26:16 UTC')
  }, {
    id: 34,
    iteration_id: 16,
    user_id: 3,
    title: 'Up, up up!',
    content: 'I feel so glad that we got time to collaborate. I feel like I’m always trying to subtly request more meeting time to do this, so it was such a relief to actually feel like they listened and we got some of that time. There is still a lot more time we could use, but I feel really positively about the time we did have. I got a lot done with my team, and it felt great to make so much progress on next term even before this one is over. That feels like a real privilege, especially in such busy times. I feel grateful that our administrated listened to what we requested and gave us a little break. Thank you, universe!',
    text_analytics: '{ "documentSentiment": {"magnitude": 4.800000190734863, "score": 0.6000000238418579}}',
    one_word_id: 5,
    one_word_intensity: 3,
    created_at: new Date('2017-11-19 14:26:16 UTC'),
    updated_at: new Date('2017-11-19 14:26:16 UTC')
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
