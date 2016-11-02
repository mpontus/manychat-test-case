import { combineReducers } from 'redux';
import {
  SET_COMMENTS,
  ADD_COMMENT,
  ADD_REPLY,
  DELETE_COMMENT,
} from '../constants';

const commentsById = (state = {}, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        [action.comment.id]: action.comment,
        ...state,
      };
    default:
      return state;
  }
};

const commentIds = (state = [], action) => {
  switch (action.type) {
    case ADD_COMMENT:
      if (!action.comment.parentId) {
        return [
          action.comment.id,
          ...state,
        ];
      }
    default:
      return state;
  }
};

const commentParentIds = (state = {}, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      if (action.comment.parentId) {
        return {
          [action.comment.id]: action.comment.parentId,
          ...state,
        };
      }
    default:
      return state;
  }
};

const commentChildren = (state = {}, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      if (action.comment.parentId) {
        return {
          [action.comment.parentId]: [
            action.comment.id,
            ...state[action.comment.parentId],
          ]
        };
      }
    default:
      return state;
  }
};

export const getComment = (state, id) => state.commentsById[id];

export const getTopLevelComments = (state) =>
  state.commentIds.map(id => getComment(state, id));

export const getCommentChildren = (state, id) =>
  (state.commentChildren[id] || []).map(id => getComment(state, id));

export const getCommentTree = (state) =>
  getTopLevelComments(state).map(comment => ({
    ...comment,
    replies: getCommentChildren(state, comment.id),
  }));

export default combineReducers({
  commentsById,
  commentIds,
  commentParentIds,
  commentChildren,
});

