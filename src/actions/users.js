import {
  USER_LOGIN,
} from '../constants';

export const login = (username) => {
  return {
    type: USER_LOGIN,
    username,
  }
}
