import React from 'react';
import { FormattedRelative } from 'react-intl';

const CommentTimestamp = ({ timestamp }) => (
  <div className="comment-timestamp">
    <FormattedRelative
      value={new Date(timestamp)}
      updateInterval={1000}
    />
  </div>
);

export default CommentTimestamp;
