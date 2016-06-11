import React from 'react'
import { connect } from 'react-redux'
import { IndexLink } from 'react-router'
import activeComponent from 'react-router-active-component'
import Login from '../../components/Login/Login'
import Logout from '../../components/Logout/Logout'
import { loginUser, logoutUser } from '../../redux/modules/authenticate'

export class NavBar extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    isAuthenticated: React.PropTypes.bool.isRequired,
    errorMessage: React.PropTypes.string,
    loginUser: React.PropTypes.func.isRequired,
    logoutUser: React.PropTypes.func.isRequired,
    userInfo: React.PropTypes.object
  }

  render () {
    const { isAuthenticated, errorMessage, loginUser, logoutUser, userInfo } = this.props
    const NavLink = activeComponent('li')

    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <IndexLink className='navbar-brand' to='/'>Qover</IndexLink>
          <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
            {isAuthenticated &&
              <ul className='nav navbar-nav'>
                <NavLink to='/form'>Form</NavLink>
              </ul>}
            <div className='navbar-form navbar-right' role='login'>
              {!isAuthenticated &&
                <Login errorMessage={errorMessage} onLoginClick={loginUser} />
              }

              {isAuthenticated &&
                <Logout userInfo={userInfo} onLogoutClick={logoutUser} />
              }

            </div>
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  state
})

export default connect(mapStateToProps, {
  loginUser: (creds) => loginUser(creds),
  logoutUser: (creds) => logoutUser(creds)
})(NavBar)
