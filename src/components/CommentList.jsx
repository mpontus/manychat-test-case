import React from 'react';
import CommentItem from './CommentItem';

const CommentList = ({
  comments,
  replyingTo,
  onCreateComment,
  onDeleteComment,
  onSetReplyingTo,
  canDeleteComment,
  canReplyToComment,
}) => (
  <ul className="comment-list">
    {comments.map(comment => (
       <CommentItem
         key={comment.id}
         comment={comment}
         replyingTo={replyingTo}
         onCreateComment={onCreateComment}
         onDeleteComment={onDeleteComment}
         onSetReplyingTo={onSetReplyingTo}
         canDeleteComment={canDeleteComment}
         canReplyToComment={canReplyToComment}
       />
     ))}
  </ul>
);

CommentList.propTypes = {
  comments: React.PropTypes.array.isRequired,
  replyingTo: React.PropTypes.any,
  onCreateComment: React.PropTypes.func.isRequired,
  onDeleteComment: React.PropTypes.func.isRequired,
  onSetReplyingTo: React.PropTypes.func.isRequired,
  canDeleteComment: React.PropTypes.func.isRequired,
  canReplyToComment: React.PropTypes.func.isRequired,
};

export default CommentList;
