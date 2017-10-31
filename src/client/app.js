import React from 'react';
import {Route, Link} from 'react-router-dom'

import Dashboard from './Dashboard'
import Landing from './Landing'

class App extends React.Component {
  constructor() {
    super();

    this.state = {};

  }

  render() {
    return (
      <div className="site">
        <div className="site-content">
          <Route exact path='/dashboard' component={Dashboard}/>
          <Route exact path='/' component={Landing}/>


        </div>


        <footer>
          <div className="bg-dark-gray cover bg-left bg-center-l w-100" >
          <div className="footer cf w-100 center">
            <div className="fl w-40 pa2 tr pv3">
              <img src="/static/images/temperature-logo.png" alt="logo" width="150px"/>
            </div>
            <div className="fl w-25 pa2  ">
              <p className="white-70">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="fl w-25 pa2  ">
              <p className="white-70">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="fl w-15 pa2  "></div>
          </div>
        </div>
        </footer>

      </div>

    )
  }

};

export default App;
