import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addComment} from '../actions';
import CommentForm from '../components/CommentForm';

class RootCommentForm extends Component {

  static propTypes = {
    maxTextLength: React.PropTypes.number,
    currentUser: React.PropTypes.object.isRequired,
    addComment: React.PropTypes.func.isRequired,
  }

  handleSubmit(text) {
    this.props.addComment(
      this.props.currentUser,
      text,
    );
  }

  render() {
    return (
      <CommentForm
        maxTextLength={this.props.maxTextLength}
        onSubmit={(text) => this.handleSubmit(text)}
      />
    );
  }
};

export default connect(
  ({currentUser}) => ({currentUser}),
  {addComment: addComment},
)(RootCommentForm);
