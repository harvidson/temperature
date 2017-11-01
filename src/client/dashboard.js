import React from 'react'
import {Route, Link} from 'react-router-dom';

import Writing from './writing'
import Leading from './leading'
import Header from './header'

class Dashboard extends React.Component {
  constructor() {
    super()

    this.state = {
      leading: [],
      writing: []
    }

    //check token
    fetch('/api/token', {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log('response from token check: ', j)
      if (!j.authorized) {
        this.props.history.push('/');
        console.log('Unauthorized for this page');
      }
    }).catch((err) => {
      console.log(err)
    })

    //load user's events
    fetch('/api/events', {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log(j);
      this.setState({leading: j.leading, writing: j.writing});
    }).catch((err) => {
      console.log(err);
    })

  }

  render() {
    return (

      <div>
        <Header/>

        <main>

          <div className="bg-silver bg-left bg-center-l w-100">
            <div className="tr">
              <a className="f6 no-underline grow dib v-mid white ba ph3 pv2 ma2 action-button br2 link" href="/dashboard">Lead a new event</a>
            </div>
          </div>

          <div className="ma5 leading">
            {this.state.leading.length > 0
              ? <Leading events={this.state.leading}/>
              : null}
          </div>

          <div className="ma5 writing">
            {this.state.writing.length > 0
              ? <Writing events={this.state.writing}/>
              : null}
          </div>

        </main>

      </div>
    )
  }
}

export default Dashboard;
