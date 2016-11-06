import React from 'react';

const CommentText = ({text}) => (
  <div className="comment-text">
    {text.split('\n').map((line, n) => <p key={n}>{line}</p>)}
  </div>
);

export default CommentText;
