import {Map, List, fromJS} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}
function addMember(members = List()){
  const newmembers = members.push(Map({
    name: '',
    address: '',
    latlng: undefined,
    latlng_dirty: true,
    party: '',
    id: '',
  }))
  return newmembers
}

function removeMember(members = List(), index){
  if (0 === members.size){
    return members
  } else {
    return members.remove(index)
  }
}


export default function(state = Map(), action) {
  state = fromJS(state)
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, fromJS(action.state));
  case 'ADD_MEMBER':
    return state.update('members', addMember);
  case 'REMOVE_MEMBER':
    return state.update('members', (members) => removeMember(members, action.index))
  }
  return state;
}
