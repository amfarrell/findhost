import reducer from '../../assets/js/reducer'
import {expect} from 'chai';
import {List, fromJS} from 'immutable';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import {Provider} from 'react-redux';
import {createStore} from 'redux'
import ReactDOM from 'react-dom';
import {AddressFormSetContainer} from '../../assets/js/components/AddressFormSet.jsx';
import {setState} from '../../assets/js/action_creators'
import MemberForm from '../../assets/js/components/MemberForm';

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  findRenderedDOMComponentWithTag,
  scryRenderedDOMComponentsWithClass,
  scryRenderedComponentsWithType,
  Simulate
} = TestUtils;

const TableWrapper = React.createClass({
  render: function() {
    return (
      <table>{this.props.children}</table>
    );
  }
})

describe.only('Member Formset, children, and redux store', () => {
  it('update values for names', () => {
    const members = fromJS([{
        name: '',
        address: '',
        latlng_dirty: true,
        latlng: undefined,
        party: '',
        id: '',
      }, {
        name: '',
        address: '',
        latlng_dirty: true,
        latlng: undefined,
        party: '',
        id: '',
      }
    ])
    const teststore = createStore(reducer)
    teststore.dispatch(setState({members: members}))
    const component = renderIntoDocument(
      <Provider store={teststore}>
        <AddressFormSetContainer />
      </Provider>
    )
    const address = scryRenderedDOMComponentsWithTag(component, 'textarea')[0];
    const address_to_change_to = '70 Massachusetts Ave';
//    address.setProps('value = address_to_change_to
    Simulate.change(address, {target: {value: address_to_change_to}});
    const changed_address = teststore.getState().getIn(['members', 0, 'address']);
    const unchanged_address = teststore.getState().getIn(['members', 1, 'address']);
    expect(changed_address).to.equal(address_to_change_to);
    expect(unchanged_address).to.equal('');

  })
})
