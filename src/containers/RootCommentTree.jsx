import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentList from '../components/CommentList';
import { getCommentTree } from '../reducers';
import {
  createComment,
  deleteComment,
  setReplyingTo,
} from '../actions';

class RootCommentTree extends Component {
  handleCreateComment(comment) {
    const { currentUser, createComment, replyingTo } = this.props;

    createComment({
      author: currentUser,
      ...comment,
    }, replyingTo);
  }

  handleDeleteComment(comment) {
    this.props.deleteComment(comment.id);
  }

  handleSetReplyingTo(id) {
    this.props.setReplyingTo(id);
  }

  canDeleteComment(comment) {
    const { currentUser } = this.props;
    return currentUser !== null &&
           currentUser.username === comment.author.username;
  }

  canReplyToComment(comment) {
    const { currentUser } = this.props;
    return currentUser !== null;
  }

  render() {
    const { comments, replyingTo } = this.props;
    return (
      <div className="comment-tree">
        <CommentList
          comments={comments}
          replyingTo={replyingTo}
          onCreateComment={(c) => this.handleCreateComment(c)}
          onDeleteComment={(c) => this.handleDeleteComment(c)}
          onSetReplyingTo={(id) => this.handleSetReplyingTo(id)}
          canDeleteComment={(c) => this.canDeleteComment(c)}
          canReplyToComment={(c) => this.canReplyToComment(c)}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    currentUser: state.currentUser,
    replyingTo: state.replyingTo,
    comments: getCommentTree(state)
  }),
  {
    createComment,
    deleteComment,
    setReplyingTo,
  },
)(RootCommentTree);
