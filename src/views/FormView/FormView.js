import 'whatwg-fetch'
import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import { addQuote } from '../../redux/modules/quote'

import CarccField from '../../components/Fields/CarccField'
import InputField from '../../components/Fields/InputField'
import SelectField from '../../components/Fields/SelectField'
import classes from './FormView.scss'

const validate = values => {
  const errors = {}
  if (!values.lastname) {
    errors.lastname = 'Required'
  } else if (values.lastname.length === 0) {
    errors.lastname = 'This field must be filled'
  }
  if (!values.product) {
    errors.product = 'Required'
  } else if (values.product.length === 0) {
    errors.product = 'You must select a car brand'
  }
  if (!values.carcc) {
    errors.carcc = 'Required'
  } else if (values.carcc.length === 0) {
    errors.carcc = 'This field must be filled'
  }
  return errors
}

type Props = {
  addQuote: Function
}

export class FormView extends React.Component {
  props: Props
  static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    pristine: React.PropTypes.bool.isRequired,
    submitting: React.PropTypes.bool.isRequired,
    addQuote: React.PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)

    this.state = {
      productCollection: [],
      error: null,
      success: null
    }

    this.submit = this.submit.bind(this)
  }

  componentWillMount () {
    const BASE_URL = 'http://localhost:1337/api/'
    fetch(BASE_URL + 'graphql?query={products{id,name,productparam{key,value}}}')
      .then(response =>
        response.json().then(json => ({ json, response }))
      ).then(({ json, response }) => {
        if (!response.ok) {
          return Promise.reject(json)
        }

        return json.data
      }).catch(err => this.setState({error: err, success: null}))
      .then((response) => {
        this.setState({ productCollection: response.products })
      })
  }

  submit (values) {
    const token = localStorage.getItem('id_token') || null
    let config = {}

    if (token) {
      config = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        // body: Object.keys(values).map(key => `${key}=${values[key]}`).join('&'),
        body: `lastname=${values.lastname}&quoteProduct=${values.product}&carcc=${values.carcc}`
      }
    } else {
      throw new SubmissionError('No token saved!')
    }

    return fetch('http://localhost:1337/api/quote', config)
      .then(response =>
        response.json().then(json => ({ json, response }))
      ).then(({ json, response }) => {
        if (!response.ok) {
          return Promise.reject(json)
        }

        return json
      }).catch(err => {
        this.setState({error: err, success: null})
        throw new SubmissionError(err)
      })
      .then(json => {
        if (json.error) {
          this.setState({success: null})
          throw new SubmissionError(json.error)
        }
        this.setState({error: null, success: json.data.entry})
        this.props.addQuote(json.data)
      })
  }

  render () {
    const { handleSubmit, pristine, submitting } = this.props
    const { productCollection, error, success } = this.state

    return (
      <div className='container text-center'>
        <h2>
          Get Quote:
        </h2>
        <div className={classes['form_container']}>
          <form onSubmit={handleSubmit(this.submit)}>
            <Field name='lastname' component={InputField} type='text' placeholder='Familly name' />
            <Field name='product' component={SelectField} placeholder='Car Brand'>
              <option>Select a Car Brand</option>
              {productCollection.map((item, index) =>
                (<option key={index} value={item.id}>{item.name}</option>)
              )}
            </Field>
            <Field name='carcc' component={CarccField} placeholder='Power of the car in CC' />
            <button type='submit' disabled={pristine || submitting} className='btn btn-default'>Get Price</button>
          </form>
          {error && <div className='alert alert-danger'>{error.message}</div>}
          {success && <div className='alert alert-success'>Price: {success.price}</div>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps, {
  addQuote: (value) => addQuote(value)
})(reduxForm({
  form: 'getQuote',
  validate
})(FormView))
