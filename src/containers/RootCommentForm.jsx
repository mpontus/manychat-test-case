import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createComment} from '../actions';
import CommentForm from '../components/CommentForm';

class RootCommentForm extends Component {

  static propTypes = {
    maxTextLength: React.PropTypes.number,
    currentUser: React.PropTypes.object.isRequired,
    replyingTo: React.PropTypes.any,
    createComment: React.PropTypes.func.isRequired,
  }

  handleSubmit(text) {
    this.props.createComment({
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
  {createComment: createComment},
)(RootCommentForm);
