import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, FormControl, Alert } from "react-bootstrap";

class Homepage extends Component {
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
    this.props.Homepage(this.state.email, this.state.password);
  }
  render() {
    return (
      <div className="Homepage">
      <h1>Welcome in BlockChain IMS</h1>
      
      </div>
    );
  }
}

Homepage.propTypes = {
  Homepage: PropTypes.func,
  isError: PropTypes.bool
};
export default Homepage;
