import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import reducer, {
  getCommentsSync,
  isPollingComments,
} from './reducers';
import { fetchComments, pollComments } from './actions';
import * as api from './api';
import App from './components/App';
import { generateAvatarUrl } from './utils/avatar';
import { ConfigurationProvider } from './utils/configuration';
import * as fake from './utils/fake';
import './stylesheets/main.scss';

const POLLING_INTERVAL = 1000;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, {
  currentUser: {
    username: "Evgeniy Korzun",
    avatarUrl: generateAvatarUrl("Evgeniy Korzun"),
  },
}, composeEnhancers(applyMiddleware(thunk)));

store.dispatch(fetchComments());

const pollingLoop = (interval) => {
  const state = store.getState();
  const commentsSync = getCommentsSync(state);
  const pollingComments = isPollingComments(state);

  if (!commentsSync || pollingComments) {
    return setTimeout(() => pollingLoop(interval), interval);
  }

  const timeleft = commentsSync + interval - Date.now();
  if (timeleft > 0) {
    return setTimeout(() => pollingLoop(interval), timeleft);
  }

  store.dispatch(pollComments());
  setTimeout(() => pollingLoop(interval), interval);
};

pollingLoop(POLLING_INTERVAL);

setTimeout(fake.createRandomComment, 1000);
setInterval(fake.createRandomReply, 2000);
setInterval(fake.deleteRandomComment, 4000);
setInterval(fake.createRandomComment, 6000);

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
