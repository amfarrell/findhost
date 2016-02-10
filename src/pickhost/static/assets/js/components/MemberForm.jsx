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
    return <div className='row' style={{
                display: 'flex',
                alignItems:'center',
                marginTop: '5px',
                marginBottom: '5px',
            }} >
            <div className='col-xs-6'>
              <input id={"id_member_set-"+index+"-id"}
                name={"member_set-"+index+"-id"} type="hidden" value={this.props.member.get('id')}/>
              <input id={"id_member_set-"+index+"-party"}
                name={"member_set-"+index+"-party"} type="hidden" value={this.props.member.get('party')} />
              <input id={"id_member_set-"+index+"-name"} maxLength="128"
                className='form-control'
                onChange={(evt) => {
                  evt.preventDefault();
                  this.props.changeName(index, evt.target.value)
                }}
                name={"member_set-"+index+"-name"} type="text" value={this.props.member.get('name')} />
            </div>
            <div className='col-xs-6'>
              <AddressInput index={index} member={this.props.member} changeAddress={this.props.changeAddress}/>
            </div>
          </div>
  }
});
