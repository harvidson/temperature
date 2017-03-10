import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from './app';
import { APP_CONTAINER_SELECTOR } from '../shared/config';

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR);

const wrapApp = AppComponent =>

    <Router history={browserHistory}>
      <Route path="/" component={AppComponent} />
    </Router>


ReactDOM.render(wrapApp(App), rootEl);

if (module.hot) {
  module.hot.accept('./app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./app').default;
    ReactDOM.render(wrapApp(NextApp), rootEl);
  });
}
