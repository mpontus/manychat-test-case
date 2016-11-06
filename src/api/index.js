import {v4} from 'node-uuid';
import Chance from 'chance';
import {generateAvatarUrl} from '../utils/avatar';

const timeNow = Date.now();

const db = {
  comments: [],
  deleted: [],
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchComments = () =>
  delay(500).then(() => db.comments.slice(0));

export const createComment = (author, text, parentId = null) => {
  return delay(500).then(() => {
    const newComment = {
      id: v4(),
      author,
      text,
      createdAt: Date.now(),
      parentId,
    };
    db.comments.unshift(newComment);
    return newComment;
  });
}

export const deleteComment = (commentId) => {
  return delay(500).then(() => {
    const deletedComment = db.comments.find(c => c.id === commentId);
    db.comments = db.comments.filter(c => c.id !== commentId);
    db.deleted.unshift({
      ...deletedComment,
      deletedAt: Date.now(),
    });
    return deletedComment;
  });
};

const getNewComments = (since) => {
  const comments = [];
  for (let comment of db.comments) {
    if (comment.createdAt <= since) {
      break;
    }
    comments.push(comment);
  }
  return comments;
}

const getDeletedComments = (since) => {
  const comments = [];
  for (let comment of db.deleted) {
    if (comment.deletedAt <= since) {
      break;
    }
    // skip deleted comments that were not previously fetched
    if (comment.createdAt > since) {
      continue;
    }
    comments.push(comment);
  }
  return comments;
}

export const pollComments = (since) =>
  delay(500).then(() => [
    ...getNewComments(since).map(comment => ({ type: 'new', comment })),
    ...getDeletedComments(since).map(comment => ({ type: 'deleted', comment })),
  ]);
