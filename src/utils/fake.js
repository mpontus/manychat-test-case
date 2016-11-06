import { generateAvatarUrl } from '../utils/avatar';
import * as api from '../api';

import Chance from 'chance';

const flatten = (tree, fn) =>
  tree.reduce((acc, cur) => [...acc, cur, ...flatten(fn(cur), fn)], []);

const randomInt = (max) => Math.floor(Math.random() * max);

const chance = new Chance();

const getRandomComment = () =>
  api.pollComments().then(comments =>
    comments[randomInt(comments.length)]
  );

export const createFakeComment = () => {
  if (randomInt(2)) {
    return getRandomComment().then(parent => {
      const username = chance.name();
      return api.createComment({
        username: username,
        avatarUrl: generateAvatarUrl(username),
      }, chance.sentence(), parent.id);
    });
  } else {
    const username = chance.name();
    return api.createComment({
      username: username,
      avatarUrl: generateAvatarUrl(username),
    }, chance.sentence());
  }
}

export const fakeCommentLoop = (ms) => {
  setTimeout(() => createFakeComment().then(() => fakeCommentLoop(ms)), ms);
}
