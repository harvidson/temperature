'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('iterations', (table) => {
    table.increments();
    table.integer('event_id')
      .notNullable()
      .references('id')
      .inTable('events')
      .onDelete('CASCADE')
      .index()
    table.dateTime('due_date');
    table.string('prompt').notNullable().defaultTo('');
    table.integer('min_word_count');
    table.boolean('is_anonymous').notNullable().defaultTo(true);
    table.timestamp('deleted_at').defaultTo(null);
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('iterations')
};
