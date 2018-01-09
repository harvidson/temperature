import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import {Route, Link} from 'react-router-dom'
import { Formik } from 'formik'
import Yup from 'yup'

import Header from './header'
import SelectMenu from './select-menu'

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
      console.log(j);
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
      const {prompt, event_title, is_anonymous, min_word_count} = this.state.iteration

    return(

      <div>
        <Header></Header>

        <main>
        <div className="tc">
          <h1 className="accent-orange f1-m f2 fw4">{event_title}</h1>
          <h2 className="accent-orange f2-m f3 fw4">New Reflection</h2>
        </div>

        <div className="ph4 pt2">
          <div className="mt4 bg-near-white ba b--light-gray pa4">
          <div className="fw3 lh-copy f4 dark-gray db">
            Prompt</div>
            <p className="pl4 black-80 f5">{prompt}</p>
            {is_anonymous
              ?
              <div className="tc black-80 f5"><i className="fa fa-users" aria-hidden="true"></i> Analysis by group (anonymous)</div>

              :
              <div><i className="fa fa-user-circle-o" aria-hidden="true"></i> Analysis by individual (not anonymous)</div>
            }
        </div>

          <form onSubmit={ this.handleSubmit }>
              {/* <div className="mt4">
                <label className="fw3 lh-copy f4 dark-gray db">
                  In a word, how are you feeling about this question?
                  <Select
                    className="mv2 bg-transparent db f5 w-50"
                    name="oneWord"
                    value={this.state.oneWord}
                    options={options}
                    onChange={this.handleOneWordChange}
                  />
                </label>
              </div> */}
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
                  {min_word_count > 0
                  ?
                  <small className="f6 black-60 db mb2">Minimum {min_word_count} words</small>
                  : null
                }
                </label>
              </div>
              <div className="tc mt4">
                <button className="f6 no-underline grow dib v-mid white ba ph3 pv2 mb3 action-button br1 link grow pointer" type="submit" value="Submit">Submit</button>
              </div>
          </form>


          <Formik
            initialValues={{
              oneWord: '',
              oneWordIntensity: 1,
              title: '',
              content: ''
            }}

            validationSchema={Yup.object().shape({
              oneWord: Yup.string()
                .required('Please select the word that most closely matches your feeling.')
                .nullable(),
              title: Yup.string()
                .required('Please give your response a title.'),
              content: Yup.string()
                .required('Please write a response to the prompt.')

            })}

            onSubmit = {(
              values,
              { setSubmitting, setErrors }
            ) => {

              const newReflection = {
                oneWord: values.oneWord,
                oneWordIntensity: values.oneWordIntensity,
                title: values.title,
                content: values.content
              }
              this.postReflection(newReflection)
              .then(
                newReflection => {
                  setSubmitting(false)
                  console.log(newReflection);
                  // saveReflection(newEvent[0])
                  this.props.history.push('/dashboard');
                },
                errors => {
                  console.log(errors)
                  setSubmitting(false)
                }
              )
              .catch((err) => {
                console.log(err)
              })
            }}

            render = {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              handleBlur,
              handleReset,
              isSubmitting,
              setErrors,
              setFieldValue,
              setFieldTouched
            }) => (
              <form onSubmit={handleSubmit}>

                <div className="mt4">
                  <label className="fw3 lh-copy f4 dark-gray db">
                    <div>In a word, how are you feeling about this question?</div>
                    <SelectMenu
                      name="oneWord"
                      options={options}
                      value={values.oneWord}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      error={errors.oneWord}
                      touched={touched.oneWord}
                      addClasses="mv2 bg-transparent db f5 w-50"
                    />
                  </label>
                  {touched.oneWord && errors.oneWord && <div className="accent-orange pt2">{errors.oneWord}</div>}
                </div>

                {/* <div className="mt4">
                  <label className="fw3 lh-copy f4 dark-gray db">
                    Reflection prompt
                    <textarea
                      rows="3"
                      type="teaxtarea"
                      name="prompt"
                      className={errors.prompt && touched.prompt ? "mv2 bg-transparent w-100 db ba b--black-20 f5 error" : "mv2 bg-transparent w-100 db ba b--black-20 f5"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.prompt}
                    />
                  </label>
                  {touched.prompt && errors.prompt && <div className="accent-orange pt2">{errors.prompt}</div>}
                </div>
                <div className="mt4 w-100">
                  <label className="fw3 lh-copy f4 dark-gray db w-100">
                    Due date
                    <DueDatePicker
                      name="dueDate"
                      value={values.dueDate}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      error={errors.dueDate}
                      touched={touched.dueDate}
                      addClasses="f5 w-100 datepicker-input"
                    />
                    {touched.dueDate && errors.dueDate && <div className="accent-orange f5 pt2">{errors.dueDate}</div>}
                  </label>
                </div>
                <div className="mt4">
                  <label className="fw3 lh-copy f4 dark-gray db">
                    Minimum word count <span className="f6 black-60">(optional)</span>
                    <input
                      type="number"
                      step="50" min="0" max="500"
                      name="minWordCount"
                      className="mv2 bg-transparent db ba b--black-20 f5 pa1"
                      onChange={handleChange}
                      value={values.minWordCount}
                    />
                  </label>
                </div>
                <div className="mt4">
                  <label className="fw3 lh-copy f4 dark-gray db">
                    Access to data
                  </label>
                  <p className="f5 black-80 mb2">By default, participant data is anonymous: you'll see sentiment analysis for the group as a whole but not for individual participants. If you need to know how people are doing individually, check the box below. We'll let participants know that you'll be able to see their individual data but not their written reflections.</p>
                    <input
                      className="mv2 f5"
                      type="checkbox"
                      name="seeIndividual"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.seeIndividual}
                    />
                  <label className="pl2 pr4">See individual data</label>
                </div> */}

                <div className="tc mt3">
                  <button
                    className="f6 no-underline grow dib v-mid white ba ph3 pv2 mb3 action-button br1 link grow pointer mr2"
                    type="submit"
                    disabled={isSubmitting || Object.keys(errors).length > 0 }
                    value="Submit"
                  >
                    Submit
                  </button>
                  {/* <button
                    className="f6 no-underline grow dib v-mid white ba ph3 pv2 mb3 action-button br1 link grow pointer"
                    type="button"
                    value="cancel"
                    disabled={isSubmitting}
                    onClick={closeModal}
                  >
                    Cancel
                  </button> */}
                </div>

              </form>
            )}
          />
          </div>

      </main>
      </div>
    )
  }
}

export default NewReflection
