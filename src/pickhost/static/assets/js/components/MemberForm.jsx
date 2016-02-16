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

    let errorVisibility = 'hidden'
    let className=''
    if (this.props.member.get('error')){
      className = 'has-error'
      errorVisibility = 'visible'
    }

    return <div className='row' style={{
                display: 'flex',
                alignItems:'center',
                marginTop: '5px',
                marginBottom: '5px',
            }} >
            <div className={className} >
              <AddressInput index={index} member={this.props.member} changeAddress={this.props.changeAddress}/>
              <div style={{visibility: errorVisibility}} className='text-danger'>
                {this.props.member.get('error') || "no error"}
              </div>
          </div>
        </div>
  }
});
