'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', (table) => {
    table.increments();
    table.string('title').notNullable().defaultTo('');
    table.string('description').notNullable().defaultTo('');
    table.string('default_prompt').notNullable().unique();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events')
};
