import React from 'react';
import {Provider} from 'react-redux';

import ReactDOM from 'react-dom';
import {AddressFormSetContainer} from './components/AddressFormSet.jsx';


import store from './store'
import Router, {Route} from 'react-router';
import App from './app'

if ('undefined' == typeof(window.csrftoken)){
  throw "Must declare csrftoken as an attribute of window"
}





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
