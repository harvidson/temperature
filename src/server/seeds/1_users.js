'use strict';

const usersList = [
    //high school
  { id: 1,
    first_name: 'Jack',
    last_name: 'History',
    pronouns: 'he',
    email: 'jack@highschool.edu',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  {
    id: 2,
    first_name: 'Iris',
    last_name: 'Math',
    email: 'iris@highschool.edu',
    pronouns: 'she',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  {
    id: 3,
    first_name: 'Dorothy',
    last_name: 'Physics',
    pronouns: 'she',
    email: 'dorothy@highschool.edu',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter,
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  {
    id: 4,
    first_name: 'Ezra',
    last_name: 'English',
    pronouns: 'he',
    email: 'ezra@highschool.edu',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter,
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  {
    id: 5,
    first_name: 'Alex',
    last_name: 'Art',
    pronouns: 'she',
    email: 'alex@highschool.edu',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  {
    id: 6,
    first_name: 'Helen',
    last_name: 'Student',
    pronouns: 'she',
    email: 'helen@highschool.edu',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  {
    id: 7,
    first_name: 'Paul',
    last_name: 'Straight-As',
    pronouns: 'he',
    email: 'paul@highschool.edu',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  {
    id: 8,
    first_name: 'Evan',
    last_name: 'Chill-Student',
    pronouns: 'he',
    email: 'evan@highschool.edu',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  {
    id: 9,
    first_name: 'Margaret',
    last_name: 'Bright',
    pronouns: 'she',
    email: 'margaret@highschool.edu',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')

  },
  {
    id: 10,
    first_name: 'Sam',
    last_name: 'Administrator',
    pronouns: 'she',
    email: 'incharge@highschool.edu',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  //university class
  {
    id: 11,
    first_name: 'Lewis',
    last_name: 'Professor',
    pronouns: 'he',
    email: 'prof@university.edu',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  {
    id: 12,
    first_name: 'Emma',
    last_name: 'College-Student',
    pronouns: 'she',
    email: 'emma@university.edu',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  {
    id: 13,
    first_name: 'Lydia',
    last_name: 'Sophomore',
    pronouns: 'she',
    email: 'lydia@university.edu',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  {
    id: 14,
    first_name: 'Jay',
    last_name: 'Junior',
    pronouns: 'they',
    email: 'jay@university.edu',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  {
    id: 15,
    first_name: 'Grant',
    last_name: 'Major',
    pronouns: 'he',
    email: 'grant@university.edu',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  //company
  {
    id: 16,
    first_name: 'Anna',
    last_name: 'Manager',
    pronouns: 'she',
    email: 'incharge@company.com',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  {
    id: 17,
    first_name: 'Charles',
    last_name: 'Analyst',
    pronouns: 'he',
    email: 'charles@company.com',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  {
    id: 18,
    first_name: 'Terry',
    last_name: 'Designer',
    pronouns: 'other',
    email: 'terry@company.com',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  {
    id: 19,
    first_name: 'Julia',
    last_name: 'Engineer',
    pronouns: 'she',
    email: 'julia@company.com',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  {
    id: 20,
    first_name: 'Donald',
    last_name: 'Writer',
    pronouns: 'he',
    email: 'donald@company.com',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  {
    id: 21,
    first_name: 'Lila',
    last_name: 'Accountant',
    pronouns: 'she',
    email: 'lila@company.com',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  }

]

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert(
        usersList
      );
    })
    .then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));")
    })
};
