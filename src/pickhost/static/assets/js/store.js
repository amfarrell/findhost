import reducer from './reducer'
import {createStore} from 'redux'
import {setState} from './action_creators'

const store = createStore(reducer)
store.dispatch(setState({
  best: undefined,
  members: [{
    name: 'MIT',
    address: '70 Massachusetts Avenue, Cambridge, MA',
    latlng: undefined,
    latlng_dirty: true,
    party: '',
    id: '',
  }, {
    name: 'Cambridgeside Gallaria',
    address: '100 Cambridgeside Pl, Cambridge, MA 02141',
    latlng: undefined,
    latlng_dirty: true,
    party: '',
    id: '',
  }, {
    name: 'Redbones BBQ',
    address: '55 Chester St, Somerville, MA 02144',
    latlng: undefined,
    latlng_dirty: true,
    party: '',
    id: '',
  }]
}))

export default store
