import React from 'react'
import * as d3 from 'd3'

class LineChart extends React.Component {
  constructor() {
    super()

    this.state = {
      aggregateScores: [],
      aggregateScoresWithMagnitude: []
    }

    this.createLineChart = this.createLineChart.bind(this);
  }

  componentWillMount() {}

  componentDidMount() {
    // this.createLineChart()
  }

  componentWillReceiveProps(nextProps) {
    //get reflection data
    console.log('show me nextProps.event', nextProps.event);

    fetch(`/api/events/${nextProps.event.id}/reflectionsOverTime`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((j) => {
      console.log(j);
      this.setState({
        aggregateScores: j.aggregateScores,
        aggregateScoresWithMagnitude: j.aggregateScoresWithMagnitude
        })
    }).catch((err) => {
      console.log(err);
    })
  }

  // shouldComponentUpdate() {
  //
  // }

  componentDidUpdate() {
    this.createLineChart()
  }

  createLineChart() {
    let aggregateData =
    this.state.aggregateScores
    // '[     {        "date": "2005",        "score": "0.58"      }, {        "date": "2004",        "score": "0.2"      }, {        "date": "2008",        "score": "-0.5"      }, {       "date": "2009",        "score": "0.99"      }, {        "date": "2010",        "score": "0.65"      }    ]';


    console.log(aggregateData);
    // set the dimensions and margins of the graph
    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
      },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // parse the date / time
    // var parseTime = d3.timeParse("%Y");

    // format the data
    //  aggregateData = JSON.parse(aggregateData)
    console.log(aggregateData);
    aggregateData.forEach(function(d) {
      // d.date = d.date;
      d.date = d3.isoParse(d.date);
      d.score = +d.score;

    });

    // set the ranges

    //prob want to use d3 min and max to find the....this part needs work...converting data into pixel points
    var x = d3.scaleTime()
      .domain(d3.extent(aggregateData, function(d) {
        return d.date;
      }))
      .range([0, width]);

    var y = d3.scaleLinear()
      .domain([-1, 1])
      .range([height, 0]);

    console.log(y(-0.95));
    //specify domain for y scale

    // define the line
    var valueline = d3.line().x(function(d) {
      // console.log(x(d.date));
      return x(d.date);
    }).y(function(d) {
      return y(d.score);
    });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select(this.node).attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    // // sort years ascending
    aggregateData.sort(function(a, b) {
      return a["date"] - b["date"];
    })

    console.log(aggregateData);

    // Add the valueline path.
    svg.append("path").data([aggregateData]).attr("class", "line").attr("d", valueline);
    // Add the valueline path.
    // svg.append("path").data([aggregateData]).attr("class", "line").attr("d", valueline2);
    // Add the X Axis
    svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g").call(d3.axisLeft(y));
  }

render() {
  return (
    <div>

      <svg width="960" height="500" ref={node => this.node = node}></svg>

    </div>
  )
}
}

export default LineChart
