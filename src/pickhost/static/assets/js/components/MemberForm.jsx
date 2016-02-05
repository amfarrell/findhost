import {range} from 'underscore';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import AddressInput from './AddressInput'
export default React.createClass({
  mixins: [PureRenderMixin],


  render: function() {
    const num = this.props.membernumber
    return <tr key={"form-member-"+num}>
          <td>
            <input id={"id_member_set-"+num+"-id"} name={"member_set-"+num+"-id"} type="hidden" />
            <input id={"id_member_set-"+num+"-party"} name={"member_set-"+num+"-party"} type="hidden" />
            <input id={"id_member_set-"+num+"-name"} maxLength="128" name={"member_set-"+num+"-name"} type="text" />
          </td>
          <td>
            <AddressInput membernumber={num} />
          </td>
        </tr>
  }
});
