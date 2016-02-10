import {range} from 'underscore';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  /*
  An address box, labeled at the top of the table.
  When a user enters an address, will ask the google
  maps geocoding API for the coordinates.
  */
  render: function() {
    const index = this.props.index;
    const addr = this.props.member.get('address');
    return <textarea cols="40" id={"id_member_set-"+index+"-address"}
       className="form-control"
       name={"member_set-"+index+"-address"} rows="2" value={addr}
       onChange={(evt) => {
         this.props.changeAddress(index, evt.target.value)
       }}
       ></textarea>
  }
})
