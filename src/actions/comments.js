import { v4 as uuid } from 'node-uuid';
import {
  SET_COMMENTS,
  ADD_COMMENT,
  ADD_REPLY,
  REMOVE_COMMENT,
  SET_REPLYING_TO,
  SET_COMMENTS_SYNC,
  SET_SENDING_COMMENT,
  SET_POLLING_COMMENTS,
} from '../constants';

import {
  getComment,
  getCommentsSync,
  isPollingComments,
} from '../reducers';

import * as api from '../api';

export const fetchComments = () => (dispatch) => {
  api.fetchComments().then(comments => {
    dispatch(setComments(comments));
    dispatch(setCommentsSync(Date.now()));
  });
}

// FIXME reducers require full comment tree when removing a comment

export const pollComments = () => (dispatch, getState) => {
  const state = getState();
  const commentsSync = getCommentsSync(state);
  const pollingComments = isPollingComments(state);
  if (!pollingComments) {
    dispatch(setPollingComments(true));
    api.pollComments(commentsSync).then(events => {
      events.forEach(event => {
        switch (event.type) {
          case 'new':
            return dispatch(addComment(event.comment));
          case 'deleted':
            let comment = getComment(getState(), event.comment.id);
            // FIXME ideally this shouldn't be needed but it is
            if (comment) {
              dispatch(removeComment(comment));
            }
            return;
        }
      });
      dispatch(setCommentsSync(Date.now()));
      dispatch(setPollingComments(false));
    });
  }
}

export const createComment = ({ text }) => (dispatch, getState) => {
  const { currentUser, replyingTo } = getState();
  if (currentUser === null) {
    throw new Error("Anonymous users can't create comments.");
  }
  dispatch(setSendingComment(true));
  api.createComment(currentUser, text, replyingTo).then(comment => {
    dispatch(setSendingComment(false));
    dispatch(setReplyingTo(null));
    dispatch(addComment(comment));
  });
}

export const deleteComment = (comment) => (dispatch, getState) => {
  api.deleteComment(comment.id).then(() => {
    dispatch(removeComment(comment))
  });
}

export const setCommentsSync = (timestamp) => ({
  type: SET_COMMENTS_SYNC,
  timestamp,
});

export const setPollingComments = (status) => ({
  type: SET_POLLING_COMMENTS,
  status,
});

export const setSendingComment = (status) => ({
  type: SET_SENDING_COMMENT,
  status,
});

export const setComments = (comments) => ({
  type: SET_COMMENTS,
  comments,
});

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
});

export const removeComment = (comment) => ({
  type: REMOVE_COMMENT,
  comment,
});

export const setReplyingTo = (commentId) => ({
  type: SET_REPLYING_TO,
  commentId
});
