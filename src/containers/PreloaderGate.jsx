import React from 'react';
import { connect } from 'react-redux';
import { isRetrievingComments } from '../reducers';

const PreloaderGate = ({ placeholder, children, bypass }) =>
  bypass ? <div>{children}</div> : placeholder;

PreloaderGate.propTypes = {
  placeholder: React.PropTypes.node.isRequired,
  children: React.PropTypes.arrayOf(React.PropTypes.node).isRequired,
  bypass: React.PropTypes.bool.isRequired,
};

export default connect(
  state => ({ bypass: !isRetrievingComments(state) }),
)(PreloaderGate);
