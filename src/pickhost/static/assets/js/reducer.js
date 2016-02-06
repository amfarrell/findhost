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

function updateName(members, index, name) {
  return members.updateIn([index, 'name'], (name) => name)
}

function updateAddress(members, index, address) {
  return members.updateIn([index, 'address'], (name) =>  address)
}

function submit(members) {
  return members
}

export default function(state = Map(), action) {
  state = fromJS(state)
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, fromJS(action.state));
  case 'CHANGE_NAME':
    return state.update('members', (members) => updateName(members, action.index, action.name))
  case 'CHANGE_ADDRESS':
    return state.update('members', (members) => updateAddress(members, action.index, action.address))
  case 'SUBMIT':
    return state.update('members', submit)
  case 'ADD_MEMBER':
    return state.update('members', addMember);
  case 'REMOVE_MEMBER':
    return state.update('members', (members) => removeMember(members, action.index))
  }
  return state;
}

/*
  case 'CHANGE_NAME':
    return state.updateIn(['members', action.index], (member) => updateName(member, action.name))
  case 'CHANGE_ADDRESS':
    return state.updateIn(['members', action.index], (member) => updateAddress(member, action.address))
*/
