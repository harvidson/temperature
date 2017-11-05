import React from 'react';
import Event from './event';


const Leading = ({events, openModal}) => {
  return (
    <div>
      <div className="bg-moon-gray">
      <h2 className="f2 fw3 dark-gray">Take the Temperature</h2>
    </div>

      <ul>
        { events.map(event => <Event key={ event.id } event={ event } openModal={ openModal } /> ) }
      </ul>

    </div>
  )
}

export default Leading;
