import React from 'react'
import { connect } from 'react-redux'
import {  } from 'react-router'

import classes from './QuoteView.scss'

type Props = {
  quote: Object
}

export class QuoteView extends React.Component {
  props: Props
  static propTypes = {
    quote: React.PropTypes.shape({
      product: React.PropTypes.object,
      entry: React.PropTypes.object,
      history: React.PropTypes.object
    }).isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor (props, context) {
    super(props, context)

    context.router
  }

  componentWillMount () {
    if (this.props.hasOwnProperty('quote') && Object.keys(this.props.quote).length === 0) {
      this.context.router.push('/form')
    }
  }

  render () {
    const { quote: {product, entry} } = this.props
    return (
      <div className='container text-center'>
        <h2>
          Your Quote.
        </h2>
        <div className={classes['quote_container']}>
          {entry && entry.lastname && <p>M. {entry.lastname}</p>}
          {product && product.name && <p>Your quote for {product.name} is :</p>}
          {entry && entry.price && <div className='alert alert-success'>Price: {entry.price}</div>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {quote: state.quote}
}

export default connect(mapStateToProps)(QuoteView)
