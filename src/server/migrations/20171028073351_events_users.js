'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('events_users', (table) => {
    table.increments();
    table.integer('event_id')
      .notNullable()
      .references('id')
      .inTable('events')
      .onDelete('CASCADE')
      .index()
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index()
    table.boolean('is_lead').notNullable().defaultTo(false)
    table.boolean('is_participant').notNullable().defaultTo(true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events_users')
};
