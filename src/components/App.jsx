import React from 'react';
import RootCommentTree from '../containers/RootCommentTree';
import RootCommentForm from '../containers/RootCommentForm';

const App = () => (
  <div className="app">
    <RootCommentTree />
    <RootCommentForm maxTextLength={140} />
  </div>
);

export default App;
