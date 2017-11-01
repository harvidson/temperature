import React from 'react';

const Reflection = ({iteration}) => {
  return (
  <div>
    <div className="cf">
      <h3 className="f4 fl">{iteration.reflection_title}</h3>
      <a className="fr tr f6 no-underline grow white ba ph3 pv2 v-mid ma2 action-button br2 link dib" href="#">Read</a>

    </div>
    <div>
      {iteration.reflection_created_at}
    </div>
  </div>
  )
}

export default Reflection
