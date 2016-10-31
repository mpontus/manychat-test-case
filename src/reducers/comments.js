import {
  SET_COMMENTS,
  ADD_COMMENT,
  ADD_REPLY,
  DELETE_COMMENT,
} from '../constants';

const commentReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      if (action.parentId === state.id) {
        console.log(action.parentId, state.id);
        return {
          ...state,
          replies: [
            action.comment,
            ...state.replies
          ],
        };
      }
      return {
        ...state,
        replies: (state.replies || []).map(c => commentReducer(c, action)),
      };
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
    case DELETE_COMMENT:
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
    case SET_COMMENTS:
      return action.comments;
    case ADD_COMMENT:
      if (action.parentId === null) {
        return [
          action.comment,
          ...state,
        ];
      }
      return state.map(c => commentReducer(c, action));
    case ADD_REPLY:
      return state.map(
        comment => commentReducer(comment, action),
      );
    case DELETE_COMMENT:
      return state.map(
        comment => commentReducer(comment, action),
      ).filter(
        comment => comment.id !== action.commentId,
      );
    default:
      return state;
  }
};

export default commentsReducer;
