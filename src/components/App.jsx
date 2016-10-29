import React from 'react';
import CommentTree from './CommentTree';

const timeNow = Date.now();

const comments = [
  {
    id: 1,
    author: {
      username: "Evgeniy Korzun",
      avatarUrl: "https://robohash.org/evko",
    },
    createdAt: timeNow - 2 * 60,
    text: "Check your internet connection",
  },
  {
    id: 2,
    author: {
      username: "Ivanov Ivan",
      avatarUrl: "https://robohash.org/iviv"
    },
    createdAt: timeNow - 52 * 60,
    text: "Call to customer Jacob to discuss the detail.",
    replies: [
      {
        id: 3,
        author: {
          username: "Petrov Petr",
          avatarUrl: "https://robohash.org/pepe"
        },
        createdAt: timeNow - 10 * 60,
        text: "I don't have number :(",
      },
      {
        id: 4,
        author: {
          username: "Ivanov Ivan",
          avatarUrl: "https://robohash.org/iviv"
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
      avatarUrl: "https://robohash.org/anon"
    },
    createdAt: timeNow - 1 * 3600,
    text: "Wow",
  },
];

const App = () => (
  <div className="app">
    <CommentTree comments={comments} />
  </div>
);

export default App;
