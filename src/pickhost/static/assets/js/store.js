import reducer from './reducer';
import {createStore} from 'redux';
import {setState, addMember, changeName, changeAddress} from './action_creators';

const store = createStore(reducer);


export default store;
