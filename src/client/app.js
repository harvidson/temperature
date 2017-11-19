import React from 'react';
import {Route, Link} from 'react-router-dom'

import Dashboard from './dashboard'
import Landing from './landing'
import Analytics from './analytics'
import NewReflection from './new-reflection'

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
          <Route path='/iterations/:id/reflection' component={NewReflection}/>
          <Route path='/events/:id/analytics' component={Analytics}/>



        </div>


        <footer>
          <div className="bg-dark-gray cover bg-left bg-center-l w-100" >
          <div className="footer cf w-100 center">
            <div className="fl w-40 pa2 tr pv3">
              <img src="/static/images/temperature-logo.png" alt="logo" width="150px"/>
            </div>
            <div className="fl w-15 pa2 ml6">
              <p className="white-70"><a href="#" className="white-70 hover-white grow link">About Temperature</a></p>
              <p className="white-70"><a href="#" className="white-70 hover-white grow link">Contact</a></p>
            </div>
            <div className="fl w-20 pa2 ml6 ">
              <p className="white-70"><a href="#" className="white-70 hover-white grow link">FAQs</a></p>
              <p className="white-70"><a href="#" className="white-70 hover-white grow link">Support</a></p>
            </div>

          </div>
        </div>
        </footer>

      </div>

    )
  }

};

export default App;
