import React from 'react';
import AuthorAvatar from './AuthorAvatar';
import AuthorName from './AuthorName';
import CommentTimestamp from './CommentTimestamp';
import CommentText from './CommentText';
import CommentActions from './CommentActions';

const CommentItem = ({comment}) => (
  <div className="comment-item">
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

export default CommentItem;
