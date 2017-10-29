'use strict';

const eventsUsersList = [
  //company: team check in
  {
    id: 1,
    event_id: 1,
    user_id: 16,
    is_lead: true
  },
  {
    id: 2,
    event_id: 1,
    user_id: 17,
    is_lead: false
  },
  {
    id: 3,
    event_id: 1,
    user_id: 18,
    is_lead: false
  },
  {
    id: 4,
    event_id: 1,
    user_id: 19,
    is_lead: false
  },
  {
    id: 5,
    event_id: 1,
    user_id: 20,
    is_lead: false
  },
  //to add: user_id 21

  //High School: American lit
  {
    id: 6,
    event_id: 2,
    user_id: 4,
    is_lead: true
  },
  {
    id: 7,
    event_id: 2,
    user_id: 6,
    is_lead: false
  },
  {
    id: 8,
    event_id: 2,
    user_id: 7,
    is_lead: false
  },
  {
    id: 9,
    event_id: 2,
    user_id: 8,
    is_lead: false
  },
  {
    id: 10,
    event_id: 2,
    user_id: 9,
    is_lead: false
  },
  //second Am lit question
  {
    id: 11,
    event_id: 3,
    user_id: 4,
    is_lead: true
  },
  {
    id: 12,
    event_id: 3,
    user_id: 6,
    is_lead: false
  },
  {
    id: 13,
    event_id: 3,
    user_id: 7,
    is_lead: false
  },
  {
    id: 14,
    event_id: 3,
    user_id: 8,
    is_lead: false
  },
  {
    id: 15,
    event_id: 3,
    user_id: 9,
    is_lead: false
  },
  //high school faculty meetings
  {
    id: 16,
    event_id: 5,
    user_id: 10,
    is_lead: true
  },
  {
    id: 17,
    event_id: 5,
    user_id: 1,
    is_lead: false
  },
  {
    id: 18,
    event_id: 5,
    user_id: 2,
    is_lead: false
  },
  {
    id: 19,
    event_id: 5,
    user_id: 3,
    is_lead: false
  },
  {
    id: 20,
    event_id: 5,
    user_id: 4,
    is_lead: false
  },
  {
    id: 21,
    event_id: 5,
    user_id: 5,
    is_lead: false
  },
  //university: group work
  {
    id: 22,
    event_id: 4,
    user_id: 11,
    is_lead: true
  },
  {
    id: 23,
    event_id: 4,
    user_id: 12,
    is_lead: false
  },
  {
    id: 24,
    event_id: 4,
    user_id: 13,
    is_lead: false
  },
  {
    id: 25,
    event_id: 4,
    user_id: 14,
    is_lead: false
  },
  {
    id: 26,
    event_id: 4,
    user_id: 15,
    is_lead: false
  },
];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events_users').del()
    .then(function () {
      // Inserts seed entries
      return knex('events_users').insert(
        eventsUsersList
      )
    })
    .then(() => {
      return knex.raw("SELECT setval('events_users_id_seq', (SELECT MAX(id) FROM events_users));")
  })
};
