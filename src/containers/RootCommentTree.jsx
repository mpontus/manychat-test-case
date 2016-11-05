import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentList from '../components/CommentList';
import { getTopLevelComments } from '../reducers';
import {
  createComment,
  deleteComment,
  setReplyingTo,
} from '../actions';

const RootCommentTree = ({ comments }) => (
  <div className="comment-tree">
    <CommentList comments={comments} />
  </div>
);

export default connect(
  state => ({ comments: getTopLevelComments(state) }),
)(RootCommentTree);
