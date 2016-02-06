import reducer from './reducer'
import {createStore} from 'redux'
import {setState, addMember, changeName, changeAddress} from './action_creators'

const store = createStore(reducer)
store.dispatch(addMember())
store.dispatch(addMember())
store.dispatch(addMember())
store.dispatch(changeName(0, 'MIT'))
store.dispatch(changeAddress(0, '70 Massachusetts Avenue, Cambridge, MA'))
store.dispatch(changeName(1, 'Cambridgeside Gallaria'))
store.dispatch(changeAddress(1, '100 Cambridgeside Pl, Cambridge, MA 02141'))
store.dispatch(changeName(2, 'Redbones BBQ'))
store.dispatch(changeAddress(2, '55 Chester St, Somerville, MA 02144'))

export default store
