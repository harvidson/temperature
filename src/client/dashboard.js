import React from 'react'
import {Route, Link} from 'react-router-dom';
import Modal from 'react-modal';

import Writing from './writing'
import Leading from './leading'
import Header from './header'
import NewEvent from './new-event'
import NewIteration from './new-iteration'
import FormResponse from './form-response'

class Dashboard extends React.Component {
  constructor() {
    super()

    this.state = {
      leading: [],
      writing: [],
      modalIsOpen: false,

      //this var controls the new form modal;
      modalType: null,
      newEvent: {}

    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.saveEvent = this.saveEvent.bind(this);

    //check token
    fetch('/api/token', {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log('response from token check: ', j)
      if (!j.authorized) {
        this.props.history.push('/');
        console.log('Unauthorized for this page');
      }
    }).catch((err) => {
      console.log(err)
    })

    //load user's events
    fetch('/api/events', {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log(j);
      this.setState({leading: j.leading, writing: j.writing});
    }).catch((err) => {
      console.log(err);
    })

  }

  openModal(type) {
    this.setState({
      modalIsOpen: true,
      modalType: type
    });
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  saveEvent(newEvent) {
    console.log('newEvent sent to dashboard', newEvent);
    this.newEvent = newEvent
    this.openModal('formResponse')
  }

  modal(type) {
    switch (type) {
      case 'newEvent': return <NewEvent saveEvent={this.saveEvent}/>
      case 'newIteration': return <NewIteration saveIteration={this.saveIteration}/>
      case 'formResponse': return <FormResponse newEvent={this.newEvent}/>
      default: return null
    }
  }

  render() {
    return (

      <div>
        <Header/>

        <main>

          <div className="bg-moon-gray bg-left bg-center-l w-100">
            <div className="tr">
              <a className="f6 no-underline grow dib v-mid white ba ph2 pv2 ma2 action-button br2 link" href="#" onClick={() => {this.openModal('newEvent')}}><i className="fa fa-book" aria-hidden="true"></i> Create new journal</a>
            </div>
          </div>

          <div className="ma5 leading">
            {this.state.leading.length > 0
              ? <Leading events={this.state.leading} openModal={this.openModal}/>
              : null}
          </div>

          <div className="ma5 writing">
            {this.state.writing.length > 0
              ? <Writing events={this.state.writing}/>
              : null}
          </div>

        </main>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          >

            <div className="cf">
              <i className="fa fa-times fa-lg dark-gray fr f5 pointer" aria-hidden="false" onClick={this.closeModal}></i>
              <img className="fl" src="/static/images/temperature-logo.png" alt="logo" width="100px"/>
            </div>

            {this.modal(this.state.modalType)}

            </Modal>
      </div>

    )
  }
}

export default Dashboard;
