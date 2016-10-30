import {generateAvatarUrl} from '../utils/avatar';

import {
  USER_LOGIN,
} from '../constants';

const currentUser = (state = null, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        username: action.username,
        avatarUrl: generateAvatarUrl(action.username),
      }
    default:
      return state;
  }
};

export default currentUser;
