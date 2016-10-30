import React from 'react';
import CommentReplyButton from '../containers/CommentReplyButton';
import CommentDeleteButton from '../containers/CommentDeleteButton';

const CommentActions = ({comment}) => (
  <ul className="comment-actions">
    <li>
      <CommentReplyButton comment={comment} />
    </li>
    <li>
      <CommentDeleteButton comment={comment} />
    </li>
  </ul>
);

export default CommentActions;
