import React from 'react'
import Header from './header'
import OneWord from './analytics-one-word'
import LineChart from './analytics-line-chart'
import Wordcloud from './analytics-wordcloud'


class Analytics extends React.Component {
  constructor(){
    super()

    this.state = {
      event: {},
      isLead: false

    }
    this.getEventData = this.getEventData.bind(this);
    this.checkToken = this.checkToken.bind(this);

  }

  componentWillMount() {
    this.checkToken()
    this.getEventData()
  }

  componentDidMount(){
  }

  componentDidUpdate() {
  }

  getEventData(){
    fetch(`/api/events/${this.props.match.params.id}`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log(j);
      this.setState({
        event: j
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  checkToken() {
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
  }




  render(){
    return(

      <div>
        <Header></Header>
        <main>

          <div className="bg-light-gray ba b--light-gray pa4 mt4 cf br1">
            <div className="fl mh4">
              <h2 className="f2 fw3 dark-gray mv1">{this.state.event.title} Analytics</h2>
            </div>
          </div>

          <OneWord event={this.state.event}></OneWord>
          <Wordcloud event={this.state.event}></Wordcloud>
          <LineChart event={this.state.event}></LineChart>

      </main>


      </div>
    )
  }
}

export default Analytics
