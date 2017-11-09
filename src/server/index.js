'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const compression = require('compression');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

import { APP_NAME, STATIC_PATH, WEB_PORT } from '../shared/config';
const isProd = require('../shared/util');
import renderApp from './render-app';

const app = express();
app.disable('x-powered-by')

app.use(compression());
app.use(STATIC_PATH, express.static('dist'));
app.use(STATIC_PATH, express.static('public'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/token', require('./routes/token'));
app.use('/api/events', require('./routes/events'));
app.use('/api/events', require('./routes/events-analytics'));
app.use('/api/iterations', require('./routes/iterations'));

app.get('*', (req, res) => {
  console.log('route not found');
  res.send(renderApp(APP_NAME));
});

app.use((err, _req, res, _next) => {
  console.log(err);
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send({message: err.message});
  }

  res.sendStatus(err.status || 500);
});

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
  '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`);
});
