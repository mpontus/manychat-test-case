import React from 'react';
import RootCommentTree from '../containers/RootCommentTree';
import AuthenticationGate from '../containers/AuthenticationGate';
import LoginForm from '../containers/LoginForm';
import RootCommentForm from '../containers/ReplyForm';

const App = () => (
  <div className="app">
    <AuthenticationGate component={LoginForm}>
      <RootCommentForm />
    </AuthenticationGate>
    <RootCommentTree />
  </div>
);

export default App;
