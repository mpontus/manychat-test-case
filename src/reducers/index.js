import {combineReducers} from 'redux';
import currentUser from './currentUser';
import replyingTo from './replyingTo';
import comments from './comments';

const rootReducer = combineReducers({
  currentUser,
  replyingTo,
  comments,
});

export * from './comments';
export default rootReducer;
