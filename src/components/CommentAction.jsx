import React, { Component } from 'react';

class CommentAction extends Component {
  render() {
    const { onClick, children } = this.props;
    return (
      <a
        className="comment-action"
        href="#"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
};

export default CommentAction;
