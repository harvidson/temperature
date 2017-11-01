'use strict';

const iterationsList = [
  {
    id: 1,
    event_id: 1,
    due_date: '2017-10-26 14:00:00 UTC',
    prompt: 'How are you feeling this week about your role in the team?',
    is_anonymous: true,
    created_at: new Date('2017-10-02 14:26:16 UTC'),
    updated_at: new Date('2017-10-02 14:26:16 UTC')
  },
  {
    id: 2,
    event_id: 1,
    due_date: '2017-11-02 14:00:00 UTC',
    prompt: 'How are you feeling this week about your role in the team and your progress on our project?',
    is_anonymous: true,
    created_at: new Date('2017-10-09 14:26:16 UTC'),
    updated_at: new Date('2017-10-09 14:26:16 UTC')
  },
  {
    id: 3,
    event_id: 1,
    due_date: '2017-11-09 14:00:00 UTC',
    prompt: 'How are you feeling this week about your role in the team and your progress on our project?',
    is_anonymous: true,
    created_at: new Date('2017-10-15 14:26:16 UTC'),
    updated_at: new Date('2017-10-15 14:26:16 UTC')
  },
  //high school faculty meetings
  {
    id: 4,
    event_id: 5,
    due_date: '2017-10-23 14:00:00 UTC',
    prompt: 'How do you feel about how the meeting went?',
    is_anonymous: true,
    created_at: new Date('2017-09-15 14:26:16 UTC'),
    updated_at: new Date('2017-09-15 14:26:16 UTC')
  },
  {
    id: 5,
    event_id: 5,
    due_date: '2017-10-30 14:00:00 UTC',
    prompt: 'How do you feel about how the meeting went?',
    is_anonymous: true,
    created_at: new Date('2017-09-15 14:26:16 UTC'),
    updated_at: new Date('2017-09-15 14:26:16 UTC')
  },
  {
    id: 6,
    event_id: 5,
    due_date: '2017-10-06 14:00:00 UTC',
    prompt: 'How do you feel about how the meeting went?',
    is_anonymous: true,
    created_at: new Date('2017-09-15 14:26:16 UTC'),
    updated_at: new Date('2017-09-15 14:26:16 UTC')
  },
  {
    id: 7,
    event_id: 5,
    due_date: '2017-11-13 14:00:00 UTC',
    prompt: 'How do you feel about how the meeting went?',
    is_anonymous: true,
    created_at: new Date('2017-09-15 14:26:16 UTC'),
    updated_at: new Date('2017-09-15 14:26:16 UTC')
  },
  {
    id: 8,
    event_id: 5,
    due_date: '2017-11-20 14:00:00 UTC',
    prompt: 'How do you feel about how the meeting went?',
    is_anonymous: true,
    created_at: new Date('2017-09-15 14:26:16 UTC'),
    updated_at: new Date('2017-09-15 14:26:16 UTC')
  },
  //university group work
  {
    id: 9,
    event_id: 4,
    due_date: '2017-09-20 14:00:00 UTC',
    prompt: 'How are you feeling about your group\'s collaborative process?',
    is_anonymous: true,
    created_at: new Date('2017-09-15 14:26:16 UTC'),
    updated_at: new Date('2017-09-15 14:26:16 UTC')
  },
  {
    id: 10,
    event_id: 4,
    due_date: '2017-09-27 14:00:00 UTC',
    prompt: 'How are you feeling about your group\'s collaborative process?',
    is_anonymous: true,
    created_at: new Date('2017-09-15 14:26:16 UTC'),
    updated_at: new Date('2017-09-15 14:26:16 UTC')
  },
  {
    id: 11,
    event_id: 4,
    due_date: '2017-10-04 14:00:00 UTC',
    prompt: 'How are you feeling about your group\'s collaborative process?',
    is_anonymous: true,
    created_at: new Date('2017-09-15 14:26:16 UTC'),
    updated_at: new Date('2017-09-15 14:26:16 UTC')
  },
  {
    id: 12,
    event_id: 4,
    due_date: '2017-10-11 14:00:00 UTC',
    prompt: 'How are you feeling about your group\'s collaborative process?',
    is_anonymous: true,
    created_at: new Date('2017-09-15 14:26:16 UTC'),
    updated_at: new Date('2017-09-15 14:26:16 UTC')
  }
];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('iterations').del()
    .then(function () {
      // Inserts seed entries
      return knex('iterations').insert(
        iterationsList
      )
    })
    .then(() => {
      return knex.raw("SELECT setval('iterations_id_seq', (SELECT MAX(id) FROM iterations));")
  })
};
