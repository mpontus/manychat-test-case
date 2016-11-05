import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import reducer from './reducers';
import { setComments, addComment } from './actions';
import * as api from './api';
import App from './components/App';
import { generateAvatarUrl } from './utils/avatar';
import { ConfigurationProvider } from './utils/configuration';
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
    comments.forEach(comment => store.dispatch(addComment(comment)));
    pollComments(Date.now());
  }), 1000);
}

api.pollComments()
  .then(comments => {
    comments.forEach(comment => store.dispatch(addComment(comment, comment.parentId)));
    pollComments(Date.now());
  });

fakeCommentLoop(4000);

const settings = {
  maxCommentLength: 280,
  maxVisibleCommentLength: 140,
  maxThreadDepth: 3,
};

ReactDOM.render(
  <IntlProvider locale="en">
    <Provider store={store}>
      <ConfigurationProvider settings={settings}>
        <App />
      </ConfigurationProvider>
    </Provider>
  </IntlProvider>,
  document.getElementById('app')
);
