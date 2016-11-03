import React, {Component} from 'react';
import CommentForm from './CommentForm';

class ReplyForm extends Component {

  static propTypes = {
    onCreateComment: React.PropTypes.func.isRequired,
    onSetReplyingTo: React.PropTypes.func.isRequired,
  }

  handleSubmit(comment) {
    const { onCreateComment, onSetReplyingTo } = this.props;
    onCreateComment(comment);
    onSetReplyingTo(null);
  }

  render() {
    return (
      <CommentForm
        onSubmit={(comment) => this.handleSubmit(comment)}
      />
    );
  }
};

export default ReplyForm;
