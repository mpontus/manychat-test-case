import { combineReducers } from 'redux';
import currentUser from './currentUser';
import replyingTo from './replyingTo';
import comments, * as fromComments from './comments';

const rootReducer = combineReducers({
  currentUser,
  replyingTo,
  comments,
});

export default rootReducer;

export const getCommentTree = (state) =>
  fromComments.getCommentTree(state.comments);
