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
    const { username } = this.state;
    return (
      <div className="login-form">
        <input
          value={username}
          placeholder="Username"
          onChange={(e) => this.handleChange(e.target.value)}
        />
        <button
          disabled={username === ""}
          onClick={() => this.handleSubmit()}>
          Sign In
        </button>
      </div>
    );
  }
}

export default connect(
  () => ({}),
  {login},
)(LoginForm);
