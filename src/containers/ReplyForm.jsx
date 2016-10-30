import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addReply, setReplyingTo} from '../actions';
import CommentForm from '../components/CommentForm';

class ReplyForm extends Component {

  static propTypes = {
    comment: React.PropTypes.object.isRequired,
  }

  handleSubmit(text) {
    this.props.addReply({
      author: this.props.currentUser,
      text,
      parentId: this.props.comment.id,
    });
    this.props.setReplyingTo(null);
  }

  render() {
    const {replyingTo, comment} = this.props;

    if (replyingTo !== comment.id) {
      return null;
    }

    return (
      <CommentForm
        onSubmit={(text) => this.handleSubmit(text)}
      />
    );
  }
};

export default connect(
  ({replyingTo, currentUser}) => ({replyingTo, currentUser}),
  {addReply, setReplyingTo},
)(ReplyForm);
