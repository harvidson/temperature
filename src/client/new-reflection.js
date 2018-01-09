import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import {Route, Link} from 'react-router-dom'

import Header from './header'

class NewReflection extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      title: '',
      content: '',
      oneWord: null,
      oneWordIntensity: 1,
      iteration: {},
      minLength: 0
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOneWordChange = this.handleOneWordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postReflection = this.postReflection.bind(this);


  }

  componentWillMount() {
    window.scrollTo(0, 0)

    //fetch iteration data
    fetch(`/api/iterations/${this.props.match.params.id}`, {
      method: 'get',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      this.setState({
        iteration: j,
        //convert minimum word count to characters (rounded to nearest 50)
        minLength: Math.ceil(j.min_word_count * 6 / 50) * 50
      })
    })
    .catch((err) => {
      console.log(err);
    })

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? 'checked' : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleOneWordChange(val) {
    this.setState({oneWord: val})
  }

  handleSubmit(event) {
    event.preventDefault();

    const newReflection = {
      title: this.state.title,
      oneWord: this.state.oneWord,
      oneWordIntensity: this.state.oneWordIntensity,
      content: this.state.content,
      event_id: this.state.iteration.event_id
    }

    this.postReflection(newReflection)
  }

  postReflection(newReflection) {
    fetch(`/api/iterations/${this.state.iteration.id}/reflections`, {
      method: 'post',
      body: JSON.stringify(newReflection),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      this.props.history.push('/dashboard');
    }).catch((err) => {
      console.log(err);
    })
  }


  render(){
    // TODO: make these dynamic
    const options = [
        { value: 1, label: 'elated' },
        { value: 2, label: 'confident' },
        { value: 3, label: 'inspired'},
        { value: 4, label: 'happy'},
        { value: 5, label: 'excited'},
        { value: 7, label: 'cheerful'},
        { value: 8, label: 'energized'},
        { value: 9, label: 'focused'},
        { value: 10, label: 'neutral'},
        { value: 11, label: 'meh'},
        { value: 12, label: 'confused'},
        { value: 13, label: 'sad'},
        { value: 14, label: 'upset'},
        { value: 15, label: 'annoyed'},
        { value: 16, label: 'frustrated'},
        { value: 17, label: 'disappointed'},
        { value: 18, label: 'angry'},
        { value: 19, label: 'awful'}
      ];
      const iteration = this.state.iteration

    return(

      <div>
        <Header></Header>

        <main>
        <div className="tc">
          <h1 className="accent-orange f1-m f2 fw4">{iteration.event_title}</h1>
          <h2 className="accent-orange f2-m f3 fw4">New Reflection</h2>
        </div>

        <div className="ph4 pt2">
          <form onSubmit={ this.handleSubmit }>

                <div className="mt4 bg-near-white ba b--light-gray pa4">
                <div className="fw3 lh-copy f4 dark-gray db">
                  Prompt</div>
                  <p className="pl4 black-80 f5">{iteration.prompt}</p>
                  {iteration.is_anonymous
                    ?
                    <div className="tc black-80 f5"><i className="fa fa-users" aria-hidden="true"></i> Analysis by group (anonymous)</div>

                    :
                    <div><i className="fa fa-user-circle-o" aria-hidden="true"></i> Analysis by individual (not anonymous)</div>
                  }
              </div>
              <div className="mt4">
                <label className="fw3 lh-copy f4 dark-gray db">
                  What would be your one-word answer to that question?
                  <Select
                    className="mv2 bg-transparent db f5 w-50"
                    name="oneWord"
                    value={this.state.oneWord}
                    options={options}
                    onChange={this.handleOneWordChange}
                  />
                </label>
              </div>
              <div className="mt4">
                <label className="fw3 lh-copy f4 dark-gray db">
                  How intense is that feeling?
                  <input
                    className="mv2 bg-transparent db ba b--black-20 f5"
                    type="number"
                    step="1" min="1" max="5"
                    name="oneWordIntensity"
                    value={ this.state.oneWordIntensity }
                    onChange={ this.handleInputChange }
                  />
                  <small className="f6 black-60 db mb2">1 barely there&nbsp;&nbsp;&nbsp;&nbsp;2 slight&nbsp;&nbsp;&nbsp;&nbsp;3 substantial&nbsp;&nbsp;&nbsp;&nbsp;4 pretty strong&nbsp;&nbsp;&nbsp;&nbsp;5 intense</small>
                </label>
              </div>
              <div className="mt4">
                <label className="fw3 lh-copy f4 dark-gray db">
                  Title
                  <input
                    className="mv2 bg-transparent w-100 db input-reset ba b--black-20 f5 measure"
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={ this.handleInputChange }/>

                </label>
              </div>
              <div className="mt4">
                <label className="fw3 lh-copy f4 dark-gray db">
                  Reflection
                  <textarea
                    className="mv2 bg-transparent w-100 db ba b--black-20 f5"
                    rows="20"
                    type="teaxtarea"
                    name="content"
                    minLength={ this.state.minLength }
                    value={ this.state.content }
                    onChange={ this.handleInputChange }/>
                  {iteration.min_word_count > 0
                  ?
                  <small className="f6 black-60 db mb2">Minimum {iteration.min_word_count} words</small>
                  : null
                }
                </label>
              </div>
              <div className="tc mt4">
                <button className="f6 no-underline grow dib v-mid white ba ph3 pv2 mb3 action-button br1 link grow pointer" type="submit" value="Submit">Submit</button>
              </div>


          </form>
          </div>

      </main>
      </div>
    )
  }
}

export default NewReflection
