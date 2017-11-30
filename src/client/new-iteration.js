import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/datepicker.css'
import { Formik } from 'formik'
import Yup from 'yup'

class NewIteration extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      prompt: this.props.event.default_prompt || '',
      minWordCount: '0',
      isAnonymous: true,
      description: this.props.event.description || '',

    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDueDateChange = this.handleDueDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

handleInputChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? false : target.value;
  const name = target.name;

  this.setState({
    [name]: value
  });
}

handleDueDateChange(date) {
  this.setState({dueDate: date});
}

handleSubmit(event) {
  event.preventDefault();
  const dueDate = this.state.dueDate.toISOString()

  const newIteration = {
    prompt: this.state.prompt,
    dueDate: dueDate,
    minWordCount: this.state.minWordCount,
    isAnonymous: this.state.isAnonymous
  }
  this.postIteration(newIteration)
}

postIteration(newIteration) {
  return fetch(`/api/events/${this.props.event.id}/iterations`, {
    method: 'post',
    body: JSON.stringify(newIteration),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include'
  }).then((response) => {
    return response.json();
  }).then((j) => {
    this.props.saveIteration(j)
  }).catch((err) => {
    console.log(err);
  })
}


  render(){
    const { event, closeModal } = this.props

    return(
      <div className="mh4">

        <div className="tc">
          <h1 className="accent-orange f1-m f2 fw4">{ event.title }</h1>
          <h2 className="accent-orange f2-m f3 fw4">New Reflection</h2>
        </div>

        <div className="pa4">
          {/* <form onSubmit={ this.handleSubmit }> */}

              {/* <div className="mt4">
                <div className="fw3 lh-copy f4 dark-gray db">
                  Series description
                </div>
                  <p className="f5 black-80">{ event.description }</p>
              </div> */}
              {/* <div className="mt4">
                <label className="fw3 lh-copy f4 dark-gray db">
                  Reflection prompt
                  <textarea
                    className="mv2 bg-transparent w-100 db ba b--black-20 f5"
                    rows="3"
                    type="teaxtarea"
                    name="prompt"
                    value={ this.state.prompt }
                    onChange={ this.handleInputChange }/>

                </label>
              </div> */}
              <div className="mt4 w-100">
                <label className="fw3 lh-copy f4 dark-gray db w-100">
                  Due date
                  <DatePicker
                    name="dueDate"
                    selected={ this.state.dueDate }
                    onChange={ this.handleDueDateChange }
                    showTimeSelect
                    dateFormat="LLL"
                    className="f5 w-100 datepicker-input"
                    showTimeSelect
                    timeFormat="h:mm a"
                  />

                </label>
              </div>
              <div className="mt4">
                <label className="fw3 lh-copy f4 dark-gray db">
                  Minimum word count <span className="f6 black-60">(optional)</span>
                  <input
                    className="mv2 bg-transparent db ba b--black-20 f5 pa1"
                    type="number"
                    step="50" min="0" max="500"
                    name="minWordCount"
                    value={ this.state.minWordCount }
                    onChange={ this.handleInputChange }
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
                  name="isAnonymous"
                  value="false"
                  id="isAnonymousF"
                  onChange={ this.handleInputChange }
                />
                <label htmlFor="isAnonymousT" className="pl2 pr4">See individual data</label>
              </div>
              <div className="tc mt4">
                <button className="f6 no-underline grow dib v-mid white ba ph3 pv2 mb3 action-button br1 link grow pointer" type="submit" value="Submit">Submit</button>
              </div>


          {/* </form> */}
        </div>

        <Formik
          initialValues={{
            prompt: event.default_prompt || '',
            dueDate: '',
            minWordCount: 0,
            isAnonymous: true
          }}


          validationSchema={Yup.object().shape({
            prompt: Yup.string()
              .required('Please enter a prompt.'),
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
                setSubmitting(false)
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

          render = {({ values, errors, touched, handleChange, handleSubmit, handleBlur, handleReset, isSubmitting, setErrors }) =>
            <form onSubmit={handleSubmit}>
              <div className="mt4">
                <div className="fw3 lh-copy f4 dark-gray db">
                  Series description
                </div>
                  <p className="f5 black-80">{ event.description }</p>
              </div>

              <div className="mt4">
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
              <div className="mt4">
                <label className="fw3 lh-copy f4 dark-gray db">
                  Due date
                  <DatePicker
                    name="dueDate"
                    selected={ this.state.dueDate }
                    onChange={ this.handleDueDateChange }
                    showTimeSelect
                    dateFormat="LLL"
                    className="f5 w-100"
                  />

                </label>
              </div>



              <div className="mt3 w-100">
                <label className="fw3 lh-copy f4 dark-gray db">
                  Description
                  <textarea
                    rows="6"
                    type="textarea"
                    name="description"
                    className={errors.description && touched.description ? "mv2 bg-transparent w-100 db input-reset ba f5 error" : "mv2 bg-transparent w-100 db input-reset ba b--black-20 f5"}
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
                    className={errors.defaultPrompt && touched.defaultPrompt ? "mv2 bg-transparent w-100 db input-reset ba f5 error": "mv2 bg-transparent w-100 db input-reset ba b--black-20 f5"}
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
                    className={errors.participants && touched.participants ? "mv2 bg-transparent w-100 db input-reset ba f5 error" : "mv2 bg-transparent w-100 db input-reset ba b--black-20 f5"}
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
                  value="Submit"
                >
                  Submit
                </button>
                <button
                  className="f6 no-underline grow dib v-mid white ba ph3 pv2 mb3 action-button br1 link grow pointer"
                  type="button"
                  value="cancel"
                  disabled={isSubmitting}
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>

            </form>
          }
        />

      </div>
    )
  }
}

export default NewIteration
