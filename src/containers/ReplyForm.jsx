import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentForm from '../components/CommentForm';
import { createComment, setReplyingTo } from '../actions';
import { isSendingComment } from '../reducers';
import { connectToConfiguration } from '../utils/configuration';

class ReplyForm extends Component {

  static propTypes = {
    maxTextLength: React.PropTypes.number,
    parent: React.PropTypes.object,
    replyingTo: React.PropTypes.any,
    sendingComment: React.PropTypes.bool,
    createComment: React.PropTypes.func.isRequired,
  }

  handleSubmit(comment) {
    this.props.createComment(comment);
  }

  render() {
    const {
      parent,
      replyingTo,
      sendingComment,
      maxTextLength,
    } = this.props;

    if (replyingTo !== (parent ? parent.id : null)) {
      return null;
    }

    return (
      <CommentForm
        disabled={sendingComment}
        maxTextLength={maxTextLength}
        onSubmit={(comment) => this.handleSubmit(comment)}
      />
    );
  }
};



export default connect(
  (state) => ({
    replyingTo: state.replyingTo,
    sendingComment: isSendingComment(state),
  }),
  { createComment },
)(connectToConfiguration(settings => ({
  maxTextLength: settings.maxCommentLength,
}))(ReplyForm));
