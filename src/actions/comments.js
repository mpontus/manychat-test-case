import { v4 as uuid } from 'node-uuid';
import {
  SET_COMMENTS,
  ADD_COMMENT,
  ADD_REPLY,
  REMOVE_COMMENT,
  SET_REPLYING_TO,
  SET_SENDING_COMMENT,
  SET_RETRIEVING_COMMENTS,
} from '../constants';
import * as api from '../api';

export const fetchComments = () => (dispatch) => {
  dispatch(setRetrievingComments(true));
  api.fetchComments().then(comments => {
    dispatch(setComments(comments));
    dispatch(setRetrievingComments(false));
  });
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
  const { currentUser } = getState();
  api.deleteComment(currentUser, comment.id).then(() => {
    dispatch(removeComment(comment))
  });
}

export const setRetrievingComments = (status) => ({
  type: SET_RETRIEVING_COMMENTS,
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
