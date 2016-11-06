import React from 'react';
import FormattedText from './FormattedText';

const CommentText = ({text}) => (
  <div className="comment-text">
    <FormattedText text={text} />
  </div>
);

export default CommentText;
