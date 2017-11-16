import React from 'react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';


class AddParticipant extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      participants: [],
      invalidEmails: [],
      registered: [],
      notRegistered: [],
      formSubmitted: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({participants: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.participants.length <= 0) {
      this.props.toggleAddParticipant()
      return
    }

    const participants = this.checkPartipants(this.state.participants)

    if (participants.length <= 0) alert('No valid emails were entered. Check for errors.');
    else {
      this.postParticipants(participants)
      this.setState({
        formSubmitted: true
      })
    }
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

  postParticipants(participants) {
    const eventId = this.props.eventId;

    fetch(`/api/events/${eventId}/users`, {
      method: 'post',
      body: JSON.stringify(participants),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      this.setState({
        registered: j.registered,
        notRegistered: j.notRegistered
      })

    }).catch((err) => {
      console.log(err)
    })
  }


  render(){
    return(
      // TODO: improve grammar for plural/singular results
      <div>
        {this.state.formSubmitted
          ?
            <div>
              <h2 className="f4 fw3 accent-orange">Submitted</h2>
              {this.state.registered.length > 0
                ?
                  <div className="f5 fw3">These email addresses have been added: {this.state.registered}.</div>
                : <div className="f5 fw3">No participants have been added.</div>
              }
              {this.state.notRegistered.length > 0
                ?
                  <div className="f5 fw2 mt2">These emails haven't been registered with Temperature: {this.state.notRegistered}.</div>
                : null
              }
              {this.state.invalidEmails.length > 0
                ?
                  <div className="f5 fw2 mt2">Some emails were invalid: {this.state.invalidEmails}.</div>
                : null
              }
            </div>
          :
            <div>
              <form onSubmit={this.handleSubmit}>
              <div className="mt4">
                <label className="fw3 lh-copy f5 dark-gray db">
                  Invite new participants
                  <textarea className="mv2 w-100 db input-reset ba b--black-20 bg-white-30 f5" type="textarea" rows="2" name="participants" value={this.state.participants} onChange={this.handleChange}/>
                  <small className="f6 black-60 db mb2">Add email addresses for new participants. We'll let you know which ones are registered.</small>
                </label>
              </div>
              <div className="tc mt4">
                <button className="f6 no-underline grow dib v-mid white ba ph3 pv2 mb3  mr1 action-button br1 link grow pointer" type="submit" value="Submit">Submit</button>
                <button className="f6 no-underline grow dib v-mid white ba ph3 pv2 mb3 ml1 action-button br1 link grow pointer" onClick={this.props.toggleAddParticipant} type="reset" value="Cancel">Cancel</button>
              </div>
            </form>
            </div>


        }





      </div>
    )
  }
}

export default AddParticipant
