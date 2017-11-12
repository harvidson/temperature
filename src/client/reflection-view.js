import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import * as d3 from 'd3'

class ReflectionView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      event: {},
      temperature: "",
      temp: 0
    }
    this.determineTemperature = this.determineTemperature.bind(this);
  }

  componentWillMount() {
    console.log(this.props);

    //check token
    fetch('/api/token', {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      if (!j.authorized) {
        this.props.history.push('/');
        console.log('Unauthorized for this page');
      }
    }).catch((err) => {
      console.log(err)
    })

    //get event by iteration id
    fetch(`/api/events/${this.props.iteration.event_id}`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      // console.log(j);
      this.setState({event: j})
    }).catch((err) => {
      console.log(err);
    })

    const tempString = (this.props.iteration.reflection.text_analytics.documentSentiment.score).toFixed(1)
    console.log(tempString);

    const temp = [Number.parseFloat(tempString)]
    this.setState({
      temp: temp
    })
    this.determineTemperature()
    this.createThermometer()
  }

  componentDidUpdate(){
    this.createThermometer()

  }

  determineTemperature() {
    let color;

    if (this.props.iteration.reflection.one_word_id < 7) {
      color = 'accent-orange'
    } else if (this.props.iteration.reflection.one_word_id > 7 && this.props.iteration.reflection.one_word_id < 13) {
      color = 'mid-yellow'
    } else {
      color = 'ice-blue'
    }

    this.setState({temperature: color})
  }



  createThermometer(){
    const temp = this.state.temp
    console.log(temp);

    // const x = d3.scaleLinear()
    //   .domain([-1, 1])
    //   .range([0, 700]);
    //
    //   console.log(x);
    //
    // d3.select(this.node)
    //   .selectAll("div")
    //     .data(temp)
    //   .enter().append("div")
    //     .style("width", function(d) { return x(d) + "px"; })
    //     .text(function(d) { return d; });

  }

  render() {
    const {iteration} = this.props

    return (
      <div className="mh4 modal">

        <div className="tc">
          <h1 className="accent-orange f1-m f1-l f2 fw4">{this.state.event.title}</h1>
        </div>
        <div className="ba b--light-gray pa4 bg-near-white">
          <h2 className="f4 fw3">Prompt</h2>
          <p>{iteration.prompt}</p>
          <div className="tc">
            {iteration.is_anonymous
              ?
              <div><i className="fa fa-users" aria-hidden="true"></i> Analysis by group (anonymous)</div>

              :
              <div><i className="fa fa-user-circle-o" aria-hidden="true"></i> Analysis by individual (not anonymous)</div>
            }
          </div>
        </div>
        <div className="pa4">
          <div className="cf">
            <div className="accent-orange f3 fl fw3 mt0">{iteration.reflection.title}</div>

            <div className="fr v-base">
              <Moment format="MMMM D, YYYY, h:mm a" className="v-base">{iteration.reflection.created_at}</Moment>
            </div>
          </div>

          <div>
            <p>{iteration.reflection.content}</p>
            <div className={`tc ${this.state.temperature} mt3`}>
              <i className="fa fa-thermometer-half fa-lg f5 sans-serif" aria-hidden="true"></i> {iteration.reflection.one_word}  {iteration.reflection.one_word_intensity}
            </div>
            <div className="tc thermometer white mt3">
              {(iteration.reflection.text_analytics.documentSentiment.score).toFixed(1)}
            </div>
            <div className="tc thermometer mt3">
              <svg width="700" height="10" ref={node => this.node = node}></svg>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default ReflectionView
