import { v4 as uuid } from 'node-uuid';
import {
  ADD_COMMENT,
  ADD_REPLY,
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

export const setReplyingTo = (commentId) => ({
  type: SET_REPLYING_TO,
  commentId
});
