import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/datepicker.css'

class DueDatePicker extends React.Component {
  constructor(props){
    super(props)

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(value) {
    // this is going to call setFieldValue and manually update values.pronouns
    this.props.onChange('dueDate', value);
  };

  handleBlur() {
    // this is going to call setFieldTouched and manually update touched.pronouns
    this.props.onBlur('dueDate', true);
  };

  render() {
    const { errors, touched, options, value, addClasses } = this.props
    return (
      <div>
        <DatePicker
          name="dueDate"
          selected={ value || moment()}
          onChange={ this.handleChange }
          showTimeSelect
          dateFormat="LLL"
          className={addClasses}
          showTimeSelect
          onBlur={this.handleBlur}
          timeFormat="h:mm a"
        />
      </div>
    )
  }
}

export default DueDatePicker
