import {
  SAVE_QUOTE,
  saveQuote,
  addQuote,
  default as quoteReducer
} from '../../../src/redux/modules/quote'

describe('(Redux Module) Quote', () => {
  it('Should export a constant SAVE_QUOTE.', () => {
    expect(SAVE_QUOTE).to.be.equal('quote/SAVE_QUOTE')
  })

  describe('Reducer', () => {
    it('Should be a function.', () => {
      expect(quoteReducer).to.be.a('function')
    })

    it('Should initialize with a state of {entry: {}, product: {}) (Object).', () => {
      expect(quoteReducer(undefined, {})).to.deep.equal({
        entry: {},
        product: {}
      })
    })

    it('Should return the previous state if an action was not matched', () => {
      let state = quoteReducer(undefined, {})
      expect(state).to.deep.equal({
        entry: {},
        product: {}
      })
      state = quoteReducer(state, {type: '@@@@@@@'})
      expect(state).to.deep.equal({
        entry: {},
        product: {}
      })
      state = quoteReducer(state, saveQuote({
        entry: {
          price: 5
        },
        product: {
          name: 'BMW'
        }
      }))
      expect(state).to.eql({
        entry: {
          price: 5
        },
        product: {
          name: 'BMW'
        }
      })
      state = quoteReducer(state, {type: '@@@@@@@'})
      expect(state).to.eql({
        entry: {
          price: 5
        },
        product: {
          name: 'BMW'
        }
      })
    })
  })

  describe('(Action Creator) saveQuote', () => {
    it('Should be exported as a function.', () => {
      expect(saveQuote).to.be.a('function')
    })

    it('Should return an action with type "quote/SAVE_QUOTE"', () => {
      expect(saveQuote()).to.have.property('type', 'quote/SAVE_QUOTE').that.is.a('string')
    })

    it('Should default the "payload" property to {entry:{}, product: {}}', () => {
      expect(saveQuote(undefined)).to.have.property('payload')
        .that.is.an('object').that.is.eql({
        entry: {},
        product: {}
      })
    })
  })

  describe('(Action Creator) addQuote', () => {
    let _globalState
    let _dispatchSpy
    let _getStateSpy

    beforeEach(() => {
      _globalState = {
        quote: quoteReducer(undefined, {})
      }

      _dispatchSpy = sinon.spy(action => {
        _globalState = {
          ..._globalState,
          quote: quoteReducer(_globalState.quote, action)
        }
      })

      _getStateSpy = sinon.spy(() => _globalState)
    })

    it('Should be exported as a function.', () => {
      expect(addQuote).to.be.a('function')
    })

    it('Should return a function (is a thunk).', () => {
      expect(addQuote()).to.be.a('function')
    })

    it('Should return a promise from that thunk that gets fulfilled.', () => {
      return addQuote()(_dispatchSpy).should.eventually.be.fulfilled
    })

    it('Should call dispatch and getState exactly 2 and 1 time', () => {
      return addQuote()(_dispatchSpy)
        .then(() => {
          _dispatchSpy.should.have.been.calledTwice
        })
    })

    it('Should produce a state that is different from the previous state.', () => {
      _globalState = {
        entry: {
          price: 25
        },
        product: {
          name: 'BMW'
        }
      }

      return addQuote({
        entry: {
          price: 50
        },
        product: {
          name: 'Porsche'
        }
      })(_dispatchSpy)
        .then(() => {
          _dispatchSpy.should.have.been.calledTwice
          expect(_globalState).to.have.property('quote')
            .that.is.an('object')
            .that.is.eql({
            entry: {
              price: 50
            },
            product: {
              name: 'Porsche'
            }
          })
          return addQuote({
            entry: {
              price: 5
            },
            product: {
              name: 'Audi'
            }
          })(_dispatchSpy)
        })
        .then(() => {
          _dispatchSpy.should.have.been.called
          expect(_globalState).to.have.property('quote')
            .that.is.an('object')
            .that.is.eql({
              entry: {
                price: 5
              },
              product: {
                name: 'Audi'
              }
            })
        })
    })
  })

  describe('(Action Handler) ADD_QUOTE', () => {
    it('Should modify the state by the action payload\'s "data" property.', () => {
      let state = quoteReducer(undefined, {})
      expect(state).to.eql({entry: {}, product: {}})
      state = quoteReducer(state, saveQuote({
        entry: {
          price: 5
        },
        product: {
          name: 'Audi'
        }
      }))
      expect(state).to.eql({
        entry: {
          price: 5
        },
        product: {
          name: 'Audi'
        }
      })
    })
  })
})
