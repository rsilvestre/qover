import React from 'react'

export class Login extends React.Component {
  static propTypes = {
    onLoginClick: React.PropTypes.func.isRequired,
    errorMessage: React.PropTypes.string
  };

  _handlLogin = () => {
    const username = this.refs.username
    const password = this.refs.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    this.props.onLoginClick(creds)
  };

  render () {
    const { errorMessage } = this.props
    const errorClass = errorMessage ? 'form-group has-error' : 'form-group'
    return (
      <div className={errorClass}>
        <input type='text' ref='username' className='form-control' placeholder='Email' />
        <input type='password' ref='password' className='form-control' placeholder='Password' />
        <button onClick={this._handlLogin} className='btn btn-primary'>
          Login
        </button>
        {errorMessage && <p className='bg-danger'>{errorMessage}</p>}
      </div>
    )
  }
}

export default Login
