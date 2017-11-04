import React from 'react';


const FormResponse = ({newEvent}) => {
  //transform participant data on the backend--don't need ids once users have been divided into registered and not registered

  return(
    <div className="mh4">


      <div className="tc">
        <h1 className="accent-orange f1-m f2 fw4">Success!</h1>
      </div>
      <div>You've created a new journal. </div>

      <div className="fw3 lh-copy f4 dark-gray db">Title</div>
      <p>{newEvent.title}</p>
      <div className="fw3 lh-copy f4 dark-gray db">Description</div>
      <p>{newEvent.description}</p>
      <div className="fw3 lh-copy f4 dark-gray db">Prompt</div>
      <p>{newEvent.defaultPrompt}</p>
      {/* // TODO: add conditional to this */}
      <div className="fw3 lh-copy f4 dark-gray db">Participants</div>
      <p>These email addresses have been added to your journal: {newEvent.participants.registered.join(', ')}.</p>
      {newEvent.participants.notRegistered
        ? <p>Some emails have not been registered with Temperature: {newEvent.participants.notRegistered.join(', ')}</p>
        : null
      }
      {newEvent.participants.invalidEmails
        ? <p>Check these emails for typos: {newEvent.participants.invalidEmails.join(', ')}</p>
        : null
      }

    </div>

  )
}

export default FormResponse;
