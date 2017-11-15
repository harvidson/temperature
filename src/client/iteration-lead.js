import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

class IterationLead extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      reflectionsIn: 0
    }

  }

  componentWillMount() {
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
    const { reflectionsIn } = this.state

    return (
      <div>
            <div className="cf">
              <p className="f5 fw4 fl"><Moment format="MMMM D, YYYY">{this.props.iteration.due_date}</Moment></p>
              {reflectionsIn === 1
                ?   <p className="fr"><span className="f5 fw4 fl mt0 br-100 submissions white ph1">{this.state.reflectionsIn}</span><span className="f5 fw4 fl mt0 dark-gray ph1">reflection submitted&nbsp;</span></p>
                : null
              }
              {reflectionsIn > 1
                ? <p className="fr"><span className="f5 fw4 fl mt0 br-100 submissions white ph1">{this.state.reflectionsIn}</span><span className="f5 fw4 fl mt0 dark-gray ph1">reflections submitted</span></p>
                : null
              }
            </div>

      </div>
    )
  }


}


export default IterationLead
