import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {map} from '../geo';

export const MapCanvas = React.createClass({
  mixins: [PureRenderMixin],

  componentDidMount() {
    /*
    */

    map('map-canvas');
  },
  render: function() {
    return <div>
      <div id="map-canvas" style={{width: '500px', height: '400px'}}></div>
    </div>
  }
});
