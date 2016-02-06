import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../assets/js/reducer';

describe('fromJS works the way I think it does', () => {
  it('converts deeply-nested structures', () => {
    const unconverted = {
      members: [{
        name: 'MIT',
        address: '70 Massachusetts Avenue',
        latlng_dirty: true,
        latlng: undefined,
        party: '',
        id: '',
      }]
    };

    const partially_converted = Map({
      members: [
        Map({
          name: 'MIT',
          address: '70 Massachusetts Avenue',
          latlng_dirty: true,
          latlng: undefined,
          party: '',
          id: '',
        })
      ]
    })

    const converted = Map({
      members: List([
        Map({
          name: 'MIT',
          address: '70 Massachusetts Avenue',
          latlng_dirty: true,
          latlng: undefined,
          party: '',
          id: '',
        })
      ])
    })

    expect(fromJS(unconverted)).to.equal(converted)
    expect(fromJS(converted)).to.equal(converted)
    expect(fromJS(partially_converted)).to.not.equal(converted)
  })
})

describe('reducer', () => {
  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        members: [{
          name: 'MIT',
          address: '70 Massachusetts Avenue',
          latlng_dirty: true,
          latlng: undefined,
          party: '',
          id: '',
        }]
      }
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      members: [{
        name: 'MIT',
        address: '70 Massachusetts Avenue',
        latlng_dirty: true,
        latlng: undefined,
        party: '',
        id: '',
      }]
    }));
  });

  it('handles NEW_MEMBER', () => {
    const state = fromJS({
        members: [{
          name: 'MIT',
          address: '70 Massachusetts Avenue',
          latlng_dirty: true,
          latlng: undefined,
          party: '',
          id: '',
        }]
    })
    const action = {
      type: 'ADD_MEMBER',
    };
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      members: [{
        name: 'MIT',
        address: '70 Massachusetts Avenue',
        latlng: undefined,
        latlng_dirty: true,
        party: '',
        id: '',
      },{
        name: '',
        address: '',
        latlng: undefined,
        latlng_dirty: true,
        party: '',
        id: '',
      }]
    }));
  });
  it('handles REMOVE_MEMBER', () => {
    const state = fromJS({
      members: [{
        name: 'MIT',
        address: '70 Massachusetts Avenue',
        latlng: undefined,
        latlng_dirty: true,
        party: '',
        id: '',
      },{
        name: '',
        address: '',
        latlng: undefined,
        latlng_dirty: true,
        party: '',
        id: '',
      }]
    });
    const action = {
      type: 'REMOVE_MEMBER',
      index: 0
    }
    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS({
      members: [{
        name: '',
        address: '',
        latlng: undefined,
        latlng_dirty: true,
        party: '',
        id: '',
      }]
    }));
  });
});
