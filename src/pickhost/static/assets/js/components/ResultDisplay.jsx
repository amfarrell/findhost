import {range} from 'underscore';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import MemberForm from './MemberForm';
import ResultDisplay from './ResultDisplay';
import * as actionCreators from '../action_creators';

export default React.createClass({
  mixins: [PureRenderMixin],

  /* props:
    members
  [
    initial_forms
    min_forms
    max_forms
    action
    method
    csrftoken
  ]

  */

  render: function() {
    if (this.props.best.get('waiting')){
      return <div className="alert alert-info">
        <span>Consulting the Citymapper API...</span>
      </div>
    } else if (this.props.best.get('address')){
      return <div className="alert alert-success">
        <span>{this.props.best.get('address')}</span>
      </div>
    } else {
      return <div><span></span></div>
    }
  }
})
