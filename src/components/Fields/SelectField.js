import React from 'react'

export const SelectField = ({ children, placeholder, touched, error, ...rest }) => {
  const highlightClass = touched && !error ? 'form-group  has-success'
    : touched && error ? 'form-group has-error' : 'form-group'
  
  return (
    <div className={highlightClass}>
      <label className='control-label'>{placeholder}</label>
      <select className='form-control' {...rest}>
        {children}
      </select>
      {touched && error && <span className='text-danger'>{error}</span>}
    </div>
  )
}

SelectField.propTypes = {
  children: React.PropTypes.array.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  touched: React.PropTypes.bool.isRequired,
  error: React.PropTypes.string
}

export default SelectField
