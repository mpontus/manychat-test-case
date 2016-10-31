import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import Chance from 'chance';
import reducer from './reducers';
import {setComments, addComment} from './actions';
import * as api from './api';
import App from './components/App';
import {generateAvatarUrl} from './utils/avatar';
import './stylesheets/main.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, {
  currentUser: {
    username: "Evgeniy Korzun",
    avatarUrl: generateAvatarUrl("Evgeniy Korzun"),
  },
  comments: [],
}, composeEnhancers(applyMiddleware(thunk)));


const pollComments = (since) => {
  setTimeout(() => api.pollComments(since).then(comments => {
    comments.forEach(comment => store.dispatch(addComment(comment)));
    pollComments(Date.now());
  }), 1000);
}

api.fetchComments()
  .then(comments => {
    store.dispatch(setComments(comments))
//    pollComments(Date.now());
  });

const fakeCommentLoop = (() => {
  const flatten = (tree, fn) =>
    tree.reduce((acc, cur) => [...acc, cur, ...flatten(fn(cur), fn)], []);

  const randomInt = (max) => Math.floor(Math.random() * max);

  const chance = new Chance();

  return () => {
    setTimeout(() => {
      api.fetchComments().then(comments => {
        const flatComments = flatten(comments, c => c.replies || []);
        const parentIndex = randomInt(flatComments.length - 1) + 1;
        const parentId = parentIndex ? flatComments[parentIndex - 1].id : null;
        const username = chance.name();
        api.createComment({
          username: username,
          avatarUrl: generateAvatarUrl(username),
        }, chance.sentence(), parentId).then(() => fakeCommentLoop());
      });
    }, 1000);
  }
})();

fakeCommentLoop();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
