import {range} from 'underscore';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import AddressInput from './AddressInput'
export default React.createClass({
  mixins: [PureRenderMixin],


  render: function() {
    const index = this.props.index
    console.log('\n\nINDEX:\t\t\t'+index)
    return <tr key={"form-member-"+index}>
          <td>
            <input id={"id_member_set-"+index+"-id"}
              name={"member_set-"+index+"-id"} type="hidden" value={this.props.member.get('id')}/>
            <input id={"id_member_set-"+index+"-party"}
              name={"member_set-"+index+"-party"} type="hidden" value={this.props.member.get('party')} />
            <input id={"id_member_set-"+index+"-name"} maxLength="128"
              onChange={(evt) => {
                evt.preventDefault();
                this.props.changeName(index, evt.target.value)
              }}
              name={"member_set-"+index+"-name"} type="text" value={this.props.member.get('name')} />
          </td>
          <td>
            <AddressInput index={index} member={this.props.member} changeAddress={this.props.changeAddress}/>
          </td>
        </tr>
  }
});
