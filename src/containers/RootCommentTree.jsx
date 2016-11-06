import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentList from '../components/CommentList';
import NoComments from '../components/NoComments';
import { getTopLevelComments } from '../reducers';
import {
  createComment,
  deleteComment,
  setReplyingTo,
} from '../actions';

const RootCommentTree = ({ comments }) => (
  comments.length ? (
    <div className="comment-tree">
      <CommentList comments={comments} />
    </div>
  ) : (
    <NoComments />
  )
);

export default connect(
  state => ({ comments: getTopLevelComments(state) }),
)(RootCommentTree);
