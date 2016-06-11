import React from 'react'

export const InputField = ({ placeholder, touched, error, ...rest }) => {
  const highlightClass = touched && !error ? 'form-group  has-success'
    : touched && error ? 'form-group has-error' : 'form-group'
  
  return (
    <div className={highlightClass}>
      <label className='control-label'>{placeholder}</label>
      <input className='form-control' {...rest} placeholder={placeholder} />
      {touched && error && <span className='text-danger'>{error}</span>}
    </div>
  )
}

InputField.propTypes = {
  placeholder: React.PropTypes.string.isRequired,
  touched: React.PropTypes.bool.isRequired,
  error: React.PropTypes.string
}

export default InputField
