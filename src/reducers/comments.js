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
          ...state,
          [action.comment.id]: action.comment.parentId,
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
          ...state,
          [action.comment.parentId]: [
            action.comment.id,
            ...state[action.comment.parentId] || [],
          ],
        };
      }
    default:
      return state;
  }
};

const ensureUniqueComments = reducer => (state, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      if (state.commentsById[action.comment.id])
        return state;
    default:
      return reducer(state, action);
  }
}

export default ensureUniqueComments(combineReducers({
  commentsById,
  commentIds,
  commentParentIds,
  commentChildren,
}));

const getComment = (state, id) => state.commentsById[id];

const getTopLevelComments = (state) =>
  state.commentIds
    .filter(id => !state.commentParentIds[id])
    .map(id => getComment(state, id));

const getCommentChildren = (state, id) =>
  (state.commentChildren[id] || []).map(id => getComment(state, id));

const getCommentChildrenTree = (state, id) =>
  getCommentChildren(state, id).map(comment => ({
    ...comment,
    replies: getCommentChildrenTree(state, comment.id),
  }));

export const getCommentTree = (state) =>
  getTopLevelComments(state).map(comment => ({
    ...comment,
    replies: getCommentChildrenTree(state, comment.id),
  }));
