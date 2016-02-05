import {expect} from 'chai';
import {List} from 'immutable';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import AddressFormSet from '../../assets/js/components/AddressFormSet';
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
    )
  }
})

describe('Member Formset', () => {
  it('renders a specified number of MemberForms', () => {
    const num_memberforms = 4
    const component = renderIntoDocument(
      <AddressFormSet total_forms={num_memberforms} initial_forms={0} max_forms={7} action='/'
         method='post' csrftoken={window.csrftoken}/>
    )
    const memberforms = scryRenderedComponentsWithType(component, MemberForm)
    expect(memberforms.length).to.equal(num_memberforms)
  })
})

describe('Member Form', () => {
  it('has the correct names for inputs', () => {
    const i = 3;
    const component = renderIntoDocument(
      <TableWrapper>
        <MemberForm membernumber={i} key={'form-member-'+i} />
      </TableWrapper>
    )
    const inputs = scryRenderedDOMComponentsWithTag(component, 'input')
    const names = inputs.map((input) => input.name)
    expect(names).to.include("member_set-"+i+"-name")
    expect(names).to.include("member_set-"+i+"-id")
    expect(names).to.include("member_set-"+i+"-party")
  })

  it('has the correct name for textareas', () => {
    const i = 3;
    const component = renderIntoDocument(
      <TableWrapper>
        <MemberForm membernumber={i} key={'form-member-'+i} />
      </TableWrapper>
    )
    const textarea = findRenderedDOMComponentWithTag(component, 'textarea')
    expect(textarea.name).to.equal("member_set-"+i+"-address")
  })
})


/*
describe('Voting', () => {
  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Trainspotting');
    expect(buttons[1].textContent).to.equal('28 Days Later');
  });
  it('invokes callback when a button is clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;

    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]}
              vote={vote}/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(votedWith).to.equal('Trainspotting');
  });
  it('disables buttons when user has voted', () => {
    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]}
              hasVoted="Trainspotting" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);
  });

  it('does update DOM when prop changes', () => {
    const pair = List.of('Trainspotting', '28 Days Later');
    const component = renderIntoDocument(
      <Voting pair={pair} />
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Trainspotting');

    const newPair = pair.set(0, 'Sunshine');
    component.setProps({pair: newPair});
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Sunshine');
  });


  it('renders as a pure component', () => {
    const pair = ['Trainspotting', '28 Days Later'];
    const component = renderIntoDocument(
      <Voting pair={pair} />
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Trainspotting');

    pair[0] = 'Sunshine';
    component.setProps({pair: pair});
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Trainspotting');
  });
})

*/
