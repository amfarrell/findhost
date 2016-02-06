console.log('I am alive!');

import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux'
import ReactDOM from 'react-dom';
import {AddressFormSetContainer} from './components/AddressFormSet.jsx';
import {setState} from './action_creators'
import reducer from './reducer'
import Router, {Route} from 'react-router';
import App from './app'

if ('undefined' == typeof(window.csrftoken)){
  throw "Must declare csrftoken as an attribute of window"
}

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

const routes = <Route component={App}>
  <Route path="/" component={AddressFormSetContainer} />
</Route>

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

/* props:
  total_forms
  initial_forms
  min_forms
  max_forms
  action
  method
  csrftoken

  <Voting pair={pair} winner="Trainspotting"/>,
*/
