import React from 'react';
import Writing from './writing'

class Dashboard extends React.Component {
  constructor() {
    super()

    this.state = {
      // leading = [],
      // writing = []
    }

//check token
    fetch('/api/token', {method: 'get'}).then((response) => {
      return response.json();
    }).then((j) => {
      console.log(j);
    }).catch((err) => {
      console.log(err);
    })

    //should i go get all of a users events, then send them back in an object with leader: and writer: ?

      //load user's events
    fetch('/api/events', {method: 'get'}).then((response) => {
      return response.json();
    }).then((j) => {
      console.log(j);
      // this.state.leading = j.leading;
      // this.state.writng = j.writing;
    }).catch((err) => {
      console.log(err);
    })


  }






  render() {
    return (

      <div>
        <header>
        <div className="bg-dark-gray bg-left bg-center-l w-100" >

          <div className="cf">
            <img className="ml2 pa3 fl" src="static/images/temperature-logo.png" width="150px"/>
            <nav className="w-100 mv3">
              <div className="v-mid tr pv3 mr3 fr">
                <a className="f6 fw4 hover-white no-underline white-70 dib pv2 ph3 ba br1 link" href="/">Log out</a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main>
      <div className="bg-silver bg-left bg-center-l w-100" >
        <div className="tr">
          <a className="f6 no-underline grow dib v-mid white ba ph3 pv2 ma2 action-button br2 link" href="/dashboard">Lead a new event</a>
        </div>
      </div>


{/* each of these will be their own component, made up of components */}


          <div className="ma5">
            <h2 className="f1 fw3 dark-gray">Leading</h2>




          </div>
          <div className="ma5">
            <h2 className="f1 fw3 dark-gray">Writing</h2>

              <Writing />


          </div>


      </main>

    </div>
    )
  }
}

export default Dashboard;
