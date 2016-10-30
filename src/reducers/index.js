import {combineReducers} from 'redux';
import currentUser from './currentUser';
import comments from './comments';

const rootReducer = combineReducers({
  currentUser,
  comments,
});

export default rootReducer;
