import React from 'react'
import * as d3 from 'd3'

class LineChart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      aggregateScores: [],
      aggregateScoresWithMagnitude: [],
      checkboxState: false
    }

    this.createLineChart = this.createLineChart.bind(this);
    this.toggleMagnitude = this.toggleMagnitude.bind(this);
    this.getReflectionData = this.getReflectionData.bind(this);
    this.getWriterReflectionData = this.getWriterReflectionData.bind(this);
  }

  componentWillMount() {}

  componentDidMount() {
    this.createLineChart()
  }

  componentWillReceiveProps(nextProps) {
    //get reflection data
    console.log('show me nextProps.event', nextProps.event);

    if (nextProps.event.is_lead) {
      this.getReflectionData(nextProps.event.id)
    } else {
      this.getWriterReflectionData(nextProps.event.id)
    }
  }

  componentDidUpdate() {
    this.createLineChart()
  }

  toggleMagnitude(event) {
    this.setState({
      checkboxState: !this.state.checkboxState
    })
  }

  getReflectionData(id) {
    fetch(`/api/events/${id}/reflectionsOverTime`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((j) => {
      console.log(j);
      this.setState({aggregateScores: j.aggregateScores, aggregateScoresWithMagnitude: j.aggregateScoresWithMagnitude})
    }).catch((err) => {
      console.log(err);
    })
  }

  getWriterReflectionData(id) {
    fetch(`/api/events/${id}/writerReflectionsOverTime`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((j) => {
      console.log(j);
      this.setState({aggregateScores: j, aggregateScoresWithMagnitude: j})
    }).catch((err) => {
      console.log(err);
    })
  }

  createLineChart() {
    let clear = d3.select(this.node)
    clear.selectAll('*').remove();

    let aggregateData = this.state.aggregateScores

    // set the dimensions and margins of the graph
    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
      },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    aggregateData.forEach(function(d) {
      d.date = d3.isoParse(d.date);
      d.score = +d.score;
      d.scoreMagnitude = +d.scoreMagnitude

    });

    // set the ranges

    //prob want to use d3 min and max to find the....this part needs work...converting data into pixel points
    var x = d3.scaleTime().domain(d3.extent(aggregateData, function(d) {
      return d.date;
    })).range([0, width]);

    var y = d3.scaleLinear().domain([-1, 1]).range([height, 0]);

    //specify domain for y scale

    // define the line
    var valueline = d3.line().x(function(d) {
      return x(d.date);
    }).y(function(d) {
      return y(d.score);
    });

    var valueline2 = d3.line().x(function(d) {
      return x(d.date);
    }).y(function(d) {
      return y(d.scoreMagnitude);
    });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select(this.node).attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // // sort date ascending
    aggregateData.sort(function(a, b) {
      return a["date"] - b["date"];
    })

    console.log(aggregateData);

    // Add the valueline path.
    svg.append("path").data([aggregateData]).attr("class", "line").attr("d", valueline);
    // Add the valueline path if checkbox is checked.
    this.state.checkboxState
      ? svg.append("path").data([aggregateData]).attr("class", "line2").attr("d", valueline2)
      : null
    // Add the X Axis
    svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g").call(d3.axisLeft(y));
  }

  render() {
    return (
      <div className="w-50 mt3 tc">
       <div>
              <div className="tc">
                <svg width="960" height="500" ref={node => this.node = node}></svg>
              </div>

              <div className="f4 tc">Reflections</div>

              {this.props.event.is_lead
                ? <div className="f5 tc">
                    <input type="checkbox" className="" name="checkMagnitude" onClick={this.toggleMagnitude}/>
                    <label>
                      Weight reflections by intensity</label>
                  </div>
                : null
              }
            </div>

      </div>
    )
  }
}

export default LineChart
