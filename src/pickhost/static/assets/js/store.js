import reducer from './reducer';
import {createStore} from 'redux';
import {setState, addMember, changeName, changeAddress} from './action_creators';

const store = createStore(reducer);
store.dispatch(addMember());
store.dispatch(addMember());
store.dispatch(addMember());

export default store;
