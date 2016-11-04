import React from 'react';
import CommentItem from './CommentItem';

const CommentList = ({
  comments,
  replyingTo,
}) => (
  <ul className="comment-list">
    {comments.map(comment => (
       <CommentItem
         key={comment.id}
         comment={comment}
         replyingTo={replyingTo}
       />
     ))}
  </ul>
);

CommentList.propTypes = {
  comments: React.PropTypes.array.isRequired,
  replyingTo: React.PropTypes.any,
};

export default CommentList;
