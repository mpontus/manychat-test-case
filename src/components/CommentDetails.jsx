import React from 'react';
import AuthorAvatar from './AuthorAvatar';
import AuthorName from './AuthorName';
import CommentTimestamp from './CommentTimestamp';
import CommentText from './CommentText';
import CommentActions from '../containers/CommentActions';

const CommentDetails = ({ comment }) => (
  <div className="comment-details">
    <aside>
      <AuthorAvatar url={comment.author.avatarUrl} />
    </aside>
    <main>
      <AuthorName name={comment.author.username} />
      <CommentTimestamp timestamp={comment.createdAt} />
      <CommentText text={comment.text} />
      <CommentActions comment={comment} />
    </main>
  </div>
);

export default CommentDetails;
