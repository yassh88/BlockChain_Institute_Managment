import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, FormControl, Alert } from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.login(this.state.email, this.state.password);
  }
  render() {
    return (
      <div className="Login">
      <form onSubmit={this.handleSubmit}  >
        <FormGroup controlId="email" >
          <label>Email</label>
          <FormControl
            autoFocus
            type="input"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" >
          <label>Password</label>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        {this.props.isError &&
        <Alert key={123} variant='danger'>
          Please enter correct credentials.
        </Alert>
        }
        <Button
          block
          disabled={!this.validateForm()}
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
  isError: PropTypes.bool
};
export default Login;
