import {Map, List, fromJS} from 'immutable';
import {getGeocode, applyGeocode} from './geocode';
import {picked} from './action_creators'
import xhr from 'xhr'
import store from './store'

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
  return members.updateIn([index, 'name'], (oldname) => name)
}

function updateAddress(members, index, address) {
  getGeocode(address)
  return members.updateIn([index, 'address'], (oldaddress) =>  address)
}

function submit(state) {
  const body = {
    csrftoken: window.csrftoken,
    csrf_token: window.csrftoken,
    csrfmiddlewaretoken: window.csrftoken,
    "member_set-TOTAL_FORMS": state.get('members').size,
    "member_set-INITIAL_FORMS": 0,
    "member_set-MIN_NUM_FORMS": 0,
    "member_set-MAX_NUM_FORMS": 1000
  }
  state.get('members').forEach((member, index) => {
    body["member_set-"+index+"-id"] = member.get('id')
    body["member_set-"+index+"-party"] = member.get('party')
    body["member_set-"+index+"-name"] = member.get('name')
    body["member_set-"+index+"-latlng"] = member.get('latlng')
    body["member_set-"+index+"-address"] = member.get('address')
  })
  xhr({
    body: JSON.stringify(body),
    uri: "/",
    method:  "post",
    headers: {
        "X-CSRFToken": window.csrftoken,
        "Content-Type": "application/json"
    }
  }, (error, response, body) =>{
    const data = JSON.parse(body)
    console.log(body);
    store.dispatch(picked(data.best_destination.address))
  })
  return state
}

export default function(state = Map(), action) {
  state = fromJS(state)
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, fromJS(action.state));
  case 'CHANGE_NAME':
    return state.update('members', (members) => updateName(members, action.index, action.name));
  case 'CHANGE_ADDRESS':
    return state.update('members', (members) => updateAddress(members, action.index, action.address));
  case 'SUBMIT':
    return submit(state);
  case 'GEOCODE_FINISHED':
    return state.update('members', (members) => applyGeocode(members, action.address, action.latlng));
  case 'PICKED':
    return state.update('best', (oldBest) => action.best);
  case 'ADD_MEMBER':
    return state.update('members', addMember);
  case 'REMOVE_MEMBER':
    return state.update('members', (members) => removeMember(members, action.index));
  }
  return state;
}

/*
  case 'CHANGE_NAME':
    return state.updateIn(['members', action.index], (member) => updateName(member, action.name))
  case 'CHANGE_ADDRESS':
    return state.updateIn(['members', action.index], (member) => updateAddress(member, action.address))
*/
