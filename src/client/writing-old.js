import React from 'react';
import Event from './event';

const Writing = ({events}) => {
  return (
    <div>
      <div className="bg-moon-gray">
        <h2 className="f2 fw3 dark-gray">Write reflections</h2>
      </div>
      <ul>
        { events.map(event => <Event key={ event.id } event={ event } />) }
      </ul>

    </div>
  )
}

export default Writing
