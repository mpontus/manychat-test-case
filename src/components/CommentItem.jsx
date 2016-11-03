import React from 'react';
import AuthorAvatar from './AuthorAvatar';
import AuthorName from './AuthorName';
import CommentTimestamp from './CommentTimestamp';
import CommentText from './CommentText';
import CommentAction from './CommentAction';
import CommentList from './CommentList';
import ReplyForm from './ReplyForm';

const CommentItem = ({
  comment,
  replyingTo,
  onCreateComment,
  onDeleteComment,
  onSetReplyingTo,
  canDeleteComment,
  canReplyToComment,
}) => (
  <li>
    <div className="comment-item">
      <aside>
        <AuthorAvatar url={comment.author.avatarUrl} />
      </aside>
      <main>
        <AuthorName name={comment.author.username} />
        <CommentTimestamp timestamp={comment.createdAt} />
        <CommentText text={comment.text} />
        <ul className="comment-actions">
          <li>
            {canDeleteComment(comment) &&
             <CommentAction onClick={() => onDeleteComment(comment)}>
               Delete
             </CommentAction>
            }
          </li>
          <li>
            {canReplyToComment(comment) &&
             (replyingTo !== comment.id
             ? <CommentAction onClick={() => onSetReplyingTo(comment.id)}>
               Reply
             </CommentAction>
             : <CommentAction onClick={() => onSetReplyingTo(null)}>
               Close
             </CommentAction>
             )}
          </li>
        </ul>
      </main>
    </div>
    {replyingTo === comment.id &&
     <ReplyForm
       onCreateComment={onCreateComment}
       onSetReplyingTo={onSetReplyingTo}
     />
    }
    {comment.replies &&
     <CommentList
       comments={comment.replies}
       replyingTo={replyingTo}
       onCreateComment={onCreateComment}
       onDeleteComment={onDeleteComment}
       onSetReplyingTo={onSetReplyingTo}
       canDeleteComment={canDeleteComment}
       canReplyToComment={canReplyToComment}
     />
    }
  </li>

);

export default CommentItem;
