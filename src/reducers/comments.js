import { combineReducers } from 'redux';
import {
  SET_COMMENTS,
  ADD_COMMENT,
  ADD_REPLY,
  REMOVE_COMMENT,
  SET_COMMENTS_SYNC,
  SET_SENDING_COMMENT,
  SET_POLLING_COMMENTS,
} from '../constants';
import { addComment, removeComment } from '../actions';

const commentsById = (state = {}, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return action.comments.reduce((acc, comment) => ({
        ...acc,
        [comment.id]: comment,
      }), {});
    case ADD_COMMENT:
      return {
        [action.comment.id]: action.comment,
        ...state,
      };
    case REMOVE_COMMENT:
      const newState = action.comment.replies.reduce((state, comment) => {
        return commentsById(state, removeComment(comment));
      }, state);
      return {
        ...newState,
        [action.comment.id]: undefined,
      }
    default:
      return state;
  }
};

const rootCommentIds = (state = [], action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return action.comments
        .filter(comment => comment.parentId === null)
        .map(comment => comment.id);
    case ADD_COMMENT:
      if (action.comment.parentId) {
        return state;
      }
      return [
        action.comment.id,
        ...state,
      ];
    case REMOVE_COMMENT:
      if (action.comment.parentId) {
        return state;
      }
      return state.filter(id => id !== action.comment.id)
    default:
      return state;
  }
};

const commentParentIds = (state = {}, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return action.comments.reduce((acc, comment) => ({
        ...acc,
        [comment.id]: comment.parentId,
      }), {});
    case ADD_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment.parentId,
      };
    case REMOVE_COMMENT:
      const newState = action.comment.replies.reduce((state, comment) => {
        return commentParentIds(state, removeComment(comment));
      }, state);
      return {
        ...newState,
        [action.comment.id]: undefined,
      };
    default:
      return state;
  }
};

// When removing a comment
// 1. Delete its id from its parent's children ids list
// 2. Delete its own children ids list
// 3. Delete its children's children ids list

const commentChildrenIds = (state = {}, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return action.comments.reduce((acc, comment) => {
        if (!comment.parentId) {
          return acc;
        }
        return {
          ...acc,
          [comment.parentId]: [
            ...(acc[comment.parentId] || []),
            comment.id,
          ],
        };
      }, {});
    case ADD_COMMENT:
      if (action.comment.parentId === null) {
        return state;
      }
      return {
        ...state,
        [action.comment.parentId]: [
          action.comment.id,
          ...state[action.comment.parentId] || [],
        ],
      };
    case REMOVE_COMMENT:
      // remove children's children lists
      // FIXME also removes children ids from their parent's children list which
      // is redundant since we'll be removing it's parent's children list entirely
      let newState = action.comment.replies.reduce((state, comment) => {
        return commentChildrenIds(state, removeComment(comment));
      }, state);

      // remove comment's children list
      newState = {
        ...newState,
        [action.comment.id]: undefined,
      };

      // do we need to remove comment from its parent list?
      if (action.comment.parentId === null) {
        return newState;
      }

      // remove comment from its parent list
      return {
        ...newState,
        [action.comment.parentId]:
        newState[action.comment.parentId].filter(
          id => id !== action.comment.id
        )
      }
    default:
      return state;
  }
};

const ensureUniqueComments = reducer => (state, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      if (state.commentsById[action.comment.id]) {
        return state;
      }
    default:
      return reducer(state, action);
  }
}

const commentsSync = (state = null, action) => {
  switch (action.type) {
    case SET_COMMENTS_SYNC:
      return action.timestamp;
    default:
      return state;
  }
}

const createStatusReducer = (actionType, defaultState) =>
  (state = defaultState, action) => {
    if (action.type === actionType) {
      return action.status;
    }
    return state;
  }

const commentAncestors = (state = {}, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return action.comments.reduce((state, comment) => {
        return commentAncestors(state, addComment(comment));
      }, state);
    case ADD_COMMENT:
      if (action.comment.parentId === null) {
        return state;
      }
      const parentAncestors = state[action.comment.parentId] || [];
      return {
        ...state,
        [action.comment.id]: [action.comment.parentId, ...parentAncestors],
      }
    case REMOVE_COMMENT:
      let newState = action.comment.replies.reduce((state, comment) => {
        return commentAncestors(state, removeComment(comment))
      }, state);
      delete newState[action.comment.id];
      return newState;
    default:
      return state;
  }
}



export default ensureUniqueComments(combineReducers({
  commentsSync,
  sendingComment: createStatusReducer(SET_SENDING_COMMENT, false),
  pollingComments: createStatusReducer(SET_POLLING_COMMENTS, false),
  commentsById,
  rootCommentIds,
  commentParentIds,
  commentChildrenIds,
  commentAncestors,
}));

const getCommentChildren = (state, id) =>
  (state.commentChildrenIds[id] || []).map(id => getComment(state, id));

export const getComment = (state, id) => {
  const comment = state.commentsById[id];
  if (comment === undefined) {
    return null;
  }
  return {
    ...comment,
    parentId: state.commentParentIds[id] || null,
    ancestors: state.commentAncestors[id] || [],
    replies: getCommentChildren(state, id) || [],
  };
}

export const getTopLevelComments = (state) =>
  state.rootCommentIds
    .map(id => getComment(state, id));

export const getCommentsSync = (state) => state.commentsSync;

export const isPollingComments = (state) => state.pollingComments;

export const isSendingComment = (state) => state.sendingComment;
