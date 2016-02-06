export function setState(state){
  return { type: 'SET_STATE', state: state };
}
export function changeName(index, name){
  return {type: 'CHANGE_NAME', name: name, index: index};
}
export function changeAddress(index, address){
  return {type: 'CHANGE_ADDRESS', address: address, index: index};
}
export function submitForm(){
  return {type: 'SUBMIT'};
}

export function geocodeFinished(address, latlng){
  return {type: 'GEOCODE_FINISHED', address: address, latlng: latlng};
}

export function picked(best){
  return {type: 'PICKED', best: best};
}

export function addMember(){
  return {type: 'ADD_MEMBER'};
}

export function removeMember(index){
  return {type: 'REMOVE_MEMBER', index: index};
}
