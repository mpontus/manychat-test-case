import {v4} from 'node-uuid';
import Chance from 'chance';
import {generateAvatarUrl} from '../utils/avatar';


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

// TODO obsolete?
const walkComments = (cb) => {
  const walk = (root) =>
    root.forEach(item => {
      cb(item);
      walk(item.replies);
    });
  walk(db.comments);
}

function* commentIterator() {
  function* walkTree(comments, path = []) {
    for (let comment of comments) {
      yield { comment, path };
      yield* walkTree(
        comment.replies || [],
        [...path, comment.id],
      );
    }
  }
  yield* walkTree(db.comments);
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const findPath = (id) => {
  const findInList = (list, id, pathSoFar = []) => {
    let result;
    for (let comment of list) {
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
  const comment = {
    id: v4(),
    author: author,
    text: text,
    createdAt: Date.now(),
  };

  if (parentId === null) {
    db.comments.unshift(comment);
  } else {
    for (let {parent, path} of commentIterator()) {
      if (parent.id === parentId) {
        parent.replies = [comment, ...parent.replies || []];
        break;
      }
    }
  }

  return {
    comment,
    parentId,
  };
};

export const fetchComments = () => {
  return delay(500).then(() => db.comments.slice(0));
}

export const createComment = (author, text, parentId = null) => {
  return delay(500).then(() => addComment(author, text, parentId));
}

export const pollComments = (since) => {
  return delay(500).then(() => {
    const lookupComments = (comments, parentId) =>
      comments.reduce((acc, comment) => {
        if (comment.createdAt > since) {
          return [...acc, {
            comment,
            parentId
          }];
        }
        return acc.concat(lookupComments(comment.replies || [], comment.id));
      }, []);
    return lookupComments(db.comments);
  });
}
