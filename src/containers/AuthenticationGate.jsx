import React from 'react';
import {connect} from 'react-redux';

const AuthenticationGate = ({component, children, currentUser}) => {
  if (!currentUser) {
    return React.createElement(component);
  }
  return (
    <div>
      {children}
    </div>
  );
}

export default connect(
  ({currentUser}) => ({currentUser}),
)(AuthenticationGate);
