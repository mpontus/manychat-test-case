import React from 'react';
import CommentItem from './CommentItem';

const CommentList = ({ comments }) => (
  <ul className="comment-list">
    {comments.map(comment => (
       <CommentItem
         key={comment.id}
         comment={comment}
       />
     ))}
  </ul>
);

CommentList.propTypes = {
  comments: React.PropTypes.array.isRequired,
};

export default CommentList;
