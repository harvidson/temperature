import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';


const Reflection = ({iteration, openModal}) => {
  return (
  <div>
    <div className="cf">
      <div className="f4 fl fw3 mv3 lh-copy link pointer" onClick={() => { openModal('reflectionView', iteration)}}>{iteration.reflection.title}</div>

    </div>
    <div className="pl4">
      <Moment format="MMMM D, YYYY, h:mm a">{iteration.reflection.created_at}</Moment>
    </div>
  </div>
  )
}

export default Reflection
