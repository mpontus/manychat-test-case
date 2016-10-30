import React from 'react';
import CommentReplyButton from '../containers/CommentReplyButton';
// import CommentDeleteButton from '../containers/CommentDeleteButton';
// 
const CommentActions = ({comment}) => (
  <div className="comment-actions">
    <CommentReplyButton comment={comment} />
  </div>
);

export default CommentActions;
