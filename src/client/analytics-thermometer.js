import React from 'react';
import Thermometer from 'd3-thermometer';


class ThermometerGraph extends React.Component {
  constructor(){
    super()

    // this.state = {
    // }

  }




  render(){
    // var thermometer = new Thermometer({
    // mercuryColor: "rgb(220, 150, 0)"
    // });

    var container = document.getElementById('container');
    // thermometer.render(container, 15, 10, 20);

    return(
      <div>


        <div id="container"></div>
        <div>thermometer graph above</div>





      </div>
    )
  }
}

export default ThermometerGraph
