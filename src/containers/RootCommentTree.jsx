import React from 'react';
import {connect} from 'react-redux';
import CommentList from '../components/CommentList';

const RootCommentTree = ({comments}) => (
  <div className="comment-tree">
    <CommentList comments={comments} />
  </div>
);

export default connect(
  ({comments}) => ({comments}),
)(RootCommentTree);
