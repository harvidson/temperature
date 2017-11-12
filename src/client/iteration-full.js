import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

const IterationFull = ({iteration}) => {
  return (
    <div>

      <div className="accent-orange f4 fw2 mt2 mb1">
        <Moment format="MMMM D, YYYY" className="">{iteration.due_date}</Moment>
      </div>

      <div className="ph2">
        <div className="cf">
          <div className="fl">
            Due: <Moment format="h:mm a" className="">{iteration.due_date}</Moment>
          </div>
          <div className="fr">
            {iteration.min_word_count > 0
              ?
                <div>
                  Minimum word count: {iteration.min_word_count}
                </div>
            : null
            }
          </div>
        </div>
        <div>Prompt: {iteration.prompt}</div>



        <div className="tc pt2 pb4">
          {iteration.is_anonymous
            ?
            <div><i className="fa fa-users" aria-hidden="true"></i> Analysis by group (anonymous)</div>

            :
            <div><i className="fa fa-user-circle-o" aria-hidden="true"></i> Analysis by individual (not anonymous)</div>
          }
        </div>


      </div>


    </div>
  )
}

export default IterationFull;
