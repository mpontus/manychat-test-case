import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addComment} from '../actions';
import CommentForm from '../components/CommentForm';

class RootCommentForm extends Component {

  static propTypes = {
    maxTextLength: React.PropTypes.number,
    currentUser: React.PropTypes.object.isRequired,
    replyingTo: React.PropTypes.any,
    addComment: React.PropTypes.func.isRequired,
  }

  handleSubmit(text) {
    this.props.addComment({
      author: this.props.currentUser,
      text,
    });
  }

  render() {
    const {replyingTo, maxTextLength} = this.props;
    if (replyingTo !== null) {
      return null;
    }
    return (
      <CommentForm
        onSubmit={(text) => this.handleSubmit(text)}
      />
    );
  }
};

export default connect(
  ({currentUser, replyingTo}) => ({currentUser, replyingTo}),
  {addComment: addComment},
)(RootCommentForm);
