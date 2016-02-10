import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {map, redrawMap} from '../geo';

export default React.createClass({
  mixins: [PureRenderMixin],

  componentDidMount() {
    //Insert the actual google map.
    map('map-canvas');

    /*
    Force the map size to be responsive with the hammer
    of javascript.
    */
    window.onresize = () => {
      this.forceUpdate()
      redrawMap()
    }
  },
  render: function() {
    /*
    The google map requires an explicitly-defined width
    or else it does not appear at all. This means it
    does not respect any of bootstrap's responsive css
    rules. Therefore, calculate the width when rendering
    the react element.

    Note that this does not respond to the user re-sizing
    the window.
    */
    const width = Math.min(window.innerWidth-20, 525);
    const height = Math.min(window.innerHeight - 400, width);
    // Give enough height for the rest of the elements.
    console.log("the height is "+height);
    return <div style={{
      width : ''+width+'px',
      height : ''+height+'px',
      position: 'relative',
    }}>
      <div id="map-canvas" style={{
          position: 'absolute',
          top: 0, right: 0, bottom: 0, left: 0,
          margin: 0, bottom: 0}}>
      </div>
    </div>
  }
});
