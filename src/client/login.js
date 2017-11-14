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
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    }
    this.login(user)
  }

  login(user){
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
      console.log(response.status);
      if (response.status !== 200) {
        alert("Jacob says you done goofed.")
        throw 'Invalid login'
      }


        return response.json();
    }).then((j) => {
      console.log(j);
      this.props.saveUser(this.state.email)
      this.resetForm();
      this.props.history.push('/dashboard');
    }).catch((err) => {
      console.log(err)
    })
  }

  resetForm() {
    this.setState({email: '', password: ''})
  }

  render() {
    return (

      <div className="w-100 modal">

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
          <p>Need an account? <a className="accent-orange link pointer" onClick={ () => {this.props.openModal('signup')}}>Sign up</a>.</p>
        </div>
      </div>

    )
  }

}

export default login;
