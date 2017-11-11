import React from 'react';
import WordCloud from 'react-d3-cloud';


class Wordcloud extends React.Component {
  constructor(){
    super()

    this.state = {
      words: [
        {text: 'poohbear', value: 30},
        {text: 'holiday', value: 80},
        {text: 'tigger', value: 25},
        {text: 'piglet', value: 10},
        {text: 'honey', value: 200},
        {text: 'joke', value: 45},
        {text: 'neuron', value: 40}
      ]
    }

  }

  componentWillMount(){
    // this.getWordData()

  }

  fontSizeMapper(word){
    return Math.log2(word.value) * 5;
  }

  rotate(word) {
    return word.value % 360
  }




  render(){



    return(
      <div>


        <WordCloud
            data={this.state.words}
            fontSizeMapper={this.fontSizeMapper}
            rotate={this.rotate}
          />
        <div>wordcloud graph above</div>





      </div>
    )
  }
}

export default Wordcloud
