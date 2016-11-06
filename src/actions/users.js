import {
  USER_LOGIN,
  USER_LOGOUT,
} from '../constants';

export const login = (username) => {
  return {
    type: USER_LOGIN,
    username,
  }
}

export const logout = () => {
  return {
    type: USER_LOGOUT,
  }
}
