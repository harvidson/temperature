import React from 'react';
import WordCloud from 'react-d3-cloud';


class Wordcloud extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      words: []
    }

    this.getWordData = this.getWordData.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    this.getWordData(nextProps.event.id)
  }

  getWordData(id){
    fetch(`/api/events/${id}/word-cloud`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      // console.log(j);
      this.setState({
        words: j
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  fontSizeMapper(word){
    return Math.log2(word.value) * 10;
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
            font="sans-serif"
          />
        <div>wordcloud graph above</div>





      </div>
    )
  }
}

export default Wordcloud
