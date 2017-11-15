import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Moment from 'react-moment'
import 'moment-timezone'

import Reflection from './reflection'
import NewReflection from './new-reflection'

const Iteration = ({iteration, openModal}) => {
  return (
    <div>


      { iteration.reflection
        ?
          <Reflection key={iteration.reflection.id} iteration={iteration} openModal={openModal}/>
        :
        <div className="pa1">
          <div className="cf">
              <div className="f4 fw4 fl accent-orange ">New reflection</div>
              <div className=""><Link to={`/iterations/${iteration.id}/reflection`} className="fr f6 no-underline grow white ba ph2 pv2 v-mid ma2 action-button br2 link pointer">Write</Link></div>
          </div>
          <div className="pl4 ">
            <span className="accent-orange">Due:</span> <Moment format="dddd, MMMM D, YYYY, h:mm a">{iteration.due_date}</Moment>
          </div>
        </div>

      }
    </div>
  )
}

export default Iteration
