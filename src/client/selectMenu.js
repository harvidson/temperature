import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'



class SelectMenu extends React.Component {
  constructor(props){
    super(props)

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }



  handleChange(value) {
    // this is going to call setFieldValue and manually update values.pronouns
    this.props.onChange('pronouns', value);
  };

  handleBlur() {
    // this is going to call setFieldTouched and manually update touched.pronouns
    this.props.onBlur('pronouns', true);
  };

  render() {
    const { errors, touched, options, value } = this.props
    return (
      <div className="dib w-40">
        <Select
          name="pronouns"
          options={options}
          value={value}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          className="dib ml2 v-mid w-100"
          placeholder="Select..."
          // className={ errors.pronouns && touched.pronouns ? "dib w-30 ml2 v-mid error" : "dib w-30 ml2 v-mid" }
        />



      </div>
    )

  }
}

export default SelectMenu
