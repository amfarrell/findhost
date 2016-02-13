import {range} from 'underscore';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import AddressInput from './AddressInput'
export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    const index = this.props.index;
    /*
    Again, we represent the info in the form that
    is not strictly necessary, but represents what
    this component does.
    */
    const addr = this.props.member.get('address');
    return <div className='columns' style={{
                display: 'flex',
                alignItems:'center',
                marginTop: '5px',
                marginBottom: '5px',
            }} >
            <div className='column is-half'>
              <input id={"id_member_set-"+index+"-id"}
                name={"member_set-"+index+"-id"} type="hidden" value={this.props.member.get('id')}/>
              <input id={"id_member_set-"+index+"-party"}
                name={"member_set-"+index+"-party"} type="hidden" value={this.props.member.get('party')} />
              <input id={"id_member_set-"+index+"-name"} maxLength="128"
                className='input'
                onChange={(evt) => {
                  evt.preventDefault();
                  this.props.changeName(index, evt.target.value)
                }}
                name={"member_set-"+index+"-name"} type="text" value={this.props.member.get('name')} />
            </div>
            <div className='column is-half'
                 style={{marginTop: 0}}
              >
              <input id={"id_member_set-"+index+"-address"}
                 className="input"
                 name={"member_set-"+index+"-address"} value={addr}
                 onChange={(evt) => {
                   this.props.changeAddress(index, evt.target.value)
                 }}>
              </input>
            </div>
          </div>
  }
});
