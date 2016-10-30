import React from 'react';
import CommentItem from './CommentItem';
import ReplyForm from '../containers/ReplyForm';

const CommentList = ({comments}) => (
  <ul className="comment-list">
    {comments.map(comment => (
      <li key={comment.id}>
        <CommentItem comment={comment} />
        <ReplyForm comment={comment} />
        {comment.replies &&
         <CommentList comments={comment.replies} />
        }
      </li>
     ))}
  </ul>
);

export default CommentList;
