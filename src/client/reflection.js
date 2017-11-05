import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

const Reflection = ({iteration}) => {
  return (
  <div>
    <div className="cf">
      <div className="f4 fl fw3 mv3 lh-copy ">{iteration.reflection_title}</div>
      {/* <a className="fr tr f6 no-underline grow white ba ph3 pv2 v-mid ma2 action-button br2 link dib" href="#">Read</a> */}

    </div>
    <div className="pl4">
      <Moment format="MMMM D, YYYY, h:mm a">{iteration.reflection_created_at}</Moment>
    </div>
  </div>
  )
}

export default Reflection
