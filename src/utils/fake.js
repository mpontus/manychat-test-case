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

const withExistingComment = (cb) =>
  api.fetchComments().then(comments => {
    if (comments.length) {
      const comment = comments[randomInt(comments.length)];
      cb(comment);
      return comment;
    }
  });

export const createRandomComment = (parentId = null) => {
  const comment = generateComment();
  return api.createComment(comment.author, comment.text, parentId);
}

export const createRandomReply = () =>
  withExistingComment(comment =>
    createRandomComment(comment.id)
  );

export const deleteRandomComment = () =>
  withExistingComment(comment =>
    api.deleteComment(comment.id)
  );
