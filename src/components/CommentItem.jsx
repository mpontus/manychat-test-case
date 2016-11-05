import React from 'react';
import CommentDetails from './CommentDetails';
import ReplyForm from '../containers/ReplyForm';
import CommentList from './CommentList';

const CommentItem = ({ comment }) => (
  <li className="comment-item">
    <CommentDetails comment={comment} />
    <ReplyForm parent={comment} />
    {comment.replies &&
     <CommentList comments={comment.replies} />
    }
  </li>
);

export default CommentItem;
