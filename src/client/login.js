import React from 'react';
import {Route, Link} from 'react-router-dom';

class login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);

  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    //http call
    event.preventDefault();

    const user = {email: this.state.email, password: this.state.password}
    this.login(user)



    //this needs to send back user id when it gets it from the http response
    this.resetForm();
    this.props.saveUser(this.state.email)
  }

  login(user){
    console.log(user);
    fetch('/api/token', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include'

      })
    .then((response) => {
      return response.json();
    }).then((j) => {
      this.props.history.push('/dashboard');
      console.log(j)
    }).catch((err) => {
      console.log(err)
    })
  }

// TODO: reset is not working
  resetForm() {
    this.setState({email: '', password: ''})
  }

 //  async logIn(user) {
 //   const response = await fetch('/api/token', {
 //     method: 'POST',
 //     body: JSON.stringify(user),
 //     headers: {
 //       'Content-Type': 'application/json',
 //       'Accept': 'application/json',
 //     }
 //   })
 //   const userAdded = await response.json()
 //    console.log('userAdded', userAdded);
 // }

  render() {
    return (

      <div className="w-100 mh4">

        <div className="tc">
          <h1 className="accent-orange f1-m f2 fw4">Log in</h1>
        </div>

        <div className="pa4">
          <form onSubmit={this.handleSubmit}>

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
                <button className="f6 no-underline grow dib v-mid white ba ph3 pv2 mb3 action-button br1 link grow pointer" type="submit" value="Submit">Log in</button>
              </div>


          </form>
        </div>

        <div className="tc">
          <p>Need an account? <a className="accent-orange link" href="#">Sign up</a>.</p>
        </div>
      </div>

    )
  }

}

export default login;
