import {range} from 'underscore';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import MemberForm from './MemberForm'

export default React.createClass({
  mixins: [PureRenderMixin],
  /* props:
    total_forms
    initial_forms
    min_forms
    max_forms
    action
    method
    csrftoken

  */

  render: function() {
    return <form action={this.props.action || '/'} method={this.props.method || 'post'}>
      <input type="hidden" name="csrfmiddlewaretoken" value={this.props.csrftoken} />
      <input id="id_member_set-TOTAL_FORMS" name="member_set-TOTAL_FORMS" type="hidden" value={this.props.total_forms} />
      <input id="id_member_set-INITIAL_FORMS" name="member_set-INITIAL_FORMS" type="hidden" value={this.props.initial_forms || 0} />
      <input id="id_member_set-MIN_NUM_FORMS" name="member_set-MIN_NUM_FORMS" type="hidden" value={this.props.min_forms || 0} />
      <input id="id_member_set-MAX_NUM_FORMS" name="member_set-MAX_NUM_FORMS" type="hidden" value={this.props.max_forms || 1000} />
      <table>
        <tbody>
          <tr>
            <th>Name</th><th>Address</th>
          </tr>
        {range(this.props.total_forms).map(i =>
          <MemberForm membernumber={i} key={'form-member-'+i} />
        )}
        </tbody>
      </table>
      <button type="submit">submit</button>
    </form>

  }
});
