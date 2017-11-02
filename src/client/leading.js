import React from 'react';
import Event from './event';


const Leading = ({events, openModal}) => {
  return (
    <div>
      <h2 className="f2 fw3 dark-gray">Surveys</h2>
      <ul>
        { events.map(event => <Event key={ event.id } event={ event } openModal={ openModal }/>) }
      </ul>

    </div>
  )
}

export default Leading
