import {v4} from 'node-uuid';
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

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


export const fetchComments = () => {
  return delay(500).then(() => db.comments);
}

export const addComment = (author, text) => {
  return delay(500).then(() => ({
    id: v4(),
    author,
    text,
  }));
};
