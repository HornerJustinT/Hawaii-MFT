import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


class LogOutButton extends Component{
  handleClick = () => {
    this.props.dispatch({ type: 'LOGOUT' });
    this.props.history.push('/home')
  }

  render() {
    return (
        <button
        onClick={() => this.handleClick()}
        >
        Log Out
      </button>
    );
  } 
}

export default withRouter(connect()(LogOutButton));
