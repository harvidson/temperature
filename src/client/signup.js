import React from 'react'
import {Route, Link} from 'react-router-dom'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { Formik } from 'formik'

class Signup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      pronouns: '',
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

  handlePronounsChange(val) {
    this.setState({pronouns: val});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      pronouns: this.state.pronouns,
      email: this.state.email,
      password: this.state.password
    }

    this.postUser(user)
  }

   postUser(user) {
     fetch('/api/users', {
     method: 'POST',
     body: JSON.stringify(user),
     headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json',
     },
     credentials: 'include'
   })
   .then((response) => {
     if (response.status !== 200) {
       this.setState({
         loginInvalid: true
       })
       throw 'Invalid signup'
     }

     return response.json()
   })
   .then((response) => {
     this.resetForm();
     this.props.saveUser(this.state.id, this.state.firstName)
     this.props.history.push('/dashboard');
   }).catch((err) => {
     console.log(err)
   })

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
    const options = [
      { value: "she", label: 'She/her' },
      { value: "he", label: 'He/him'},
      { value: "they", label: 'They/them' },
      { value: "other", label: 'Other' }
    ]

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
                  <input className="pa2 mh2 bg-transparent ba b--black-20 br2" type="text" name="firstName" value={this.state.firstName} onChange={this.handleFirstNameChange}/>
                </label>
                <label className="ml2 fw4 lh-copy f5">
                  Last name
                  <input className="pa2 mh2 bg-transparent ba b--black-20 br2" type="text" name="lastName" value={this.state.lastName} onChange={this.handleLastNameChange}/>
                </label>
              </div>
              <div className="mt3 w-100 lh-copy">
                <label className="fw4 f5 dib w-100">
                  Which pronouns do you prefer?&nbsp;&nbsp;
                  <Select
                    name="pronouns"
                    value={this.state.pronouns}
                    onChange={this.handlePronounsChange}
                    options={options}
                    className="dib w-30 ml2 v-mid"
                    placeholder="Select..."
                  />
                </label>
              </div>
              <div className="mt3">
                <label className="db fw4 lh-copy f5 ">
                  Email
                  <input
                    className="pa2 mh2 bg-transparent w-100 measure ba b--black-20 br2"
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                  />
                </label>
              </div>
              <div className="mt3">
                <label className="db fw4 lh-copy f5">
                  Password
                  <input className="pa2 mh2 bg-transparent ba b--black-20 br2" type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange}/>
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
