'use strict';

const eventsList = [
  {
    id: 1,
    title: 'Team check-in',
    description: 'Our team is big, so I don\'t always get to check in with each of you every week. I\'d like to use this platform to get a general sense of how we\'re doing as a group, and invite you to bring to me any feedback that comes out of the reflections you write. The reflections themselves are private: I\'ll only see the aggregate data.',
    default_prompt: 'How are you feeling this week about your role in the team?',
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  {
    id: 2,
    title: 'English 11: American Literature',
    description: 'In this series, I\'d like to get a sense of where you\'re at just before you leave class. You can write about the material we\'re studying, the assignments, class activities, or how it feels today to be a member of this class.',
    default_prompt: 'How are you feeling about today\'s class?',
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  {
    id: 3,
    title: 'Outside English 11',
    description: 'To better understand your responses to each day\'s class, I\'d also like to get a rough idea of how things are gong for you outside of class. And, it\'s an opportunity to bring a little more free-writing into your day!',
    default_prompt: 'How are you feeling about things outside of school?',
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  {
    id: 4,
    title: 'Modernist Journals Research Project',
    description: 'For the next four weeks, you will be collaboratively researching, outlining, writing, and editing a project based on the modernist journal that your group chooses. For both you and me, it would be useful to track how this process develops--not just to spot challenges as they crop up, but also to learn more about how you work in a group and what you\'d like to work on. Please write about 150-200 words per reflection.',
    default_prompt: 'How are you feeling about your group\'s collaborative process?',
    created_at: new Date('2017-10-02 14:26:16 UTC'),
    updated_at: new Date('2017-10-02 14:26:16 UTC')
  },
  {
    id: 5,
    title: 'Weekly Meetings',
    description: 'Weekly meetings are an important part of our work together. Over the course of the year, I\'d like to give you the opportunity to reflect on these meetings and also to get some general feedback from you about how you\'re feeling about these meetings. I\'ll only ever be gathering data from the group as a whole, so please be candid.',
    default_prompt: 'How do you feel about how the meeting went?',
    created_at: new Date('2017-10-02 14:26:16 UTC'),
    updated_at: new Date('2017-10-02 14:26:16 UTC')
  }
];




exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert(
        eventsList
      )
    })
    .then(() => {
      return knex.raw("SELECT setval('events_id_seq', (SELECT MAX(id) FROM events));")
  })
};
