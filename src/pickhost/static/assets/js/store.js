import reducer from './reducer'
import {createStore} from 'redux'
import {setState} from './action_creators'

const store = createStore(reducer)
store.dispatch(setState({
  members: [{
    name: 'MIT',
    address: '70 Massachusetts Avenue',
    latlng: undefined,
    latlng_dirty: true,
    party: '',
    id: '',
  }, {
    name: '',
    address: '',
    latlng: undefined,
    latlng_dirty: true,
    party: '',
    id: '',
  }, {
    name: '',
    address: '',
    latlng: undefined,
    latlng_dirty: true,
    party: '',
    id: '',
  }]
}))

export default store
