import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import "../App/App.css";


class LoginPage extends Component {
  state = {
    username: '',
    complete: false,
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username) {
      this.props.dispatch({
        type: 'FORGOT_PASSWORD',
        payload: {
          username: this.state.username,
        },
        props: this.props
      });
    }

    this.setState({
      complete: true
    })
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };//end handleInputChangeFor

  render() {
    if (this.state.complete){
      return (
        <div className="text-center">
          <br/>
          <h1>Check your email</h1>
          <p>Please check your SPAM folder. An email was sent to the email associated with the username you entered.</p>
        </div>
      );
    } else {
      return (
        <div className="passwordForm">
          {this.props.errors.loginMessage && (
            <h2 className="alert" role="alert">
              {this.props.errors.loginMessage}
            </h2>
          )}
          <Form onSubmit={this.login} >
            <h2>Forgot Password</h2>

            <Form.Group>
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                className="input"
                value={this.state.username}
                onChange={this.handleInputChangeFor("username")}
              />
            </Form.Group>


            <Button
              className="log-in input"
              type="submit"
              name="submit"
              value="Send Email"
            >
              Send Email
            </Button>
          </Form>
        </div>
      );
    }
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
