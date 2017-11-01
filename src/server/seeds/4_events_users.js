'use strict';

const eventsUsersList = [
  //company: team check in
  {
    id: 1,
    event_id: 1,
    user_id: 16,
    is_lead: true,
    is_participant: false
  },
  {
    id: 2,
    event_id: 1,
    user_id: 17,
    is_lead: false,
    is_participant: true
  },
  {
    id: 3,
    event_id: 1,
    user_id: 18,
    is_lead: false,
    is_participant: true
  },
  {
    id: 4,
    event_id: 1,
    user_id: 19,
    is_lead: false,
    is_participant: true
  },
  {
    id: 5,
    event_id: 1,
    user_id: 20,
    is_lead: false,
    is_participant: true
  },
  //to add: user_id 21

  //High School: American lit
  {
    id: 6,
    event_id: 2,
    user_id: 3,
    is_lead: true,
    is_participant: false

  },
  {
    id: 7,
    event_id: 2,
    user_id: 6,
    is_lead: false,
    is_participant: true

  },
  {
    id: 8,
    event_id: 2,
    user_id: 7,
    is_lead: false,
    is_participant: true

  },
  {
    id: 9,
    event_id: 2,
    user_id: 8,
    is_lead: false,
    is_participant: true

  },
  {
    id: 10,
    event_id: 2,
    user_id: 9,
    is_lead: false,
    is_participant: true

  },
  //second Am lit question
  {
    id: 11,
    event_id: 3,
    user_id: 3,
    is_lead: true,
    is_participant: false

  },
  {
    id: 12,
    event_id: 3,
    user_id: 6,
    is_lead: false,
    is_participant: true

  },
  {
    id: 13,
    event_id: 3,
    user_id: 7,
    is_lead: false,
    is_participant: true

  },
  {
    id: 14,
    event_id: 3,
    user_id: 8,
    is_lead: false,
    is_participant: true

  },
  {
    id: 15,
    event_id: 3,
    user_id: 9,
    is_lead: false,
    is_participant: true

  },
  //high school faculty meetings
  {
    id: 16,
    event_id: 5,
    user_id: 10,
    is_lead: true,
    is_participant: false

  },
  {
    id: 17,
    event_id: 5,
    user_id: 1,
    is_lead: false,
    is_participant: true

  },
  {
    id: 18,
    event_id: 5,
    user_id: 2,
    is_lead: false,
    is_participant: true

  },
  {
    id: 19,
    event_id: 5,
    user_id: 3,
    is_lead: false,
    is_participant: true

  },
  {
    id: 20,
    event_id: 5,
    user_id: 4,
    is_lead: false,
    is_participant: true

  },
  {
    id: 21,
    event_id: 5,
    user_id: 5,
    is_lead: false,
    is_participant: true

  },
  //university: group work
  {
    id: 22,
    event_id: 4,
    user_id: 11,
    is_lead: true,
    is_participant: false

  },
  {
    id: 23,
    event_id: 4,
    user_id: 12,
    is_lead: false,
    is_participant: true

  },
  {
    id: 24,
    event_id: 4,
    user_id: 13,
    is_lead: false,
    is_participant: true

  },
  {
    id: 25,
    event_id: 4,
    user_id: 14,
    is_lead: false,
    is_participant: true

  },
  {
    id: 26,
    event_id: 4,
    user_id: 15,
    is_lead: false,
    is_participant: true

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
