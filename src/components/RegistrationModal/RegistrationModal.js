import React, { Component } from 'react';

//React-bootstrap imports
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
class RegistrationModal extends Component {
    state = { 
        show: false,
        registration_key: null
     }

    handleClose = () => this.setState({show: false});
    handleShow = () => {
        this.setState({
          show: true,
          registration_key: this.registerNewUser(),
        });
    }

    registerNewUser = () => {
        //generating random registration key
        let registration_key = Math.floor(Math.random() * 10000000000);

        //sending key to saga
        this.props.dispatch({ type: "CREATE_REGISTRATION_KEY", payload: registration_key });
        return registration_key;
    }


    render() { 
        return (
          <>
            <Button variant="primary" onClick={this.handleShow}>
              Register New User
            </Button>

            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Registration Link</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Here is your unique registration link. Please copy and paste
                this now. You will not be able to retrieve it.
              </Modal.Body>
              <Modal.Body>
                {window.location.hostname}/#/register/{this.state.registration_key}
              </Modal.Body>
            </Modal>
          </>
        );
    }
}

export default connect()(RegistrationModal);
