import { v4 as uuid } from 'node-uuid';
import {
  SET_COMMENTS,
  ADD_COMMENT,
  ADD_REPLY,
  DELETE_COMMENT,
  SET_REPLYING_TO,
} from '../constants';
import * as api from '../api';

export const fetchComments = () => dispatch => {
  api.fetchComments().then((comments) => {
    dispatch(setComments(comments));
  });
}

export const pollComments = () => dispatch => {
  api.pollComments().then(comments => {
    comments.forEach(comment => {
      dispatch(addComment(comment));
    });
  });
};

export const createComment = (author, text, parentId = null) => {
  api.createComment(author, text, parentId).then((comment) => {
    if (parentId === null) {
      dispatch(addComment(comment));
    } else {
      dispatch(addReply({
        ...comment,
        parentId: parentId,
      }));
    }
  });
}

export const setComments = (comments) => ({
  type: SET_COMMENTS,
  comments: comments,
});

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
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
