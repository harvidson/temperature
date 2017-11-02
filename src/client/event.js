import React from 'react';
import Iteration from './iteration'
import IterationLead from './iteration-lead'

class Event extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      iterations: [],
      iterationsLead: []
    }

    //check token
    fetch('/api/token', {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      if (!j.authorized) {
        this.props.history.push('/');
        console.log('Unauthorized for this page');
      }
    }).catch((err) => {
      console.log(err)
    })

    //Leads: load iterations for this event
    fetch(`/api/events/${this.props.event.id}/lead`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      this.setState({iterationsLead: j})
    }).catch((err) => {
      console.log(err);
    })

    //participants: load iterations for this event, and any reflections completed
    fetch(`/api/events/${this.props.event.id}/writer`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      this.setState({iterations: j})
    }).catch((err) => {
      console.log(err);
    })

  }

  render() {
    return (
      <div >

        <div className="cf mt3">
          <div className="fl"><h2 className="mt0 f3 fw3 accent-orange">{this.props.event.title}</h2></div>
            <div className="fr">
              <a className="f6 no-underline grow white ba ph3 pv2 v-mid accent-orange br2 link" href="#">Analysis</a>
            </div>
        </div>

        {this.props.event.lead
          ? <div>
              <div className="">Lead: {this.props.event.lead}</div>
              <p>{this.props.event.description}</p>
          </div>
          : null
        }


        {this.state.iterations.length > 0
          ? <ul className="list">
              { this.state.iterations.map((iteration) => {
                return <li key={iteration.iteration_id}><Iteration iteration={iteration}/></li>
                })
              }
            </ul>
          : null
        }

        {this.state.iterationsLead.length > 0
          ?
            <div className="mt1">
              <ul className="list">
                <li className="cf small-caps">
                  <div className="fl">reflection due date</div>
                  <div className="fr mv2">submitted</div>
                </li>
                { this.state.iterationsLead.map((iteration) => {
                  console.log('leading this iteration: ', iteration);
                  return <li key={iteration.iteration_id}><IterationLead iteration={iteration}/></li>
                  })
                }
              </ul>
            </div>
          : null
        }

      </div>
    )
  }

}

export default Event
