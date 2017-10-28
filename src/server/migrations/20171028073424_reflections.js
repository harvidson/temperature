'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('reflections', (table) => {
    table.increments();
    table.integer('iteration_id')
      .notNullable()
      .references('id')
      .inTable('iterations')
      .onDelete('CASCADE')
      .index()
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index()
    table.string('content').notNullable().defaultTo('');
    table.json('text_analytics');
    table.integer('one_word_id')
      .notNullable()
      .references('id')
      .inTable('one_words')
      .onDelete('CASCADE')
      .index()
    table.integer('one_word_intensity');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reflections')
};
