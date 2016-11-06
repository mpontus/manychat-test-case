import Chance from 'chance';
import { generateAvatarUrl } from '../utils/avatar';
import * as api from '../api';

const chance = new Chance();

const randomInt = (max) => Math.floor(Math.random() * max);

const generateAuthor = () => {
  const username = chance.name();
  return {
    username: username,
    avatarUrl: generateAvatarUrl(username),
  }
}

const generateComment = () => ({
  author: generateAuthor(),
  text: chance.sentence(),
});

// select random comment from the latest N
const withExistingComment = (n, cb) =>
  api.fetchComments().then(comments => {
    if (comments.length) {
      const comment = comments[randomInt(Math.min(n, comments.length))];
      cb(comment);
      return comment;
    }
  });

export const createRandomComment = (parentId = null) => {
  const comment = generateComment();
  return api.createComment(comment.author, comment.text, parentId);
}

export const createRandomReply = () =>
  withExistingComment(8, comment =>
    createRandomComment(comment.id)
  );

export const deleteRandomComment = () =>
  withExistingComment(8, comment =>
    api.deleteComment(comment.id)
  );
