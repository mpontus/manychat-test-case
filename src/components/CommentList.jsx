import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CommentItem from './CommentItem';

const CommentList = ({ comments }) => (
  <ul className="comment-list">
    <ReactCSSTransitionGroup
      transitionName="comment-animation"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}>
      {comments.map(comment => (
         <CommentItem key={comment.id} comment={comment} />
       ))}
    </ReactCSSTransitionGroup>
  </ul>
);

CommentList.propTypes = {
  comments: React.PropTypes.array.isRequired,
};

export default CommentList;
