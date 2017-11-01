import React from 'react';
import Iteration from './iteration'

class Event extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      iterations: [],
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

    //load iterations for this event, and any reflections completed
    fetch(`/api/events/${this.props.event.id}/iterations`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log(j);
      this.setState({iterations: j});
    }).catch((err) => {
      console.log(err);
    })

  }

  render() {
    return (
      <div>

        <h2 className="f3 fw3 dark-gray">{this.props.event.title}</h2>

        {this.state.iterations.length > 0
          ? <ul className="list">
              {this.state.iterations.map((iteration) => {
                return <li key={iteration.iteration_id}><Iteration iteration={iteration}/></li>
              })
              }
            </ul>
          : null
        }

      </div>
    )
  }

}

export default Event
