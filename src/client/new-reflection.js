import React from 'react';


const NewReflection = ({ match }) => {
  console.log(match);
  return (
    <div>
      <div>Write your new reflection here! id: {match.params.id}</div>

    </div>
  )
}

export default NewReflection
