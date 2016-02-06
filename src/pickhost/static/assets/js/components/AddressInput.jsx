import {range} from 'underscore';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  /*
  An address box with a label.
  When a user enters an address, will ask the google maps geocoding API for the coordinates.
  */
  render: function() {
    const num = this.props.membernumber
    return <textarea cols="40" id={"id_member_set-"+num+"-address"} name={"member_set-"+num+"-address"} rows="2" value={this.props.member.address}></textarea>
  }
})
