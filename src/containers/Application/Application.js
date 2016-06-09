import React from 'react'
import { connect } from 'react-redux'
import NavBar from 'components/NavBar/NavBar'

export class Application extends React.Component {
  static propTypes = {
    children: React.PropTypes.element
  }

  render () {
    const { children } = this.props
    return (
      <div>
        <NavBar />
        {children}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
}

export default connect(mapStateToProps)(Application)
