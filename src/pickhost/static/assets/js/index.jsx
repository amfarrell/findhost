console.log('I am alive!');

import React from 'react';
import ReactDOM from 'react-dom';
import AddressFormSet from './components/AddressFormSet.jsx';

if ('undefined' == typeof(window.csrftoken)){
  throw "Must declare csrftoken as an attribute of window"
}

ReactDOM.render(
  <AddressFormSet total_forms={4} initial_forms={0} max_forms={7} action='/' method='post' csrftoken={window.csrftoken}/>,
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
