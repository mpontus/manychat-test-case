import React from 'react';
import CommentItem from './CommentItem';

const CommentList = ({comments}) => (
  <ul className="comment-list">
    {comments.map(comment => (
      <li key={comment.id}>
        <CommentItem comment={comment} />
        {comment.replies &&
         <CommentList comments={comment.replies} />
        }
      </li>
     ))}
  </ul>
);

export default CommentList;
