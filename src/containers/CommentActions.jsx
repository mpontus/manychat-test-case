import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setReplyingTo, deleteComment } from '../actions';

class CommentActions extends Component {
  static propTypes = {
    comment: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object,
    replyingTo: React.PropTypes.any,
    setReplyingTo: React.PropTypes.func.isRequired,
    deleteComment: React.PropTypes.func.isRequired,
  }

  canDeleteComment(comment) {
    const { currentUser } = this.props;
    return currentUser !== null &&
           currentUser.username === comment.author.username;
  }

  canReplyToComment(comment) {
    return this.props.currentUser !== null;
  }

  render() {
    const { comment, replyingTo, setReplyingTo, deleteComment } = this.props;

    return (
      <div className="comment-actions">
        {this.canDeleteComment(comment) &&
         <button onClick={() => deleteComment(comment)}>
           Delete
         </button>
        }
        {this.canReplyToComment(comment) &&
         (replyingTo !== comment.id
         ? <button onClick={() => setReplyingTo(comment.id)}>
           Reply
         </button>
         : <button onClick={() => setReplyingTo(null)}>
           Close
         </button>
         )}
      </div>
    );
  }
}

export default connect(
  ({ currentUser, replyingTo }) => ({ currentUser, replyingTo }),
  { setReplyingTo, deleteComment },
)(CommentActions);
