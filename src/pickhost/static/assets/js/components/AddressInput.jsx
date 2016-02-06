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
    const index = this.props.index;
    const addr = this.props.member.get('address');
    return <textarea cols="40" id={"id_member_set-"+index+"-address"} name={"member_set-"+index+"-address"} rows="2" value={addr}></textarea>
  }
})
