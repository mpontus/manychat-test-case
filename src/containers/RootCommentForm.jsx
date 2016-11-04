import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReplyForm from './ReplyForm';

const RootCommentForm = ({ replyingTo }) => (
  replyingTo === null && <ReplyForm parent={null} />
);

export default connect(
  ({ replyingTo }) => ({ replyingTo }),
)(RootCommentForm);
