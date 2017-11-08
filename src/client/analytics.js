import React from 'react'
import Header from './header'
import *  as d3 from 'd3'
// import scaleChromatic from 'd3-scale-chromatic'
// import d3Scale from 'd3-scale'


class Analytics extends React.Component {
  constructor(){
    super()

    this.state = {
      iterations: []
    }
    this.createDonutChart = this.createDonutChart.bind(this);
  }

  componentWillMount() {
    //get one-word data for donut graph, organized by iteration (anonymous, with intensity)
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

    //load one-word data for this event
    fetch(`/api/events/${this.props.match.params.id}/one-words`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log(j);
      this.setState({iterations: j})
    }).catch((err) => {
      console.log(err);
    })

  }

  componentDidMount(){
    console.log(d3);
    this.createDonutChart()
  }

  componentDidUpdate() {
    this.createDonutChart()

  }

  aggregateOneWords() {

  }

  aggregateOneWordsWithIntensity() {

  }


  createDonutChart() {
    const oneWordData = [
      {
        tone: 'happy',
        score: 15
      },
      {
        tone: 'excited',
        score: 3
      },
      {
        tone: 'apprehensive',
        score: 6
      },
      {
        tone: 'mad',
        score: 1
      }
    ]

    const width = 360;
    const height = 360;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory20c);
    const donutWidth = 75;
    const legendRectSize = 18;
    const legendSpacing = 4;

    const svg = d3.select(this.node)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

    console.log(svg);
    console.log(this.node);

    const arc = d3.arc()
    .innerRadius(radius - donutWidth)
    .outerRadius(radius);

    const pie = d3.pie()
    .value(function(d) { return d.score; })
    .sort(null);

    const path = svg.selectAll('path')
    .data(pie(oneWordData))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d) {
      return color(d.data.tone);
    });

    path.on('mouseover', function(d) {
      let total = d3.sum(oneWordData.map(function(d) {
        return d.score;
      }));
      const percent = Math.round(1000 * d.data.score / total) / 10;
      tooltip.select('.label').html(d.data.tone);
      tooltip.select('.percent').html(percent + '%');
      tooltip.style('display', 'block');
    });

    path.on('mouseout', function() {
      tooltip.style('display', 'none');
    });

    const legend = svg.selectAll('.legend')
      .data(color.domain())
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', function(d, i) {
        var height = legendRectSize + legendSpacing;
        var offset =  height * color.domain().length / 2;
        var horz = -2 * legendRectSize;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
      });

    legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', color)
      .style('stroke', color);

    legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(function(d) {
        return d;
      });

    const tooltip = d3.select(this.node)
     .append('div')
     .attr('class', 'tooltip');

   tooltip.append('div')
     .attr('class', 'label');
   tooltip.append('div')
     .attr('class', 'count');
   tooltip.append('div')
     .attr('class', 'percent');


  }


  render(){
    return(

      <div>
        <Header></Header>
        <main>
        <div>Here're some really insightful graphs and things to click.</div>

         <svg ref={node => this.node = node}
            width={500} height={500}>
          </svg>



      </main>




      </div>
    )
  }
}

export default Analytics
