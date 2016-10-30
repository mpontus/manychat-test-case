import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteComment} from '../actions';

class CommentDeleteButton extends Component {

  static propTypes = {
    comment: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.any,
    deleteComment: React.PropTypes.func.isRequired,
  }

  handleClick(e) {
    e.preventDefault();
    this.props.deleteComment(this.props.comment.id);
  }

  render() {
    const {currentUser, comment} = this.props;

    if (!currentUser) {
      return null;
    }

    if (currentUser.username !== comment.author.username) {
      return null;
    }

    return (
      <a
        className="comment-delete-button"
        href="#"
        onClick={(e) => this.handleClick(e)}>
        Delete
      </a>
    );
  }
};

export default connect(
  ({currentUser}) => ({currentUser}),
  {deleteComment},
)(CommentDeleteButton);
