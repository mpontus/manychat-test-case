import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './reducers';
import {fetchComments} from './actions';
import App from './components/App';
import {generateAvatarUrl} from './utils/avatar';
import './stylesheets/main.scss';

const store = createStore(reducer, {
  currentUser: {
    username: "Evgeniy Korzun",
    avatarUrl: generateAvatarUrl("Evgeniy Korzun"),
  },
  comments: [],
}, applyMiddleware(thunk));

store.dispatch(fetchComments());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);


