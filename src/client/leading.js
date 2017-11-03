import React from 'react';
import Event from './event';


const Leading = ({events, openModal}) => {
  return (
    <div>
      <div className="bg-moon-gray">
      <h2 className="f2 fw3 dark-gray">Collect reflections</h2>
      {/* <div className="tr">
        <a className="f6 no-underline grow dib v-mid white ba ph2 pv2 ma2 action-button br2 link" href="#" onClick={() => {this.openModal('event')}}>Create a new journal</a>
      </div> */}
    </div>
      <ul>
        { events.map(event => <Event key={ event.id } event={ event } openModal={ openModal }/>) }
      </ul>

    </div>
  )
}

export default Leading
