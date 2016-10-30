import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './reducers';
import {fetchComments, pollComments} from './actions';
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

// store.dispatch(fetchComments());
store.dispatch(pollComments());
store.dispatch(pollComments());
store.dispatch(pollComments());
// setTimeout(() => {
// }, 1000);

// setInterval(() => store.dispatch(pollComments()), 1000);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);


