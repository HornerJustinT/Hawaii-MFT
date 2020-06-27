import React, { Component } from "react";
import { connect } from "react-redux";

class RegisterPage extends Component {
  state = {
    username: "",
    password: "",
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
        type: "REGISTER",
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
          <form onSubmit={this.registerUser} className="form">
            <h1>Register User</h1>
            <div>
              <label htmlFor="username">
                Username:
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  className="input"
                  onChange={this.handleInputChangeFor("username")}
                />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                Password:
                <input
                  type="password"
                  name="password"
                  className="input"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor("password")}
                />
              </label>
            </div>
            <div>
              <input
                className="register input"
                type="submit"
                name="submit"
                value="Register"
              />
            </div>
          </form>
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
