import React from 'react';
import RootCommentTree from '../containers/RootCommentTree';
import AuthenticationGate from '../containers/AuthenticationGate';
import LoginForm from '../containers/LoginForm';
import RootCommentForm from '../containers/RootCommentForm';

const App = () => (
  <div className="app">
    <AuthenticationGate component={LoginForm}>
      <RootCommentForm maxTextLength={140} />
    </AuthenticationGate>
    <RootCommentTree />
  </div>
);

export default App;
