import React, { Component } from "react";

//React-bootstrap imports
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";

import "../App/App.css";
import "./EmailModal.css"


class EmailModal extends Component {
  state = {
    show: false,
    recipients: "",
    message:''};

  modalChange = (event) => {
    this.setState({
      message: event.target.value,
    });
  };

  emailChange = (event) => {
    this.setState({
      recipients: event.target.value,
    });
  };

  handleShow = () => {
    console.log('in handleShow EMAILMODAL', this.state);
    this.setState({
      show: true,
      message: 
      `Hello,\n${this.props.profile.first_name} ${this.props.profile.last_name} is a colleague of mine and I think they would be a great fit for you. Below is their contact information.\nBest wishes!\n[Sign your name]
      \n----------------------\n${this.props.profile.first_name} ${this.props.profile.last_name}, ${this.props.profile.credentials}\n${this.props.profile.website}\n\n${this.props.profile.email}\n${this.props.profile.phone}\n\n${this.props.profile.address}\n${this.props.profile.city}, HI ${this.props.profile.zip_code}`,
        
    });
  };

  handleClose = () => {
    this.props.dispatch({
      type: "SEND_EMAIL",
      payload: {
        recipients: this.state.recipients,
        header: "HIAMFT Directory Therapist Recommendation",
        message: this.state.message,
      },
      closeModal: this.setState({
        show: false,
      }),
    });
    
    
  };

  componentDidMount() {
    console.log("props", this.props);
  }

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Send Referral Email
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Send Referral Email for {this.props.profile.first_name}{" "}
              {this.props.profile.last_name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Recipient's Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={this.emailChange}
                />
              </Form.Group>

              <Form.Group controlId="formBriefMessage">
                <Form.Label>Brief Message</Form.Label>
                <Form.Control
                  type="input"
                  as="textarea"
                  rows="15"
                  value={this.state.message}
                  onChange={this.modalChange}
                />
              </Form.Group>
              <Button variant="primary" onClick={this.handleClose}>
                Send Email
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state, reduxStore) => ({
  profile: state.profile,
  user: reduxStore.userReducer,
});

export default connect(mapStateToProps)(EmailModal);
