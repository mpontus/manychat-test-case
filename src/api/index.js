import {v4} from 'node-uuid';
import Chance from 'chance';
import {generateAvatarUrl} from '../utils/avatar';

const chance = new Chance();

const timeNow = Date.now();

const db = {
  comments: [
    {
      id: 1,
      author: {
        username: "Evgeniy Korzun",
        avatarUrl: generateAvatarUrl("Evgeniy Korzun"),
      },
      createdAt: timeNow - 2 * 60,
      text: "Check your internet connection",
    },
    {
      id: 2,
      author: {
        username: "Ivanov Ivan",
        avatarUrl: generateAvatarUrl("Ivanov Ivan")
      },
      createdAt: timeNow - 52 * 60,
      text: "Call to customer Jacob to discuss the detail.",
      replies: [
        {
          id: 3,
          author: {
            username: "Petrov Petr",
            avatarUrl: generateAvatarUrl("Petrov Petr")
          },
          createdAt: timeNow - 10 * 60,
          text: "I don't have number :(",
        },
        {
          id: 4,
          author: {
            username: "Ivanov Ivan",
            avatarUrl: generateAvatarUrl("Ivanov Ivan")
          },
          createdAt: timeNow - 2 * 60,
          text: "Here it is - 123456",
        }
      ],
    },
    {
      id: 5,
      author: {
        username: "Anonymous",
        avatarUrl: generateAvatarUrl("Anonymous")
      },
      createdAt: timeNow - 1 * 3600,
      text: "Wow",
    },
  ],
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const findPath = (id) => {
  const findInList = (list, id, pathSoFar = []) => {
    let result;
    for (comment of list) {
      let path = [...pathSoFar, id];
      if (comment.id === id) {
        return path;
      }
      if (result = findInlist(comment.replies || [], id, path)) {
        return result;
      }
    }
    return false;
  }
  return findInList(db.comments, id);
}

const addComment = (author, text, parentId = null) => {
  const newComment = {
    id: v4(),
    author: author,
    text: text,
    createdAt: Date.now(),
  };

  if (parentId === null) {
    db.comments.unshift(newComment);
    return {
      ...newComment,
      parentPath: [],
    };
  }

  let path = findPath(parentId);
  let comments = db.comments;
  while (path.length) {
    let id = path.shift();
    comments = comments.find(c => c.id === id).replies;
  }
  comments.unshift(newComment);

  return {
    ...newComment,
    parentPath: path,
  };
};

export const fetchComments = () => {
  return delay(500).then(() => db.comments);
}

export const createComment = (author, text, parentId = null) => {
  return delay(500).then(() => addComment(author, text, parentId));
}

export const pollComments = (since) => {
  return delay(500).then(() => {
    let username = chance.name();
    return [
      addComment({
        username,
        avatar: generateAvatarUrl(username)
      }, chance.sentence())
    ];
  });
}

// const randomNumber = (max) => Math.floor(Math.random() * 10);
// 
// const randomUsername = (() => {
//   const existingUsernames = [];
//   return () => {
//     const n = randomNumber(existingUsernames.length);
//     if (n === 0) {
//       existingUsernames.unshift(chance.name());
//       return existingUsernames[0];
//     }
//     return existingUsernames[n - 1];
//   }
// })();
// 
// const randomComment = () => {
//   const username = randomUsername();
//   return {
//     author: {
//       username,
//       avatarUrl: generateAvatarUrl(username),
//     },
//     text: chance.sentence(),
//     createdAt: Date.now(),
//   };
// }
// 

