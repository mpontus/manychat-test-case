import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentForm from '../components/CommentForm';
import { createComment, setReplyingTo } from '../actions';
import { isSendingComment } from '../reducers';

class ReplyForm extends Component {

  static propTypes = {
    parent: React.PropTypes.object,
    replyingTo: React.PropTypes.any,
    sendingComment: React.PropTypes.bool,
    createComment: React.PropTypes.func.isRequired,
  }

  handleSubmit(comment) {
    this.props.createComment(comment);
  }

  render() {
    const { parent, replyingTo, sendingComment } = this.props;

    if (replyingTo !== (parent ? parent.id : null)) {
      return null;
    }

    return (
      <CommentForm
        disabled={sendingComment}
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
)(ReplyForm);
