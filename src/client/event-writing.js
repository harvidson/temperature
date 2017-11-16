import React from 'react'
import Iteration from './iteration'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class EventWriting extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      iterations: [],
    }
  }

  componentWillMount() {
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
    const { event, openModal } = this.props

    return (
      <div>
        <div>
          <div className="cf">
            <h2 className="fl f3 fw3 mt0 accent-orange dib">{event.title}</h2>
            <div className="fr accent-blue ml2 dib mt3">Lead: {event.lead}</div>
            <Link to={`/events/${event.id}/analytics`} className="f6 no-underline grow dib v-mid white ba ph2 pv2 ma2 analytics-button br2 link fr dib"><i className="fa fa-bar-chart" aria-hidden="true"></i> See analytics</Link>
          </div>
        <p>{event.description}</p>

      </div>


        { this.state.iterations.length > 0
          ?
            <div>
              <div className="tc">

              </div>
              <ul className="list">
                { this.state.iterations.map((iteration) => {
                  return <li key={iteration.id}><Iteration iteration={iteration} openModal= { openModal }/></li>
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

export default EventWriting
