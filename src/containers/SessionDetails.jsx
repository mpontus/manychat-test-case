import React from 'react';
import { connect } from 'react-redux';
import Avatar from '../components/Avatar';
import { logout } from '../actions';

const SessionDetails = ({ user, logout }) => (
  <div className="session-details">
    <Avatar src={user.avatarUrl} title={user.username} />
    <button className="logout-button"
      onClick={logout}>Log Out</button>
  </div>
);

export default connect(
  ({ currentUser }) => ({ user: currentUser }),
  { logout },
)(SessionDetails);
