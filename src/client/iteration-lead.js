import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

class IterationLead extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      reflectionsIn: 0
    }

    //get count of number of reflections submitted for this iteration
    fetch(`/api/iterations/${this.props.iteration.iteration_id}/reflections`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((number) => {
      this.setState({ reflectionsIn: number })
    }).catch((err) => {
      console.log(err);
    })
  }


  render(){
    return (
      <div>
            <div className="cf">
              <h3 className="f4 fw4 fl mt0"><Moment format="MMMM D, YYYY">{this.props.iteration.due_date}</Moment></h3>
              <p className="f5 fw4 fr mt0">{this.state.reflectionsIn}</p>
            </div>

      </div>
    )
  }


}


export default IterationLead
