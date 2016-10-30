import {
  ADD_COMMENT
} from '../constants';

const comments = (state = [], action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return [
        action.comment,
        ...state,
      ];
    default:
      return state;
  }
};

export default comments;
