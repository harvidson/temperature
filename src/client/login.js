import React from 'react'
import {Route, Link} from 'react-router-dom'
import { Formik } from 'formik'
import Yup from 'yup'

class login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loginInvalid: false
    }

  }

  login(user) {
    return fetch('/api/token', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include'
      })
    .then((response) => {
      if (response.status !== 200) {
        this.setState({
          loginInvalid: true
        })
        throw 'Invalid login'
      }
      return response.json();
    })
  }

  resetForm() {
    this.setState({email: '', password: ''})
  }

  render() {
    return (

      <div className="w-100 modal">

        <div className="tc">
          <h1 className="accent-orange f1-m f2 fw4">Log in</h1>
        </div>

        {this.state.loginInvalid
          ? <div className="accent-orange f5 fw3 tc bg-light-gray pa3 mh2">
            <p>Invalid login. Check your email and password and try again.</p>
          </div>
          : null
        }

        <div className="pa4">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}

            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Invalid email address.')
                .required('Email is required.'),
              password: Yup.string()
                .required('Password is required.')
            })}

            onSubmit = {(
              values,
              { setSubmitting, setErrors }
            ) => {
              this.login(values)
              .then(
                user => {
                  setSubmitting(false);
                  this.props.saveUser(user.email)
                  this.resetForm();
                  this.props.history.push('/dashboard');
                },
                errors => {
                  console.log(errors);
                  setSubmitting(false);
                }
              )
              .catch((err) => {
                console.log(err)
              })
            }}

            render = {({ values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting, setErrors }) =>
              <form onSubmit={handleSubmit}>

                <div className="mt3 w-100">
                  <label className="db fw4 lh-copy f5 ">
                    Email
                    <input
                      type="email"
                      name="email"
                      className={errors.email && touched.email ? "pa2 mh2 bg-transparent ba br2 w-70 error": "pa2 mh2 bg-transparent ba b--black-20 br2 w-70"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </label>
                  {touched.email && errors.email && <div className="accent-orange pt2">{errors.email}</div>}
                </div>

                <div className="mt3 w-100">
                  <label className="db fw4 lh-copy f5 ">
                    Password
                    <input
                      className={errors.password && touched.password ? "pa2 mh2 bg-transparent ba br2 w-60 error" : "pa2 mh2 bg-transparent ba b--black-20 br2 w-60"}
                      type="password"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                    />
                  </label>
                  {touched.password && errors.password && <div className="accent-orange pt2">{errors.password}</div>}
                </div>
                <div className="tc mt3">
                  <button
                    className="f6 no-underline grow dib v-mid white ba ph3 pv2 mb3 action-button br1 link grow pointer" type="submit"
                    disabled={isSubmitting || Object.keys(errors).length > 0 }
                    value="Submit"
                  >
                    Log in
                  </button>
                </div>

              </form>
            }
          />
        </div>

        <div className="tc">
          <p>Need an account? <a className="accent-orange link pointer" onClick={ () => {this.props.openModal('signup')}}>Sign up</a>.</p>
        </div>
      </div>

    )
  }

}

export default login;
