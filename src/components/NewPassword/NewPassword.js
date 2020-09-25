import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import "../App/App.css";


class LoginPage extends Component {
  state = {
    password: '',
  };

  componentDidMount() {
    this.props.dispatch({
      type: "PASSWORD_VALIDATION",
      payload: {},
    });
    this.props.dispatch({
      type: "CHECK_RESET_KEY",
      payload: this.props.match.params.key,
    });
  }

  submitNewPassword = (event) => {
    event.preventDefault();
    console.log('submit')
    if (this.state.password) {
      this.props.dispatch({
        type: "NEW_PASSWORD",
        payload: {
          password: this.state.password,
          username: this.props.passwordReset.username,
          key: this.props.passwordReset.key,
        },
        props: this.props,
      });
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }//end handleInputChangeFor

  render() {
    if (this.props.passwordReset.username) {
      return (
        <div>
          <Form onSubmit={this.submitNewPassword} className="form">
            <h1>New Password</h1>

            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                className="input"
                value={this.state.password}
                onChange={this.handleInputChangeFor("password")}
              />
            </Form.Group>

            <Button
              className="log-in input"
              type="submit"
              name="submit"
              value="Change Password"
            >
              Change Password
            </Button>
          </Form>
        </div>
      );
    } else {
      return <h1>Loading</h1>;
    }
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = (state) => ({
  passwordReset: state.passwordReset,
});

export default connect(mapStateToProps)(LoginPage);
