import {v4} from 'node-uuid';
import Chance from 'chance';
import {generateAvatarUrl} from '../utils/avatar';


const timeNow = Date.now();

const db = {
  comments: [
    {
      id: 5,
      author: {
        username: "Anonymous",
        avatarUrl: generateAvatarUrl("Anonymous")
      },
      createdAt: timeNow - 1 * 3600,
      text: "Wow",
      parentId: null,
    },
    {
      id: 2,
      author: {
        username: "Ivanov Ivan",
        avatarUrl: generateAvatarUrl("Ivanov Ivan")
      },
      createdAt: timeNow - 52 * 60,
      text: "Call to customer Jacob to discuss the detail.",
      parentId: null,
    },
    {
      id: 3,
      author: {
        username: "Petrov Petr",
        avatarUrl: generateAvatarUrl("Petrov Petr")
      },
      createdAt: timeNow - 10 * 60,
      text: "I don't have number :(",
      parentId: 2,
    },
    {
      id: 4,
      author: {
        username: "Ivanov Ivan",
        avatarUrl: generateAvatarUrl("Ivanov Ivan")
      },
      createdAt: timeNow - 2 * 60,
      text: "Here it is - 123456",
      parentId: 2,
    },
    {
      id: 1,
      author: {
        username: "Evgeniy Korzun",
        avatarUrl: generateAvatarUrl("Evgeniy Korzun"),
      },
      createdAt: timeNow - 2 * 60,
      text: "Check your internet connection",
      parentId: null,
    },
  ],
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
    return deletedComment;
  });
};

export const pollComments = (since = null) => {
  return delay(500).then(() => {
    const comments = [];
    for (let comment of db.comments) {
      if (comment.createdAt <= since) {
        break;
      }
      comments.push(comment);
    }
    return comments;
  });
}
