import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';

import {AddressFormSetContainer} from './components/AddressFormSet.jsx';
import MapCanvas from './components/MapCanvas.jsx';
import store from './store'
import Router, {Route} from 'react-router';
import App from './app'

/*
  We don't use jquery for our own logic, but bootstrap depends on jquery.
*/

import bootstrap from 'bootstrap';


ReactDOM.render(
  <Provider store={store}>
    <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection:'column'
      }}>
      <div style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection:'column'
        }}>
        <h3>PickHost</h3>
        <small>Whose place is least inconvenient to meet at?</small>
      </div>
      <div className="row">
        <MapCanvas />
      </div>
      <div className="row">
        <AddressFormSetContainer />
      </div>
    </div>
  </Provider>,
  document.getElementById('app')
);

import {changeName, changeAddress} from './action_creators'
store.dispatch(changeName(0, 'MIT'))
store.dispatch(changeAddress(0, '70 Massachusetts Avenue, Cambridge, MA'))
store.dispatch(changeName(1, 'Cambridgeside Gallaria'))
store.dispatch(changeAddress(1, '100 Cambridgeside Pl, Cambridge, MA 02141'))
store.dispatch(changeName(2, 'Redbones BBQ'))
store.dispatch(changeAddress(2, '55 Chester St, Somerville, MA 02144'))

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
