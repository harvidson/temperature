import React from 'react';

const Event = ({event}) => {
  return (
    <div>
      <h2 className="f2 fw3 dark-gray">{event.title}</h2>
      <ul>
        {/* { this.state.writing.map(event => <Writing key={ event.id } event={ event } />) } */}
      </ul>

    </div>
  )
}

export default Event
