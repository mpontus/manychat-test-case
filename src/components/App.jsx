import React from 'react';
import RootCommentTree from '../containers/RootCommentTree';
import LoginOrCommentForm from '../containers/LoginOrCommentForm';

const App = () => (
  <div className="app">
    <LoginOrCommentForm maxTextLength={140} />
    <RootCommentTree />
  </div>
);

export default App;
