import {
  ADD_COMMENT,
  ADD_REPLY,
} from '../constants';

const commentReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_REPLY:
      if (state.id === action.parentId) {
        return {
          ...state,
          replies: [
            action.comment,
            ...(state.replies || [])
          ],
        };
      }
      return {
        ...state,
        replies: commentsReducer(state.replies, action),
      };
    default:
      return state;
  }
}

const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return [
        action.comment,
        ...state,
      ];
    case ADD_REPLY:
      return state.map(
        comment => commentReducer(comment, action),
      );
    default:
      return state;
  }
};

export default commentsReducer;
