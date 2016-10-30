import { v4 as uuid } from 'node-uuid';
import {
  ADD_COMMENT,
  ADD_REPLY,
  DELETE_COMMENT,
  SET_REPLYING_TO,
} from '../constants';

export const addComment = ({author, text}) => ({
  type: ADD_COMMENT,
  comment: {
    id: uuid(),
    author,
    text,
    createdAt: Date.now(),
  },
});

export const addReply = ({author, text, parentId}) => ({
  type: ADD_REPLY,
  comment: {
    id: uuid(),
    author,
    text,
    createdAt: Date.now(),
  },
  parentId,
});

export const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  commentId,
});

export const setReplyingTo = (commentId) => ({
  type: SET_REPLYING_TO,
  commentId
});
