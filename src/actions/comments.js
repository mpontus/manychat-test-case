import { v4 as uuid } from 'node-uuid';
import {
  SET_COMMENTS,
  ADD_COMMENT,
  ADD_REPLY,
  DELETE_COMMENT,
  SET_REPLYING_TO,
} from '../constants';
import * as api from '../api';

export const createComment = ({author, text}, parentId = null) => dispatch => {
  api.createComment(author, text, parentId).then(comment =>
    dispatch(addComment(comment))
  );
}

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
});

export const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  commentId,
});

export const setReplyingTo = (commentId) => ({
  type: SET_REPLYING_TO,
  commentId
});
