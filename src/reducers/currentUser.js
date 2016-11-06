import {generateAvatarUrl} from '../utils/avatar';

import {
  USER_LOGIN,
  USER_LOGOUT,
} from '../constants';

const currentUser = (state = null, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        username: action.username,
        avatarUrl: generateAvatarUrl(action.username),
      }
    case USER_LOGOUT:
      return null;
    default:
      return state;
  }
};

export default currentUser;
