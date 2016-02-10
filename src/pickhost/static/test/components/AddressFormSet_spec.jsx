import {expect} from 'chai';
import {List, fromJS} from 'immutable';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import {AddressFormSet} from '../../assets/js/components/AddressFormSet';
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

describe('Member Formset and children', () => {
  it('render a specified number of MemberForms', () => {
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
      }, {
        name: '',
        address: '',
        latlng_dirty: true,
        latlng: undefined,
        party: '',
        id: '',
      }
    ])
    const component = renderIntoDocument(
      <AddressFormSet members={members} initial_forms={0} max_forms={7} action='/'
         method='post' csrftoken={window.csrftoken}/>
    )
    const memberforms = scryRenderedComponentsWithType(component, MemberForm)
    expect(memberforms.length).to.equal(members.size)
  })
})

describe('Member Form', () => {
  it('have the correct names for inputs', () => {
    const index = 3;
    const member = fromJS({
        name: '',
        address: '',
        latlng_dirty: true,
        latlng: undefined,
        party: '',
        id: '',
    });
    const component = renderIntoDocument(
      <TableWrapper>
        <MemberForm index={index} key={'form-member-'+index} member={member}/>
      </TableWrapper>
    );
    const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
    const names = inputs.map((input) => input.name);
    expect(names).to.include("member_set-"+index+"-name");
    expect(names).to.include("member_set-"+index+"-id");
    expect(names).to.include("member_set-"+index+"-party");
  });

  it('have the correct name for textareas', () => {
    const index = 3;
    const member = fromJS({
        name: '',
        address: '',
        latlng_dirty: true,
        latlng: undefined,
        party: '',
        id: '',
    });
    const component = renderIntoDocument(
      <TableWrapper>
        <MemberForm index={index} key={'form-member-'+index} member={member}/>
      </TableWrapper>
    );
    const textarea = findRenderedDOMComponentWithTag(component, 'textarea');
    expect(textarea.name).to.equal("member_set-"+index+"-address");
  });

  it('display the value contained in the member name and address', () => {
    const index = 3;
    const address = '70 Massachusetts Avenue';
    const name = 'MIT';
    const member = fromJS({
        name: name,
        address: address,
        latlng_dirty: true,
        latlng: undefined,
        party: '',
        id: '',
    });
    const component = renderIntoDocument(
      <TableWrapper>
        <MemberForm index={index} key={'form-member-'+index} member={member}/>
      </TableWrapper>
    );
    const textarea = findRenderedDOMComponentWithTag(component, 'textarea');
    const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
    const input_values = inputs.map((input) => input.value);
    expect(input_values).to.include(name);
    expect(textarea.value).to.equal(address);

  })
})
