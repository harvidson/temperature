import React from 'react';

const Participant = ({participant}) => {
  return (
    <div>

      <li>
        { participant.firstName } { participant.lastName } ({ participant.email })
      </li>

    </div>
  )
}

export default Participant;
