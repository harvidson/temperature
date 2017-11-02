import React from 'react';
import Event from './event';


const Leading = ({events}) => {
  return (
    <div>
      <h2 className="f2 fw3 dark-gray">Lead</h2>
      <ul>
        { events.map(event => <Event key={ event.id } event={ event } />) }
      </ul>

    </div>
  )
}

export default Leading
