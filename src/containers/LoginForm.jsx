import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
    }
  }

  handleChange(value) {
    const username = value.trim();
    this.setState({
      username,
    });
  }

  handleSubmit() {
    this.props.login(this.state.username);
  }

  render() {
    return (
      <div className="login-form">
        <input
          value={this.state.username}
          placeholder="Username"
          onChange={(e) => this.handleChange(e.target.value)}
        />
        <button onClick={() => this.handleSubmit()}>
          Login
        </button>
      </div>
    );
  }
}

export default connect(
  () => ({}),
  {login},
)(LoginForm);
