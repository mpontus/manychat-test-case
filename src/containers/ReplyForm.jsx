import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentForm from '../components/CommentForm';
import { createComment, setReplyingTo } from '../actions';

class ReplyForm extends Component {

  static propTypes = {
    parent: React.PropTypes.object,
    createComment: React.PropTypes.func.isRequired,
    setReplyingTo: React.PropTypes.func.isRequired,
  }

  handleSubmit(comment) {
    const {
      parent,
      createComment,
      setReplyingTo,
    } = this.props;

    createComment(comment, parent && parent.id);
    setReplyingTo(null);
  }

  render() {
    return (
      <CommentForm
        onSubmit={(comment) => this.handleSubmit(comment)}
      />
    );
  }
};

export default connect(
  null,
  { createComment, setReplyingTo },
)(ReplyForm);
