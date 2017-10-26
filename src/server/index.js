import compression from 'compression';
import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { APP_NAME, STATIC_PATH, WEB_PORT } from '../shared/config';
import { isProd } from '../shared/util';
import renderApp from './render-app';

const app = express();
app.disable('x-powered-by')

app.use(compression());
app.use(STATIC_PATH, express.static('dist'));
app.use(STATIC_PATH, express.static('public'));

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

//what does app.use look like for my routes?

app.get('*', (req, res) => {
  console.log('route not found');
  res.send(renderApp(APP_NAME));
});

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
  '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`);
});
