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

export const getTopLevelComments = (state) =>
  fromComments.getTopLevelComments(state.comments);

export const isSendingComment = (state) =>
  fromComments.isSendingComment(state.comments);
