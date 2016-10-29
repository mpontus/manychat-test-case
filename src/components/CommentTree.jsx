import React from 'react';
import CommentList from './CommentList';

const CommentTree = ({comments}) => (
  <div className="comment-tree">
    <CommentList comments={comments} />
  </div>
);

export default CommentTree;
