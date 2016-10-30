import React from 'react';
import {connect} from 'react-redux';
import RootCommentForm from './RootCommentForm';
import LoginForm from './LoginForm';

const LoginOrCommentForm = ({currentUser, ...commentFormProps}) => {
  if (currentUser) {
    return <RootCommentForm {...commentFormProps} />;
  } else {
    return <LoginForm />;
  }
};

export default connect(
  ({currentUser}) => ({currentUser}),
)(LoginOrCommentForm);
