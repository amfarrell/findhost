export function setState(state){
  return {
    type: 'SET_STATE',
    state: state
  }
}
export function changeName(index, name){
  return {type: 'CHANGE_NAME', name: name, index: index}
}
export function changeAddress(index, address){
  return {type: 'CHANGE_ADDRESS', address: address, index: index}
}
export function submitForm(){
  return {type: 'SUBMIT'}
}
