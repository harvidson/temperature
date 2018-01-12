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
    this.cancelReflection = this.cancelReflection.bind(this);
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
        //for validation: converts minimum word count to characters (rounded to nearest 50)
        minLength: Math.round(j.min_word_count * 5 / 50) * 50
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  postReflection(newReflection) {
    return fetch(`/api/iterations/${this.state.iteration.id}/reflections`, {
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

  cancelReflection(){
    this.props.history.push('/dashboard')
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
      const {prompt, event_title, is_anonymous, min_word_count, event_id} = this.state.iteration

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
                .min(this.state.minLength, `Your reflection should be about ${min_word_count} words long.`)
            })}
            onSubmit = {(
              values,
              { setSubmitting, setErrors }
            ) => {
              const newReflection = {
                oneWord: values.oneWord,
                oneWordIntensity: values.oneWordIntensity,
                title: values.title,
                content: values.content,
                event_id: event_id
              }
              this.postReflection(newReflection)
              .then(
                newReflection => {
                  setSubmitting(false)
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
                <div className="mt4">
                  <label className="fw3 lh-copy f4 dark-gray db">
                    How intense is that feeling?
                    <input
                      className="mv2 pa2 bg-transparent db ba b--black-20 f5"
                      type="number"
                      step="1" min="1" max="5"
                      name="oneWordIntensity"
                      value={values.oneWordIntensity}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <small className="f6 black-60 db mb2">1 barely there&nbsp;&nbsp;&nbsp;&nbsp;2 slight&nbsp;&nbsp;&nbsp;&nbsp;3 substantial&nbsp;&nbsp;&nbsp;&nbsp;4 pretty strong&nbsp;&nbsp;&nbsp;&nbsp;5 intense</small>
                  </label>
                </div>
                <div className="mt4">
                  <label className="fw3 lh-copy f4 dark-gray db">
                    Title
                    <input
                      className={errors.title && touched.title ? "mv2 bg-transparent w-100 db ba b--black-20 f5 measure error" : "mv2 bg-transparent w-100 db ba b--black-20 f5 measure"}
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  {touched.title && errors.title && <div className="accent-orange pt2 f5 fw4">{errors.title}</div>}
                  </label>
                </div>
                <div className="mt4">
                  <label className="fw3 lh-copy f4 dark-gray db">
                    Reflection
                    <textarea
                      className={errors.content && touched.content ? "mv2 bg-transparent w-100 db ba b--black-20 f5 error" : "mv2 bg-transparent w-100 db ba b--black-20 f5"}
                      rows="20"
                      type="teaxtarea"
                      name="content"
                      value={values.content}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {min_word_count > 0
                    ?
                    <small className="f6 black-60 db mb2">Minimum {min_word_count} words</small>
                    : null
                  }
                  </label>
                  {touched.content && errors.content && <div className="accent-orange pt2 f5 fw4">{errors.content}</div>}
                </div>
                <div className="tc mt4">
                  <button
                    className="f6 no-underline grow dib v-mid white ba ph3 pv2 mb3 action-button br1 link grow pointer mr2"
                    type="submit"
                    disabled={isSubmitting || Object.keys(errors).length > 0 }
                    value="Submit"
                  >
                    Submit
                  </button>
                  <button
                    className="f6 no-underline grow dib v-mid white ba ph3 pv2 mb3 action-button br1 link grow pointer"
                    type="button"
                    value="cancel"
                    disabled={isSubmitting}
                    onClick={this.cancelReflection}
                  >
                    Cancel
                  </button>
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
