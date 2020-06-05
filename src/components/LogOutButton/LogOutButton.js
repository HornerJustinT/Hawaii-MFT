//This component imported into NavBootstrap

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import NavDropdown from "react-bootstrap/NavDropdown";


class LogOutButton extends Component{
  handleClick = () => {
    this.props.dispatch({ type: 'LOGOUT' });
    this.props.history.push('/home')
  }

  render() {
    return (
        <NavDropdown.Item onClick={() => this.handleClick()}>Logout</NavDropdown.Item>
    );
  } 
}

export default withRouter(connect()(LogOutButton));
