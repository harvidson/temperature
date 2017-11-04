import React from 'react';
import {Route, Link} from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

class NewEvent extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      title: '',
      description: '',
      defaultPrompt: '',
      participants: '',
      invalidEmails: [],
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDefaultPromptChange = this.handleDefaultPromptChange.bind(this);
    this.handleParticipantsChange = this.handleParticipantsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleDescriptionChange(event){
    this.setState({description: event.target.value});
  }

  handleDefaultPromptChange(event) {
    this.setState({defaultPrompt: event.target.value});
  }

  handleParticipantsChange(event) {
    this.setState({participants: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const participants = this.checkPartipants(this.state.participants)

    const newEvent = {
      title: this.state.title,
      description: this.state.description,
      defaultPrompt: this.state.defaultPrompt,
      participants: participants
    }

    this.postEvent(newEvent)
  }

  checkPartipants() {
    const separators = /\s|\t|\n|\r|,|;/;
    const valid = [];
    const invalid = [];
    const emails = this.state.participants.split(separators)

    for (let i = 0; i < emails.length; i++) {
      isEmail(emails[i]) ? valid.push(emails[i]) : invalid.push(emails[i])
    }
    const invalidPruned = invalid.filter(email => !isEmpty(email))
    this.setState({invalidEmails: invalidPruned})

    return valid;
  }

  postEvent(newEvent) {
    fetch('/api/events', {
      method: 'post',
      body: JSON.stringify(newEvent),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      j.participants.invalidEmails = this.state.invalidEmails;
      this.props.saveEvent(j)
    }).catch((err) => {
      console.log(err);
    })
  }

  render(){
    return(
        <div className="mh4">


          <div className="tc">
            <h1 className="accent-orange f1-l f2 fw4">New Journal</h1>
          </div>

          <div className="pa4">
            <form onSubmit={this.handleSubmit}>

                <div className=" ">
                    <label className="fw3 lh-copy f4 dark-gray db">
                      Title
                      <input className="mv2 bg-transparent w-100 measure db input-reset ba b--black-20 f5" type="text" name="title" value={this.state.title} onChange={this.handleTitleChange}/>
                    </label>

                </div>
                <div className="mt4">
                  <label className="fw3 lh-copy f4 dark-gray db">
                    Description
                    <textarea className="mv2 bg-transparent w-100 measure db input-reset ba b--black-20 f5" rows="6" type="textarea" name="description" value={this.state.description} onChange={this.handleDescriptionChange}/>
                    <small id="name-desc" className="f6 black-60 db mb2">Describe your purpose: what do you hope this journal will accomplish?</small>
                  </label>
                </div>
                <div className="mt4">
                  <label className="fw3 lh-copy f4 dark-gray db">
                    Reflection prompt
                    <textarea className="mv2 bg-transparent w-100 measure db input-reset ba b--black-20 f5" rows="3" type="teaxtarea" name="defaultPrompt" value={this.state.defaultPrompt} onChange={this.handleDefaultPromptChange}/>
                      <small id="name-desc" className="f6 black-60 db mb2">This is a default. You can customize it each time you assign a new reflection.</small>
                  </label>
                </div>
                <div className="mt4">
                  <label className="fw3 lh-copy f4 dark-gray db">
                    Invite participants
                    <textarea className="mv2 bg-transparent w-100 measure db input-reset ba b--black-20 f5" type="textarea" rows="2" name="participants" value={this.state.participants} onChange={this.handleParticipantsChange}/>
                    <small id="name-desc" className="f6 black-60 db mb2">Add email addresses for your participants.</small>
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

export default NewEvent;
