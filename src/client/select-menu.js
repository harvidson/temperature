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
    // this is going to call setFieldValue and manually update values.{name}
    this.props.onChange(this.props.name, value);
  };

  handleBlur() {
    // this is going to call setFieldTouched and manually update touched.{name}
    this.props.onBlur(this.props.name, true);
  };

  render() {
    const { errors, touched, options, value, addClasses, name } = this.props
    return (
      <div className="dib w-40">
        <Select
          name={name}
          options={options}
          value={value}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          className={addClasses}
          placeholder="Select..."
        />
      </div>
    )
  }
}

export default SelectMenu
