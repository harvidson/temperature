import React from 'react';
import {Route, Link} from 'react-router-dom';

class Signup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      pronouns: 'she',
      email: '',
      password: ''
    }

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePronounsChange = this.handlePronounsChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);

  }

  handleFirstNameChange(event) {
    this.setState({firstName: event.target.value});
  }

  handleLastNameChange(event) {
    this.setState({lastName: event.target.value});
  }

  handlePronounsChange(event) {
    this.setState({pronouns: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = {firstName: this.state.firstName, lastName: this.state.lastName, pronouns: this.state.pronouns, email: this.state.email, password: this.state.password}
    this.postUser(user)

    this.resetForm();
    this.props.saveUser(this.state.id, this.state.firstName)
  }

  async postUser(user) {
   const response = await fetch('/api/users', {
     method: 'POST',
     body: JSON.stringify(user),
     headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json',
     },
     credentials: 'include'
   })
   const userAdded = await response.json()
    this.props.history.push('/dashboard');
 }

  resetForm() {
    this.setState({
      firstName: '',
      lastName: '',
      pronouns: '',
      email: '',
      password: ''})
  }

  render() {
    return (

      <div className="w-100 mh4 modal">

        <div className="tc">
          <h1 className="accent-orange f1-m f2 fw4">Sign up</h1>
        </div>

        <div className="pa4">
          <form onSubmit={this.handleSubmit}>

              <div className="mt3">
                <label className="fw4 lh-copy f5">
                  First name
                  <input className="pa2 mh2 bg-transparent" type="text" name="firstName" value={this.state.firstName} onChange={this.handleFirstNameChange}/>
                </label>
                <label className="fw4 lh-copy f5">
                  Last name
                  <input className="pa2 mh2 bg-transparent" type="text" name="lastName" value={this.state.lastName} onChange={this.handleLastNameChange}/>
                </label>
              </div>
              <div className="mt3">
                <label className="fw4 lh-copy f5">
                  Which pronouns do you prefer?&nbsp;&nbsp;
                  <select value={this.state.pronouns} onChange={this.handlePronounsChange}>
                    <option value="she">She/her</option>
                    <option value="he">He/him</option>
                    <option value="they">They/them</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>
              <div className="mt3">
                <label className="db fw4 lh-copy f5">
                  Email
                  <input className="pa2 mh2 bg-transparent w-100 measure" type="email" name="email" value={this.state.email} onChange={this.handleEmailChange}/>
                </label>
              </div>
              <div className="mt3">
                <label className="db fw4 lh-copy f5">
                  Password
                  <input className="pa2 mh2 bg-transparent" type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                </label>
              </div>
              <div className="tc mt3">
                <button className="f6 no-underline grow dib v-mid white ba ph3 pv2 mb3 action-button br1 link grow pointer" type="submit" value="Submit">Sign up</button>
              </div>


          </form>
        </div>

        <div className="tc">
          <p>Already have an account? <a className="accent-orange link pointer" onClick={ () => {this.props.openModal('login')}}>Log in</a>.</p>
        </div>
      </div>

    )
  }

}

export default Signup;
