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

    const {event, openModal } = this.props

    return (
      <div >


        <div className=""><h2 className="f3 fw3 accent-orange">{event.title}</h2></div>

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

          <div className="">
            <div className="tc">
              <a className="f6 no-underline grow dib v-mid white ba ph2 pv2 ma2 action-button br2 link" onClick={() => {openModal('iteration')}}>Assign new reflection</a>
              <a className="f6 no-underline grow dib v-mid white ba ph2 pv2 ma2 action-button br2 link" href="#">See analytics</a>
            </div>


              <ul className="list mt1">
                <li className="cf small-caps">
                  <div className="fl">reflection due date</div>
                  <div className="fr mv2">submitted</div>
                </li>
                { this.state.iterationsLead.map((iteration) => {
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
