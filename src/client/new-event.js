import React from 'react'
import {Route, Link} from 'react-router-dom'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import { Formik } from 'formik'
import Yup from 'yup'

class NewEvent extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      invalidEmails: [],
    }
  }

  checkPartipants(participants) {
    const separators = /\s|\t|\n|\r|,|;/;
    const valid = [];
    const invalid = [];
    const emails = participants.split(separators)

    for (let i = 0; i < emails.length; i++) {
      isEmail(emails[i]) ? valid.push(emails[i]) : invalid.push(emails[i])
    }
    const invalidPruned = invalid.filter(email => !isEmpty(email))
    this.setState({invalidEmails: invalidPruned})

    return valid;
  }

  postEvent(newEvent) {
    return fetch('/api/events', {
      method: 'post',
      body: JSON.stringify(newEvent),
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
    return(
        <div className="mh4">

          <div className="tc">
            <h1 className="accent-orange f1-l f2 fw4">New Journal Event</h1>
          </div>

          <div className="pa4">

            <Formik
              initialValues={{
                title: '',
                description: '',
                defaultPrompt: '',
                participants: '',
              }}

              validationSchema={Yup.object().shape({
                title: Yup.string()
                  .required('Please enter a title.'),
                description: Yup.string()
                  .required('Please enter a few words to describe this journal.'),
                defaultPrompt: Yup.string()
                  .required('Please enter a default prompt (you can change it later).'),
                participants: Yup.string()
                  .required('Please enter email addresses for your participants.')
              })}

              onSubmit = {(
                values,
                { setSubmitting, setErrors }
              ) => {
                const checkedParticipants = this.checkPartipants(values.participants)
                values.participants = checkedParticipants
                this.postEvent(values)
                .then(
                  newEvent => {
                    newEvent.participants.invalidEmails = this.state.invalidEmails
                    this.props.saveEvent(newEvent)
                    // setSubmitting(false)
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
                setErrors
              }) => (
                <form onSubmit={handleSubmit}>

                  <div className="mt3 w-100">
                    <label className="fw3 lh-copy f4 dark-gray db">
                      Title
                      <input
                        type="text"
                        name="title"
                        className={errors.title && touched.title
                          ? "mv2 bg-transparent w-100 db input-reset ba f5 error"
                          : "mv2 bg-transparent w-100 db input-reset ba b--black-20 f5"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                      />
                    </label>
                    {touched.title && errors.title && <div className="accent-orange pt2">{errors.title}</div>}
                  </div>
                  <div className="mt3 w-100">
                    <label className="fw3 lh-copy f4 dark-gray db">
                      Description
                      <textarea
                        rows="6"
                        type="textarea"
                        name="description"
                        className={errors.description && touched.description
                          ? "mv2 bg-transparent w-100 db input-reset ba f5 error"
                          : "mv2 bg-transparent w-100 db input-reset ba b--black-20 f5"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                      />
                    </label>
                    {touched.description && errors.description && <div className="accent-orange pt2">{errors.description}</div>}
                  </div>

                  <div className="mt3 w-100">
                    <label className="fw3 lh-copy f4 dark-gray db">
                      Reflection prompt
                      <textarea
                        rows="3"
                        type="teaxtarea"
                        name="defaultPrompt"
                        className={errors.defaultPrompt && touched.defaultPrompt
                          ? "mv2 bg-transparent w-100 db input-reset ba f5 error"
                          : "mv2 bg-transparent w-100 db input-reset ba b--black-20 f5"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.defaultPrompt}
                      />
                      <small className="f6 black-60 db mb2">This is a default. You can customize it each time you assign a new reflection.</small>
                    </label>
                    {touched.defaultPrompt && errors.defaultPrompt && <div className="accent-orange pt2">{errors.defaultPrompt}</div>}
                  </div>

                  <div className="mt3 w-100">
                    <label className="fw3 lh-copy f4 dark-gray db">
                      Invite participants
                      <textarea
                        type="textarea"
                        rows="2"
                        name="participants"
                        className={errors.participants && touched.participants
                          ? "mv2 bg-transparent w-100 db input-reset ba f5 error"
                          : "mv2 bg-transparent w-100 db input-reset ba b--black-20 f5"}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.participants}
                      />
                      <small className="f6 black-60 db mb2">Add email addresses for your participants. We'll let you know which ones are registered with Temperature.</small>
                    </label>
                    {touched.participants && errors.participants && <div className="accent-orange pt2">{errors.participants}</div>}
                  </div>

                  <div className="tc mt3">
                    <button
                      className="f6 no-underline grow dib v-mid white ba ph3 pv2 mb3 action-button br1 link grow pointer mr2"
                      type="submit"
                      disabled={isSubmitting || Object.keys(errors).length > 0 }
                      value="submit"
                    >
                      Submit
                    </button>
                    <button
                      className="f6 no-underline grow dib v-mid white ba ph3 pv2 mb3 action-button br1 link grow pointer"
                      type="button"
                      value="cancel"
                      disabled={isSubmitting}
                      onClick={this.props.closeModal}
                    >
                      Cancel
                    </button>
                  </div>

                </form>
              )}
            />

        </div>
      </div>
    )
  }
}

export default NewEvent;
