'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/temperature_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/temperature_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
