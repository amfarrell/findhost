import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';

import {AddressFormSetContainer} from './components/AddressFormSet.jsx';
import {addMember, changeName, changeAddress} from './action_creators'
import MapCanvas from './components/MapCanvas.jsx';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <div style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection:'column'
      }}>
      <div style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection:'column'
        }}>
        <h3 className="title is-3">PickHost</h3>
        <h5 className="subtitble is-5">Whose place is least inconvenient to meet at?</h5>
      </div>
      <div>
        <MapCanvas />
      </div>
      <div>
        <AddressFormSetContainer />
      </div>
    </div>
  </Provider>,
  document.getElementById('app')
);

store.dispatch(addMember());
store.dispatch(addMember());
store.dispatch(addMember());
store.dispatch(changeName(0, 'MIT'))
store.dispatch(changeAddress(0, '70 Massachusetts Avenue, Cambridge, MA'))
store.dispatch(changeName(1, 'Cambridgeside Gallaria'))
store.dispatch(changeAddress(1, '100 Cambridgeside Pl, Cambridge, MA 02141'))
store.dispatch(changeName(2, 'Redbones BBQ'))
store.dispatch(changeAddress(2, '55 Chester St, Somerville, MA 02144'))
/*
*/
