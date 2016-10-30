import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import App from './components/App';
import {generateAvatarUrl} from './utils/avatar';
import './stylesheets/main.scss';

const timeNow = Date.now();

const store = createStore(reducer, {
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
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);


