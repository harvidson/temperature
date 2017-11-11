import React from 'react'
import * as d3 from 'd3'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class OneWord extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      oneWords: [],
      oneWordsWithIntensity: [],
      dateOptions: [],
      checkboxIsChecked: false,
      noReflections: false,
      dateSelected: '',
      wordsByDate: [],
      d3Data: []

    }
    this.createDonutChart = this.createDonutChart.bind(this);
    this.toggleIntensity = this.toggleIntensity.bind(this);
    this.getOneWordData = this.getOneWordData.bind(this);
    this.getOneWordWriterData = this.getOneWordWriterData.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentWillMount() {}

  componentDidMount() {
    this.createDonutChart()
  }

  componentDidUpdate() {
    this.createDonutChart()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.event.is_lead) {
      this.getOneWordData(nextProps.event.id)
      this.getDates(nextProps.event.id)
    } else {
      this.getOneWordWriterData(nextProps.event.id)
    }
  }

  toggleIntensity(event) {
    this.setState({
      checkboxIsChecked: !this.state.checkboxIsChecked
    });
  }

  getOneWordData(id) {
    fetch(`/api/events/${id}/one-words`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      // console.log(j);
      this.setState({
        oneWords: j.oneWords,
        oneWordsWithIntensity: j.oneWordsWithIntensity,
        d3Data: j.oneWords
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  getDates(id) {
    fetch(`/api/events/${id}/dates`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json()
    }).then((j) => {
      // console.log(j);
      this.setState({
        dateOptions: j
      })
    })
  }

  getOneWordWriterData(id) {
    fetch(`/api/events/${id}/one-words-writer`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      this.setState({
        oneWords: j.oneWords,
        oneWordsWithIntensity: j.oneWordsWithIntensity,
        d3Data: j.oneWords
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  getWordsByDate(iterationId) {
    fetch(`/api/iterations/${iterationId}/one-words`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      // console.log(j);
      this.setState({
        wordsByDate: j.oneWords,
        wordsByDateWithIntensity: j.oneWordsWithIntensity,
        d3Data: j.oneWords
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  handleDateChange(val){
    console.log('Selected: ', val);
    if (val === null) {
      this.setState({
        dateSelected: '',
        d3Data: this.state.oneWords,
        checkboxIsChecked: false
      })
    } else {
      this.setState({
        dateSelected: val,
        checkboxIsChecked: false
      })
      this.getWordsByDate(val.value)
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
    const tooltip = d3.select(this.node).append('div').attr('className', 'tooltip');

    tooltip.append('div').attr('className', 'label');
    tooltip.append('div').attr('className', 'count');
    tooltip.append('div').attr('className', 'percent');
  }

  render() {


    return (

      <div className="w-50 mt3">
        {this.state.oneWords.length > 0
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
