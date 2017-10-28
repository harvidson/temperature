'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('one_words', (table) => {
    table.increments();
    table.string('word').notNullable().defaultTo('');
    table.json('word_analytics').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('one_words')
};
