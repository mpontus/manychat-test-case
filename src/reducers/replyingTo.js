import {
  SET_REPLYING_TO,
} from '../constants';

const replyingTo = (state = null, action) => {
  switch (action.type) {
    case SET_REPLYING_TO:
      return action.commentId;
    default:
      return state;
  }
};

export default replyingTo;
