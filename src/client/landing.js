import React from 'react';
import {Route, Link} from 'react-router-dom'

import Modal from 'react-modal';
import Signup from './signup'
import Login from './login'

class Landing extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      login: false,
      userId: null

    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.saveUser = this.saveUser.bind(this);

  }

  componentWillMount() {
    //check token
    fetch('/api/token', {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log('response from token check: ', j)
      if (j.authorized) {
        this.props.history.push('/dashboard');
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  openModal(action) {
    if (action === 'login') {
      this.setState({login: true})
    } else {
      this.setState({login: false})
    }

    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  saveUser(id, firstName) {
    // this.setState({userId: id, userName: firstName, modalIsOpen: false, login: false})
  }

  render() {
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };

    return (
      <div>
        <header className="sans-serif">
          {/* <div className="cover bg-left bg-center-l w-100" style={{
            backgroundImage: 'url(static/images/kluber.jpg)'
          }}> */}
            <div className="bg-dark-gray pb4 pb4-m pb5-l">
              <nav className="dt w-100 mw8 center">

                <div className="dtc v-mid tr pa3">
                  {/* <a className="f6 fw4 hover-white no-underline white-70 dib-l pv2 ph3 link" href="/">About</a> */}
                  <a className="f6 fw4 hover-white no-underline white-70 dib-l pv2 ph3 link" href="#" onClick={ () => {this.openModal('login')}}>Log in</a>
                  <a className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba br1 link" href="#" onClick={ () => {this.openModal('signup')} }>Sign Up</a>
                </div>
              </nav>
              <div className="tc mt3 mt4-m mt5-l ph2">
                <div className="mt4">
                  <img src="/static/images/temperature-logo.png" alt="logo" width="600px"/>

                </div>
                <h2 className="fw3 f3 white-80 mb4">Take the temperature of any room.</h2>
                <a className="f6 no-underline grow dib v-mid white ba ph3 pv2 mb3 action-button br1 link" onClick={this.openModal.bind(this, 'signup')} href="#">Get started</a>
              </div>
            </div>
          {/* </div> */}
        </header>

        <main>
          <div className="mv5 mh6">
            <h2 className="f1 fw3 dark-gray">Get candid data.</h2>
            <p className="dark-gray">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            <div className="tc">
              <a className="f6 no-underline grow dib v-mid white ba ph3 pv2 mb3 action-button br1 link" onClick={this.openModal.bind(this, 'signup')}>Get started</a>
            </div>

          </div>
          <hr/>
          <div className="mv5 mh6">
            <h2 className="f1 fw3 dark-gray">Why journal?</h2>
            <p className="dark-gray">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            <ul>
              <li>
                <a href="#" className="link dark-gray">Some study</a>
              </li>
              <li>
                <a href="#" className="link dark-gray">Another study</a>
              </li>
            </ul>

          </div>
        </main>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}

        >
          <div className="cf">
            <i className="fa fa-times fa-lg dark-gray fr f5 pointer" aria-hidden="false" onClick={this.closeModal}></i>
            <img className="fl" src="/static/images/temperature-logo.png" alt="logo" width="100px"/>
          </div>

          {this.state.login
            ? <Login history={this.props.history} saveUser={this.saveUser} openModal={this.openModal}/>
            : <Signup history={this.props.history} saveUser={this.saveUser} openModal={this.openModal}/>}

        </Modal>

      </div>

    )
  }

  /* // TODO: style: make modal smaller */

};

export default Landing;
