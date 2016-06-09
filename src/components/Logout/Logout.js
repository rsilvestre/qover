import React from 'react'

export class Logout extends React.Component {
  static propTypes = {
    onLogoutClick: React.PropTypes.func.isRequired,
    userInfo: React.PropTypes.object
  };

  _handleLogout = () => {
    this.props.onLogoutClick()
  };

  render () {
    const { userInfo } = this.props

    return (
      <div className='nav navbar-nav'>
        <span>
          Welcome {userInfo && <strong>{userInfo.username}</strong>}
        </span>
        {' '}
        <button onClick={this._handleLogout} className='btn btn-primary'>
          Logout
        </button>
      </div>
    )
  }

}

export default Logout
