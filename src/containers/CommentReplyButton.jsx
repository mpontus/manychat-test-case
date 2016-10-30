import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setReplyingTo} from '../actions';

class CommentReplyButton extends Component {

  static propTypes = {
    comment: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.any,
    replyingTo: React.PropTypes.any,
    setReplyingTo: React.PropTypes.func.isRequired,
  }

  handleOpen(e) {
    e.preventDefault();
    this.props.setReplyingTo(this.props.comment.id);
  }

  handleClose(e) {
    e.preventDefault();
    this.props.setReplyingTo(null);
  }

  render() {
    const {currentUser, replyingTo, comment} = this.props;

    if (!currentUser) return null;

    if (replyingTo === comment.id) {
      return (
        <a
          className="comment-reply-button"
          href="#"
          onClick={(e) => this.handleClose(e)}>
          Close
        </a>
      );
    }

    return (
      <a
        className="comment-reply-button"
        href="#"
        onClick={(e) => this.handleOpen(e)}>
        Reply
      </a>
    );
  }
};

export default connect(
  ({replyingTo, currentUser}) => ({replyingTo, currentUser}),
  {setReplyingTo},
)(CommentReplyButton);
