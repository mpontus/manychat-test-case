import React from 'react';
import RootCommentTree from '../containers/RootCommentTree';
import PreloaderGate from '../containers/PreloaderGate';
import LoadingScreen from './LoadingScreen';
import AuthenticationGate from '../containers/AuthenticationGate';
import LoginForm from '../containers/LoginForm';
import ReplyForm from '../containers/ReplyForm';

const App = () => (
  <div className="app">
    <PreloaderGate placeholder={<LoadingScreen />}>
      <AuthenticationGate component={LoginForm}>
        <ReplyForm parent={null} />
      </AuthenticationGate>
      <RootCommentTree />
    </PreloaderGate>
  </div>
);

export default App;
