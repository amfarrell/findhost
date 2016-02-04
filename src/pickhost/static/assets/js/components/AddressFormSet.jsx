import {range} from 'underscore';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';


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
        {range(this.props.total_forms).map(formnumber =>
        <tbody key={"form-member-"+formnumber}>
          <tr><th><label htmlFor={"id_member_set-"+formnumber+"-name"}>Name:</label></th>
            <td><input id={"id_member_set-"+formnumber+"-name"} maxLength="128" name={"member_set-"+formnumber+"-name"} type="text" /></td></tr>
          <tr><th><label htmlFor={"id_member_set-"+formnumber+"-address"}>Address:</label></th><td>
            <textarea cols="40" id={"id_member_set-"+formnumber+"-address"} name={"member_set-"+formnumber+"-address"} rows="2"></textarea>
            <input id={"id_member_set-"+formnumber+"-id"} name={"id_member_set-"+formnumber+"-id"} type="hidden" />
            <input id={"id_member_set-"+formnumber+"-party"} name={"id_member_set-"+formnumber+"-party"} type="hidden" /></td></tr>
        </tbody>
        )}
      </table>
      <button type="submit">submit</button>
    </form>

  }
});
