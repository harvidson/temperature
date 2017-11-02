import React from 'react';
import Event from './event';

const Writing = ({events}) => {
  return (
    <div>
      {console.log(events)}
      <h2 className="f2 fw3 dark-gray">Reflect</h2>
      <ul>
        { events.map(event => <Event key={ event.id } event={ event } />) }
      </ul>

    </div>
  )
}

export default Writing
