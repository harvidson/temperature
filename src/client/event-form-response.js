import React from 'react';

// TODO: reformat for style
const EventFormResponse = ({newEvent, closeModal}) => {
  //transform participant data on the backend--don't need ids once users have been divided into registered and not registered

  return(
    <div className="mh4">

      <div className="tc">
        <h1 className="accent-orange f1-m f2 fw4">Success!</h1>
      </div>
      <div>You've created a new reflection series. </div>

      <div className="fw3 lh-copy f4 dark-gray db">Title</div>
      <p>{newEvent.title}</p>
      <div className="fw3 lh-copy f4 dark-gray db">Description</div>
      <p>{newEvent.description}</p>
      <div className="fw3 lh-copy f4 dark-gray db">Prompt</div>
      <p>{newEvent.defaultPrompt}</p>
      {/* // TODO: edit grammar for sigular and plural */}
      <div className="fw3 lh-copy f4 dark-gray db">Participants</div>

      {newEvent.participants.registered.length > 0
        ? <p>These email addresses have been added to your reflection series: {newEvent.participants.registered.join(', ')}</p>
        : <p>No new participants have been added to your series.</p>
      }

      {newEvent.participants.notRegistered.length > 0
        ? <p>Some emails have not been registered with Temperature: {newEvent.participants.notRegistered.join(', ')}</p>
        : null
      }

      {newEvent.participants.invalidEmails.length > 0
        ? <p>Check these emails for typos: {newEvent.participants.invalidEmails.join(', ')}</p>
        : null
      }

      <div className="tc">
        <a className="tc f6 no-underline grow dib v-mid white ba ph2 pv2 ma2 action-button br2 link" href="#" onClick={() => {closeModal()}}>Close</a>
      </div>

    </div>

  )
}

export default EventFormResponse;
