import {
  SET_REPLYING_TO,
  REMOVE_COMMENT,
} from '../constants';

const replyingTo = (state = null, action) => {
  switch (action.type) {
    case REMOVE_COMMENT:
      return action.comment.id === state ? null : state;
    case SET_REPLYING_TO:
      return action.commentId;
    default:
      return state;
  }
};

export default replyingTo;
