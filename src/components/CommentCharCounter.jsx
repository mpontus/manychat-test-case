import React from 'react';

const CommentCharCounter = ({charsLeft}) => (
  <div className="comment-char-counter">
    {charsLeft} characters left
  </div>
);

export default CommentCharCounter;
