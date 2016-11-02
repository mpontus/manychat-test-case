import { generateAvatarUrl } from '../utils/avatar';
import * as api from '../api';

import Chance from 'chance';

const flatten = (tree, fn) =>
  tree.reduce((acc, cur) => [...acc, cur, ...flatten(fn(cur), fn)], []);

const randomInt = (max) => Math.floor(Math.random() * max);

const chance = new Chance();

const getRandomParent = () =>
  api.fetchComments().then(comments => {
    const flatComments = flatten(comments, c => c.replies || []);
    const index = randomInt(flatComments.length);
    return flatComments[index];
  });

export const createFakeComment = () =>
  getRandomParent().then(parent => {
    const username = chance.name();
    return api.createComment({
      username: username,
      avatarUrl: generateAvatarUrl(username),
    }, chance.sentence(), parent.id);
  });

export const fakeCommentLoop = (ms) => {
  setTimeout(() => createFakeComment().then(() => fakeCommentLoop(ms)), ms);
}
