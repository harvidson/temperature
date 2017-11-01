import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

const Reflection = ({iteration}) => {
  return (
  <div>
    <div className="cf">
      <h3 className="f4 fl fw4">{iteration.reflection_title}</h3>
      {/* <a className="fr tr f6 no-underline grow white ba ph3 pv2 v-mid ma2 action-button br2 link dib" href="#">Read</a> */}

    </div>
    <div>
      <Moment format="dddd, MMMM D, YYYY, h:mm a">{iteration.reflection_created_at}</Moment>
    </div>
  </div>
  )
}

export default Reflection
