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
        top                   : '45%',
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
            <p className="dark-gray f4">Temperature is a tool for gathering authentic, candid information about people’s states of mind while preserving their confidentiality. It combines reflective writing that only the writer will see with aggregate data analytics for the group, allowing leaders to ask targeted questions and trace responses over time. Temperature is an analytics platform that keeps leaders up to speed.</p>


            <div className="tc">
              <a className="f6 no-underline grow dib v-mid white ba ph3 pv2 mb3 action-button br1 link" onClick={this.openModal.bind(this, 'signup')}>Get started</a>
            </div>

          </div>
          <hr/>
          <div className="mv5 mh6">
            <h2 className="f1 fw3 dark-gray">Why journal?</h2>
            <p className="dark-gray f4">Temperature adds a vital upgrade to the traditional survey: it makes responding valuable to the people answering the questions. </p>
            <p className="dark-gray f4">The benefits of journalling are well documented. The <a href="https://hbr.org/2011/04/four-reasons-to-keep-a-work-di" className="link orange-link"><i>Harvard Business Review</i></a> cites four key ones: improved focus, patience, planning, and personal growth. Reflective writing is a powerful tool for integrating learning more deeply; identifying barriers to success; working through difficult feelings, stress, or conflict; and tracing personal trajectories.</p>
            <ul>
              <li>
                <a href="https://hbr.org/2011/04/four-reasons-to-keep-a-work-di" className="f4 link dark-gray orange-link">Four Reasons to Keep A Work Diary</a>
              </li>
              <li>
                <a href="https://psychcentral.com/lib/the-health-benefits-of-journaling/" className="f4 link dark-gray orange-link">The Health Benefits of Journalling</a>
              </li>
            </ul>
            <p className="dark-gray f4">
              These are excellent reasons to integrate reflective writing into your team's process for sharing feedback. Temperature is a journalling platform that enables group members to express themselves on their own terms.
            </p>


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
