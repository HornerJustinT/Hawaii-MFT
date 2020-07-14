import React, { Component } from "react";
import { connect } from "react-redux";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "../App/App.css";


class RegisterPage extends Component {
  state = {
    username: "",
    password: "",
    newId: ""
  };
  componentDidMount() {
    console.log(this.props.match.params.id);


    //checks that the registration key exists
    this.props.dispatch({
      type: "CHECK_REGISTRATION_KEY",
      payload: this.props.match.params.id,
    });
    console.log(this.props.reduxstate.registrationKeyValidation);

  }


  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: "SAVE_REGISTER",
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: "REGISTRATION_INPUT_ERROR" });
    }
    this.props.history.push("/create-profile");
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    if (this.props.reduxstate.registrationKeyValidation === "") {
      return <h1>Loading</h1>;
    }
    if (this.props.reduxstate.registrationKeyValidation === false) {
      return (
        <h1>
          You are not allowed to create a registration key please contact the
          admin at Blankety Blank{" "}
        </h1>
      );
    }
    if (this.props.reduxstate.registrationKeyValidation === true) {
      return (
        <div>
          {this.props.errors.registrationMessage && (
            <h2 className="alert" role="alert">
              {this.props.errors.registrationMessage}
            </h2>
          )}
          <Form onSubmit={this.registerUser} className="form">
            <h1>Register User</h1>
            <div>
              <Form.Label htmlFor="username">
                Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={this.state.username}
                  className="input"
                  onChange={this.handleInputChangeFor("username")}
                />
            </div>
            <div>
              <Form.Label htmlFor="password">
                Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  className="input"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor("password")}
                />
            </div>
            <div>
              <Button
                className="register input"
                type="submit"
                name="submit"
                value="Register"
              >Register</Button>
            </div>
          </Form>
          <center></center>
        </div>
      );
    }
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = (reduxstate) => ({
  reduxstate,
  errors: reduxstate.errors,

});

export default connect(mapStateToProps)(RegisterPage);
