import React from 'react'
import Moment from 'react-moment'
import 'moment-timezone'
import Participant from './participant'
import IterationFull from './iteration-full'

class EventView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      participants: [],
      iterations: []
    }
    // this.determineTemperature = this.determineTemperature.bind(this);
  }

  componentWillMount() {
    this.checkToken()
    this.getParticipants(this.props.event.id)
    this.getIterations(this.props.event.id)
  }


  // componentWillReceiveProps(nextProps) {
  //
  //
  // }

  checkToken(){
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
  }

  getParticipants(id){
    fetch(`/api/events/${id}/users`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log(j);
      this.setState({
        participants: j
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  getIterations(id){
    fetch(`/api/events/${id}/iterations/lead`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log(j);
      this.setState({
        iterations: j
      })
    }).catch((err) => {
      console.log(err)
    })

  }



  render() {
    const {event} = this.props

    return (
      <div className="mh4 modal">

        <div className="tc">
          <h1 className="accent-orange f1-m f1-l f2 fw4">{event.title}</h1>
        </div>

        <div className="ba b--light-gray pa4 bg-near-white">
          <h2 className="f4 fw3">Description</h2>
          <p>{event.description}</p>
          <h2 className="f4 fw3">Participants</h2>
          <ul className="list">
            { this.state.participants.map(p => <Participant key={ p.id } participant={ p } />) }
          </ul>
        </div>

        <div className="pa4">
          <div className="cf">
            { this.state.iterations.map(i => <IterationFull key={i.iteration_id} iteration={ i } /> )}
          </div>
        </div>

      </div>
    )
  }
}

export default EventView
