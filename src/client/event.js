import React from 'react';
import Iteration from './iteration'
import IterationLead from './iteration-lead'

class Event extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      iterations: [],
      iterationsLead: [],

    }

    // this.saveIteration = this.saveIteration.bind(this);

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

//where does this function get its info from??? this one isn't doing anything
  // saveIteration(newIteration) {
  //   console.log('newIteration sent to event comp ', newIteration);
  //   this.setState({newIteration: newIteration});
  //   this.setState({iterationsLead: [...this.state.iterationsLead, newIteration]})
  //   this.props.openModal('EventFormResponse')
  // }



  render() {

    const { event, openModal } = this.props

    return (
      <div>

        { event.lead
          ?
            <div>
              <div className="cf">
                <h2 className="fl f3 fw3 mt0 accent-orange"><a className="link pointer">{event.title}</a></h2>
                <div className="fr accent-blue">Lead: {this.props.event.lead}</div>
              </div>
            <p>{event.description}</p>

          </div>

          :
            <div className="cf">
              <h2 className="fl f3 fw3 accent-orange">{event.title}</h2>
              {/* // TODO: how does this event get the new iteration back after submission? */}
              <a className="fr f6 no-underline grow dib ba ph2 pv2 ma2 accent-blue br2 link pointer" onClick={() => { openModal('newIteration', event)}}><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Assign new reflection</a>
            </div>
        }


        { this.state.iterations.length > 0
          ?
            <div>
              <div className="tc">
                <a className="f6 no-underline grow dib v-mid white ba ph2 pv2 ma2 analytics-button br2 link" href="#"><i className="fa fa-bar-chart" aria-hidden="true"></i> See analytics</a>
              </div>
              <ul className="list">
                { this.state.iterations.map((iteration) => {
                  return <li key={iteration.iteration_id}><Iteration iteration={iteration}/></li>
                  })
                }
              </ul>
            </div>
          : null
        }

        { this.state.iterationsLead.length > 0
          ?

          <div>
            <div className="tc">
              <a className="f6 no-underline grow dib v-mid white ba ph2 pv2 ma2 analytics-button br2 link" href="#"><i className="fa fa-bar-chart" aria-hidden="true"></i> See analytics</a>
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
