import React from 'react'
import Modal from 'react-modal';

import Header from './header'
import EventWriting from './event-writing'
import EventLeading from './event-leading'
import NewEvent from './new-event'
import EventFormResponse from './event-form-response'
import NewIteration from './new-iteration'
import ReflectionView from './reflection-view'
import EventView from './event-view'


class Dashboard extends React.Component {
  constructor() {
    super()

    this.state = {
      leading: [],
      writing: [],
      modalIsOpen: false,
      modalType: null,

    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.saveIteration = this.saveIteration.bind(this);


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

  openModal(type, data) {
    this.setState({
      modalIsOpen: true,
      modalType: type,
      modalData: data || {}
    });
  }

  closeModal() {
    this.setState({modalIsOpen: false});
    this.props.history.push('/dashboard');
  }

  modal(type, data) {
    switch (type) {
      case 'newEvent': return <NewEvent saveEvent={this.saveEvent} />
      case 'newIteration': return <NewIteration saveIteration={this.saveIteration} event={data} saveIteration={this.saveIteration} openModal={this.openModal}/>
      case 'eventFormResponse': return <EventFormResponse newEvent={this.state.newEvent} closeModal={this.closeModal}/>
      case 'iterationFormResponse': return <IterationFormResponse newIteration={this.state.newIteration} closeModal={this.closeModal}/>
      case 'reflectionView': return <ReflectionView iteration={data} closeModal={this.closeModal}/>
      case 'eventView': return <EventView event={data} closeModal={this.closeModal}/>
      default: return null
    }
  }

  saveEvent(newEvent) {
    console.log('newEvent sent to dashboard', newEvent);
    this.setState({newEvent: newEvent})
    this.openModal('eventFormResponse')
  }

  saveIteration(newIteration){
    console.log('newIteration sent to dashboard', newIteration);
    this.setState({newIteration: newIteration})
    this.closeModal()
    // this.openModal('iterationFormResponse', newIteration)
  }


  render() {
    // const customStyles = {
    //   content : {
    //     top                   : '40%',
    //     left                  : '40%',
    //     right                 : 'auto',
    //     bottom                : 'auto',
    //     marginRight           : '-40%',
    //     transform             : 'translate(-40%, -40%)'
    //   }
    // };

    return (

      <div>
        <Header/>

        <main>
        {/* <div className="bg-moon-gray bg-left bg-center-l w-100 cf"> */}
          <div className="bg-light-gray ba b--light-gray pa4 mt4 cf br1">
          <div className="fl mh4">
            <h2 className="f2 fw3 dark-gray mv1">Take the Temperature</h2>
          </div>
          <div className="fr v-mid">
            <a className="f6 no-underline grow dib v-mid white ba ph2 pv2 ma2 action-button br2 link" href="#" onClick={() => {this.openModal('newEvent')}}><i className="fa fa-book" aria-hidden="true"></i> Create new journal event</a>

          </div>

        </div>
              {/* <div className="thermometer w-10"><p>thermometer!</p><p>gradient</p><p>here</p></div> */}

        <div className="mh5 mt4">
          { this.state.leading.map(event => <EventLeading key={ event.id } event={ event } openModal= { this.openModal }/>) }
        </div>

        {this.state.writing.length > 0
          ?
            <div>
              <div className="bg-light-gray ba b--light-gray pa4 mt4 cf br1">
                <div className="fl mh4">
                  <h2 className="f2 fw3 dark-gray mv1">Write reflections</h2>
                </div>
              </div>
              <div className="mh5 mt4">
                { this.state.writing.map(event => <EventWriting key={ event.id } event={ event } openModal= { this.openModal }/>) }
              </div>
            </div>
          : null
        }


        </main>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          // style={customStyles}
          >

            <div className="cf">
              <i className="fa fa-times fa-lg dark-gray fr f4 pointer" aria-hidden="false" onClick={this.closeModal}></i>
              <img className="fl" src="/static/images/temperature-logo.png" alt="logo" width="100px"/>
            </div>

            {this.modal(this.state.modalType, this.state.modalData)}

        </Modal>

      </div>

    )
  }
}

export default Dashboard;
