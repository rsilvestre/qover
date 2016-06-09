import React from 'react'
import { connect } from 'react-redux'
import NavBar from 'components/NavBar/NavBar'

export class Application extends React.Component {
  static propTypes = {
    children: React.PropTypes.element,
    dispatch: React.PropTypes.func.isRequired,
    isAuthenticated: React.PropTypes.bool.isRequired,
    errorMessage: React.PropTypes.string,
    userInfo: React.PropTypes.object
  }

  render () {
    const { children, dispatch, isAuthenticated, errorMessage, userInfo } = this.props

    return (
      <div>
        <NavBar
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          dispatch={dispatch}
          userInfo={userInfo}
        />
        {children}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth: { isAuthenticated, errorMessage, userInfo } } = state
  return {
    isAuthenticated,
    errorMessage,
    userInfo
  }
}

export default connect(mapStateToProps)(Application)
