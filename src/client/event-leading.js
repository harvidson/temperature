import React from 'react'
import IterationLead from './iteration-lead'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class EventLeading extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      iterationsLead: [],

    }

  }

  componentWillMount(){
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
    fetch(`/api/events/${this.props.event.id}/iterations/lead`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      this.setState({iterationsLead: j})
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {

    const { event, openModal } = this.props

    return (
      <div>

            <div className="cf">
              <a className="link pointer" onClick={() => { openModal('eventView', event)}}><h2 className="fl f3 fw3 accent-orange">{event.title}</h2></a>
              <a className="fr f6 no-underline grow dib ba ph2 pv2 ma2 accent-blue br2 link pointer" onClick={() => { openModal('newIteration', event)}}><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Assign new reflection</a>
              <Link to={`/events/${event.id}/analytics`} className="f6 no-underline grow dib v-mid white ba ph2 pv2 ma2 analytics-button br2 link fr"><i className="fa fa-bar-chart" aria-hidden="true"></i> See analytics</Link>
            </div>


        { this.state.iterationsLead.length > 0
          ?
            <div>
              <div className="tc">

              </div>


                <ul className="list mt1">
                  <li className="cf small-caps">
                    <div className="fl mr4">reflection due date</div>
                    <div className="fl ml4">submitted</div>
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

export default EventLeading
