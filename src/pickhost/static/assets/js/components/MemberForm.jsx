import {range} from 'underscore';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import AddressInput from './AddressInput'
export default React.createClass({
  mixins: [PureRenderMixin],


  render: function() {
    const num = this.props.membernumber
    console.log("form rerendered" + num)
    return <tr key={"form-member-"+num}>
          <td>
            <input id={"id_member_set-"+num+"-id"} name={"member_set-"+num+"-id"} type="hidden" value={this.props.member.id}/>
            <input id={"id_member_set-"+num+"-party"} name={"member_set-"+num+"-party"} type="hidden" value={this.props.member.party} />
            <input id={"id_member_set-"+num+"-name"} maxLength="128" name={"member_set-"+num+"-name"} type="text" value={this.props.member.name} />
          </td>
          <td>
            <AddressInput membernumber={num} member={this.props.member}/>
          </td>
        </tr>
  }
});
