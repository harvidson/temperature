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
    this.handleMinWordCountChange = this.handleMinWordCountChange.bind(this)
    this.handleIsAnonymousChange = this.handleIsAnonymousChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);


  }

handleInputChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  this.setState({
    [name]: value
  });
}

handleDueDateChange(event) {
  this.setState({dueDate: event.target.value});
}

handleDueDateChange(date) {
  this.setState({dueDate: date});
}

handleMinWordCountChange(event) {
  this.setState({minWordCount: event.target.value});
}

handleIsAnonymousChange(event) {
  this.setState({isAnonymous: event.target.value});
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
  console.log('iteration submitted!', newIteration);
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
                    className="mv2 bg-transparent w-100 measure db ba b--black-20 f5"
                    rows="3" type="teaxtarea"
                    name="prompt"
                    value={ this.state.prompt }
                    onChange={ this.handleInputChange }/>

                </label>
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
