import React from 'react';

// TODO: reformat for style
const IterationFormResponse = ({newIteration, closeModal}) => {
  return(
    <div className="mh4">

      <div className="tc">
        <h1 className="accent-orange f1-m f2 fw4">Success!</h1>
      </div>
      <div>You've assigned a new reflection. </div>

      <div className="fw3 lh-copy f4 dark-gray db">Prompt</div>
      <p>{newIteration.prompt}</p>

      <div className="fw3 lh-copy f4 dark-gray db">Due</div>
      <p>{newIteration.due_date}</p>

      <div className="fw3 lh-copy f4 dark-gray db">Minimum words</div>
      <div>{newIteration.min_word_count}</div>

      <div className="fw3 lh-copy f4 dark-gray db">Access to data</div>
      {newIteration.is_anonymous
        ?
          <div>Aggregate (anonymous)</div>
        :
          <div>Individual</div>
      }

      <div className="tc">
        <a className="tc f6 no-underline grow dib v-mid white ba ph2 pv2 ma2 action-button br2 link" href="#" onClick={() => {closeModal()}}>Close</a>
      </div>

    </div>

  )
}

export default IterationFormResponse;
