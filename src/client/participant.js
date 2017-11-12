import React from 'react';

const Participant = ({participant}) => {
  //TODO: add delete button to each one
  return (
    <div>

      <li>
        { participant.firstName } { participant.lastName } ({ participant.email })
      </li>

    </div>
  )
}

export default Participant;
