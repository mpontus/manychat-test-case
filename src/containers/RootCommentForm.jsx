import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createComment} from '../actions';
import CommentForm from '../components/CommentForm';

class RootCommentForm extends Component {
  static propTypes = {
    currentUser: React.PropTypes.any,
    createComment: React.PropTypes.func.isRequired,
  }

  handleCreateComment(comment) {
    const { currentUser, createComment } = this.props;

    createComment({
      author: currentUser,
      ...comment,
    });
  }

  render() {
    return (
      <CommentForm
        onSubmit={comment => this.handleCreateComment(comment)}
      />
    );
  }
}

export default connect(
  ({currentUser}) => ({currentUser}),
  {createComment},
)(RootCommentForm);
