import React from 'react';
import CommentItem from './CommentItem';

const CommentTree = ({comments}) => (
  <ul className="comment-tree">
    {comments.map(comment => (
      <li key={comment.id}>
        <CommentItem comment={comment} />
        {comment.replies &&
         <CommentTree comments={comment.replies} />
        }
      </li>
     ))}
  </ul>
);

export default CommentTree;
