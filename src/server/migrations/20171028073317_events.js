'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', (table) => {
    table.increments();
    table.string('title').notNullable().defaultTo('');
    table.text('description').notNullable().defaultTo('');
    table.string('default_prompt').notNullable().defaultTo('');
    table.timestamps(true, true);
    table.timestamp('deleted_at').defaultTo(null);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events')
};
