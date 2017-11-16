import React from 'react'
import Header from './header'
import OneWord from './analytics-one-word'
import OneWordWriter from './analytics-one-word-writer'
import LineChart from './analytics-line-chart'
import Wordcloud from './analytics-wordcloud'


class Analytics extends React.Component {
  constructor(){
    super()

    this.state = {
      event: null,
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
    const { event } = this.state

    return(

      <div>
        <Header></Header>
        <main>

          <div className="bg-light-gray ba b--light-gray pa2 mt4 cf br1">
            <div className="fl mh1">
              <h2 className="f1 fw3 dark-gray mv1">{event ? event.title : ''} Analytics</h2>
            </div>
          </div>

          {event && event.is_lead
            ? <div>
                <OneWord event={event}></OneWord>
                <Wordcloud event={event}></Wordcloud>
              </div>
            : null
          }
          {event && !event.is_lead
            ? <div>
                <OneWordWriter event={event}></OneWordWriter>
              </div>
            : null
          }
          {event
            ? <div><LineChart event={event}></LineChart></div>
            : null
          }


      </main>


      </div>
    )
  }
}

export default Analytics
