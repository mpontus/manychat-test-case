import React from 'react';
import { connect } from 'react-redux';
import CommentList from '../components/CommentList';
import { getCommentTree } from '../reducers';

const RootCommentTree = ({comments}) => (
  <div className="comment-tree">
    <CommentList comments={comments} />
  </div>
);

export default connect(
  state => ({
    comments: getCommentTree(state.comments)
  }),
)(RootCommentTree);
