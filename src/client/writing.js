import React from 'react';
import Event from './event';

const Writing = ({events}) => {
  return (
    <div>
      {console.log(events)}
      <h2 className="f1 fw3 dark-gray">Writing</h2>
      <ul>
        { events.map(event => <Event key={ event.id } event={ event } />) }
      </ul>

    </div>
  )
}

export default Writing
