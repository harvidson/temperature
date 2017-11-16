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

  componentDidMount() {
    this.getWordData(this.props.event.id)
  }

  getWordData(id){
    fetch(`/api/events/${id}/word-cloud`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      this.setState({
        words: j
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  fontSizeMapper(word){
    return Math.log2(word.value) * 15;
  }

  rotate(word) {
    return word.value % 360
  }


  render(){

    return(
      <div className="mh3 mt5">
     <div className="f2 fw3 accent-orange mb4">Reflection Keywords</div>
        <WordCloud
            data={this.state.words}
            fontSizeMapper={this.fontSizeMapper}
            rotate={this.rotate}
            font="sans-serif"
            width="400"
            height="300"
          />
      </div>
    )
  }
}

export default Wordcloud
