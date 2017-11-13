import React from 'react'
import * as d3 from 'd3'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class OneWord extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      oneTruth: [],
      dateOptions: [],
      checkboxIsChecked: false,
      noReflections: false,
      dateSelected: '',
      d3Data: []

    }
    this.createDonutChart = this.createDonutChart.bind(this);
    this.toggleIntensity = this.toggleIntensity.bind(this);
    this.getOneWordData = this.getOneWordData.bind(this);
    this.getOneWordWriterData = this.getOneWordWriterData.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.event.is_lead) {
      this.getOneWordData(nextProps.event.id)
      .then((j) => {
        this.setState({
          oneTruth: j,
          d3Data: j.oneWords
        })
      }).catch((err) => {
        console.log(err);
      })

      this.getDates(nextProps.event.id)
    } else {
      // this.getOneWordWriterData(nextProps.event.id)
      console.log('this is the writer');
    }
  }

  componentDidMount() {
    this.createDonutChart()
  }

  componentDidUpdate() {
    console.log('componentDidUpdate checkbox checked? ', this.state.checkboxIsChecked);
    this.createDonutChart()
    console.log('after componentDidUpdate, d3Data using this data', this.state.d3Data);
  }

  toggleIntensity(event) {
    console.log('toggleIntensity before setState: checkbox checked? ', this.state.checkboxIsChecked);
    this.setState({
      checkboxIsChecked: !this.state.checkboxIsChecked,
      //d3Data here will be working
      d3Data: !this.state.checkboxIsChecked ? this.state.oneTruth.oneWordsWithIntensity : this.state.oneTruth.oneWords
    });
  }

  getOneWordData(id) {
    return fetch(`/api/events/${id}/one-words`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    })
  }

  getDates(id) {
    return fetch(`/api/events/${id}/dates`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json()
    }).then((j) => {
      this.setState({
        dateOptions: j
      })
    })
  }

// TODO: make this into its own component
  getOneWordWriterData(id) {
    return fetch(`/api/events/${id}/one-words-writer`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      this.setState({
        oneTruth: j,
        d3Data: j.oneWords
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  getWordsByDate(iterationId) {
    return fetch(`/api/iterations/${iterationId}/one-words`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    })
  }

  handleDateChange(val){
    console.log('Selected: ', val);
    if (val === null) {
      this.getOneWordData(this.props.event.id)
      .then((data) => {
        console.log(data);
        this.setState({
          oneTruth: data,
          dateSelected: '',
          d3Data: data.oneWords || [],
          checkboxIsChecked: false
        })
      })
      .catch((err) => {
        console.log(err);
      })

    } else {
      this.getWordsByDate(val.value)
      .then((data) => {

        this.setState({
          dateSelected: val,
          checkboxIsChecked: false,
          oneTruth: data,
          d3Data: data.oneWords
        })
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  createDonutChart() {
    let clear = d3.select(this.node)
    clear.selectAll('*').remove();

    // const oneWordData = this.state.checkboxState
    //   ? this.state.oneWords
    //   : this.state.oneWordsWithIntensity

    const oneWordData = this.state.d3Data

    const width = 360;
    const height = 360;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory20c);
    const donutWidth = 75;
    const legendRectSize = 18;
    const legendSpacing = 4;

    const svg = d3.select(this.node).append('svg').attr('width', width).attr('height', height).append('g').attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    const arc = d3.arc().innerRadius(radius - donutWidth).outerRadius(radius);

    const pie = d3.pie().value(function(d) {
      return d.score;
    }).sort(null);

    const path = svg.selectAll('path').data(pie(oneWordData)).enter().append('path').attr('d', arc).attr('fill', function(d) {
      return color(d.data.word);
    });

    path.on('mouseover', function(d) {
      let total = d3.sum(oneWordData.map(function(d) {
        return d.score;
      }));
      const percent = Math.round(1000 * d.data.score / total) / 10;
      // console.log('percent: ', percent);
      tooltip.select('.label').html(d.data.word);
      // console.log(d.data.word);
      tooltip.select('.percent').html(percent + '%');
      tooltip.style('display', 'block');
    });

    path.on('mouseout', function() {
      tooltip.style('display', 'none');
    });

    const legend = svg.selectAll('.legend').data(color.domain()).enter().append('g').attr('className', 'legend').attr('transform', function(d, i) {
      var height = legendRectSize + legendSpacing;
      var offset = height * color.domain().length / 2;
      var horz = -2 * legendRectSize;
      var vert = i * height - offset;
      return 'translate(' + horz + ',' + vert + ')';
    });

    legend.append('rect').attr('width', legendRectSize).attr('height', legendRectSize).style('fill', color).style('stroke', color);

    legend.append('text').attr('x', legendRectSize + legendSpacing).attr('y', legendRectSize - legendSpacing).text(function(d) {
      return d;
    });

    // TODO: make tooltip work
    const tooltip = d3.select(this.node).append('div').attr('class', 'tooltip');

    tooltip.append('div').attr('class', 'label');
    tooltip.append('div').attr('class', 'count');
    tooltip.append('div').attr('class', 'percent');
  }

  render() {
    console.log('checkbox in render ', this.state.checkboxIsChecked);

    return (

      <div className="w-50 mt3">
        {this.state.d3Data.length > 0
          ?
            <div>
              <div className="tc">
                <svg ref={node => this.node = node} width={400} height={400}></svg>
              </div>
              <div className="f4 tc">One-word answers</div>
              <div className="f5 tc">
                <input
                  type="checkbox"
                  className="checkbox"
                  name="checkIntensity"
                  checked={this.state.checkboxIsChecked}
                  onClick={this.toggleIntensity}/>
                <label>
                  Weight answers by intensity
                </label>
              </div>
              <div>
                <div className="mt4">
                  <label className="fw3 lh-copy f4 dark-gray db">

                    <Select
                      className="mv2 bg-transparent db f5 w-50"
                      name="oneWord"
                      value={this.state.dateSelected}
                      options={this.state.dateOptions}
                      onChange={this.handleDateChange}
                      // placeholder="Select a date"
                    />
                  </label>
                </div>
              </div>
            </div>
          : <div>No data is available yet.</div>
        }
      </div>
    )
  }
}

export default OneWord
