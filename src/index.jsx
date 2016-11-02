import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Chance from 'chance';
import reducer from './reducers';
import { setComments, addComment } from './actions';
import * as api from './api';
import App from './components/App';
import { generateAvatarUrl } from './utils/avatar';
import { createFakeComment, fakeCommentLoop } from './utils/fake';
import './stylesheets/main.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, {
  currentUser: {
    username: "Evgeniy Korzun",
    avatarUrl: generateAvatarUrl("Evgeniy Korzun"),
  },
}, composeEnhancers(applyMiddleware(thunk)));


const pollComments = (since) => {
  setTimeout(() => api.pollComments(since).then(comments => {
    comments.forEach(comment => store.dispatch(addComment(comment, comment.parentId)));
    pollComments(Date.now());
  }), 1000);
}

api.fetchComments()
  .then(comments => {
    store.dispatch(setComments(comments))
    pollComments(Date.now());
  });

window.createFakeComment = createFakeComment;
// fakeCommentLoop();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
