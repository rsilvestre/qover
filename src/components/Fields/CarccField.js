import React from 'react'

const isSupportedType = (type) => {
  return type !== 'checkbox' && type !== 'file' && type !== 'select-multiple'
}

const normalizeInteger = (value) => {
  if (typeof (value) !== 'string') {
    return ''
  }
  return value.replace(/[^\d]/g, '')
}

export class CarCC extends React.Component {
  static propTypes = {
    value: React.PropTypes.any.isRequired,
    onBlur: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    touched: React.PropTypes.bool.isRequired,
    error: React.PropTypes.string
  }

  normalize = (value, originalBlur, originalChange) => {
    return {
      value: value,
      onBlur: (event) => {
        if (isSupportedType(event.target.type)) {
          originalBlur(normalizeInteger(event.target.value))
        } else {
          originalBlur(event)
        }
      },
      onChange: (event) => {
        if (isSupportedType(event.target.type)) {
          originalChange(normalizeInteger(event.target.value))
        } else {
          originalChange(event)
        }
      }
    }
  }

  render () {
    const {
      value,
      onBlur,
      onChange,
      placeholder,
      touched,
      error,
      ...rest
    } = this.props

    const highlightClass = touched && !error ? 'form-group  has-success'
      : touched && error ? 'form-group has-error' : 'form-group'

    return (
      <div className={highlightClass}>
        <label className='control-label'>{placeholder}</label>
        <input className='form-control'
          {...rest}
          {...this.normalize(value, onBlur, onChange)}
          placeholder={placeholder}
        />
        {touched && error && <span className='text-danger'>{error}</span>}
      </div>
    )
  }
}

export default CarCC
