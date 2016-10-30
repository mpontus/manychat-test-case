import React from 'react';
import RootCommentTree from '../containers/RootCommentTree';
import RootCommentForm from '../containers/RootCommentForm';

const App = () => (
  <div className="app">
    <RootCommentForm maxTextLength={140} />
    <RootCommentTree />
  </div>
);

export default App;
