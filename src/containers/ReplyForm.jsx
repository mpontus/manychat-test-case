import React, { Component } from 'react';
import { connect } from 'react-redux';
import SessionDetails from './SessionDetails';
import CommentForm from '../components/CommentForm';
import { createComment, setReplyingTo } from '../actions';
import { isSendingComment } from '../reducers';
import { connectToConfiguration } from '../utils/configuration';

class ReplyForm extends Component {

  static propTypes = {
    currentUser: React.PropTypes.any,
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
      currentUser,
      replyingTo,
      sendingComment,
      maxTextLength,
    } = this.props;

    if (!currentUser) {
      return null;
    }

    if (replyingTo !== (parent ? parent.id : null)) {
      return null;
    }

    return (
      <div className="reply-form">
        <aside>
          <SessionDetails />
        </aside>
        <main>
          <div className="author-name">
            Posting as {currentUser.username}
          </div>
          <CommentForm
            disabled={sendingComment}
            maxTextLength={maxTextLength}
            onSubmit={(comment) => this.handleSubmit(comment)}
          />
        </main>
      </div>
    );
  }
};



export default connect(
  (state) => ({
    currentUser: state.currentUser,
    replyingTo: state.replyingTo,
    sendingComment: isSendingComment(state),
  }),
  { createComment },
)(connectToConfiguration(settings => ({
  maxTextLength: settings.maxCommentLength,
}))(ReplyForm));
