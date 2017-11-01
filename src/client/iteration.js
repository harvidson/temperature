import React from 'react';
import Reflection from './reflection'

const Iteration = ({iteration}) => {
  return (
    <div>


      { iteration.reflection_id
        ?
          <Reflection key={iteration.reflection_id} iteration={iteration}/>

        :
        <div>
          <div className="cf">
              <h3 className="f4 fl">New reflection</h3>
              <a className="fr tr f6 no-underline grow white ba ph3 pv2 v-mid ma2 action-button br2 link" href="#">Write</a>
          </div>
          <div className="">
            Due: {iteration.due_date}
          </div>
        </div>
      }
    </div>
  )
}

export default Iteration
