import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/datepicker.css';

class NewIteration extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      prompt: this.props.event.default_prompt || '',
      minWordCount: '0',
      isAnonymous: true,
      description: this.props.event.description || '',

    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDueDateChange = this.handleDueDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


  }

handleInputChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? false : target.value;
  const name = target.name;

  this.setState({
    [name]: value
  });
}

handleDueDateChange(date) {
  this.setState({dueDate: date});
}

handleSubmit(event) {
  event.preventDefault();
  const dueDate = this.state.dueDate.toISOString()

  const newIteration = {
    prompt: this.state.prompt,
    dueDate: dueDate,
    minWordCount: this.state.minWordCount,
    isAnonymous: this.state.isAnonymous
  }
  this.postIteration(newIteration)
  console.log('iteration submitted!', newIteration);
}

postIteration(newIteration) {
  return fetch(`/api/events/${this.props.event.id}/iterations`, {
    method: 'post',
    body: JSON.stringify(newIteration),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include'
  }).then((response) => {
    return response.json();
  }).then((j) => {
    console.log(j);
    this.props.saveIteration(j)
  }).catch((err) => {
    console.log(err);
  })
}


  render(){
    const { event } = this.props

    return(
      <div className="mh4">

        <div className="tc">
          <h1 className="accent-orange f1-m f2 fw4">New Reflection </h1>
          <h2 className="accent-orange f2-m f3 fw4">{ event.title }</h2>
        </div>

        <div className="pa4">
          <form onSubmit={ this.handleSubmit }>

                <div className="mt4">
                <div className="fw3 lh-copy f4 dark-gray db">
                  Series description</div>
                  <p>{ event.description }</p>
              </div>
              <div className="mt4">
                <label className="fw3 lh-copy f4 dark-gray db">
                  Reflection prompt
                  <textarea
                    className="mv2 bg-transparent w-100 db ba b--black-20 f5"
                    rows="3"
                    type="teaxtarea"
                    name="prompt"
                    value={ this.state.prompt }
                    onChange={ this.handleInputChange }/>

                </label>
              </div>
              <div className="mt4">
                <label className="fw3 lh-copy f4 dark-gray db">
                  Minimum word count <span className="f6 black-60">(optional)</span>
                  <input
                    className="mv2 bg-transparent db ba b--black-20 f5"
                    type="number"
                    step="50" min="0" max="500"
                    name="minWordCount"
                    value={ this.state.minWordCount }
                    onChange={ this.handleInputChange }
                  />
                </label>
              </div>
              <div className="mt4">
                <label className="fw3 lh-copy f4 dark-gray db">
                  Access to data
                </label>
                <p className="f5 black-60 mb2">By default, participant data is anonymous: you'll see sentiment analysis for the group as a whole but not for individual participants. If you need to know how people are doing individually, check the box below. We'll let participants know that you'll be able to see their individual data but not their written reflections.</p>
                <input
                  className="mv2 f5"
                  type="checkbox"
                  name="isAnonymous"
                  value="false"
                  id="isAnonymousF"
                  onChange={ this.handleInputChange }
                />
                <label htmlFor="isAnonymousT" className="pl2 pr4">See individual data</label>
              </div>
              <div className="mt4">
                <label className="fw3 lh-copy f4 dark-gray db">
                  Due date
                  <DatePicker
                    name="dueDate"
                    selected={ this.state.dueDate }
                    onChange={ this.handleDueDateChange }
                    showTimeSelect
                    dateFormat="LLL"
                    className="f5 w-100"
                  />

                </label>
              </div>
              <div className="tc mt4">
                <button className="f6 no-underline grow dib v-mid white ba ph3 pv2 mb3 action-button br1 link grow pointer" type="submit" value="Submit">Submit</button>
              </div>


          </form>
        </div>


      </div>
    )
  }
}

export default NewIteration
