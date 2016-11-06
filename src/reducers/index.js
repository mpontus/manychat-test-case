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

export const getCommentsSync = (state) =>
  fromComments.getCommentsSync(state.comments);

export const isPollingComments = (state) =>
  fromComments.isPollingComments(state.comments);

export const isSendingComment = (state) =>
  fromComments.isSendingComment(state.comments);

export const getTopLevelComments = (state) =>
  fromComments.getTopLevelComments(state.comments);
