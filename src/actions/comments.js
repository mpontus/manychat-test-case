import { v4 as uuid } from 'node-uuid';
import {
  SET_COMMENTS,
  ADD_COMMENT,
  ADD_REPLY,
  REMOVE_COMMENT,
  SET_REPLYING_TO,
} from '../constants';
import * as api from '../api';

export const createComment = ({ text }) => (dispatch, getState) => {
  const { currentUser, replyingTo } = getState();
  if (currentUser === null) {
    throw new Error("Anonymous users can't create comments.");
  }
  api.createComment(currentUser, text, replyingTo).then(comment => {
    dispatch(setReplyingTo(null));
    dispatch(addComment(comment));
  });
}

export const deleteComment = (comment) => (dispatch, getState) => {
  const { currentUser } = getState();
  api.deleteComment(currentUser, comment.id).then(() => {
    dispatch(removeComment(comment))
  });
}

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
