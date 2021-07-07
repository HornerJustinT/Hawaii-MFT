import React, { Component } from "react";

//React-bootstrap imports
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";

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
    console.log(this.props)
    this.setState({
      show: true,
      message: `Hello, 
      ${this.props.profile.first_name} ${this.props.profile.last_name} is a colleague of mine I think they would be a great fit for you! Below is their contact info.
      Best wishes!\n\nContact Info:\nWebsite: ${this.props.profile.website}\nPhone Number: ${this.props.profile.phone}\nBusiness Address: ${this.props.profile.address}`,
        
    });
  };

  handleClose = () => {
    this.props.dispatch({
      type: "SEND_EMAIL",
      payload: {
        recipients: this.state.recipients,
        header: "HAIMFT Directory Therapist Recomendation",
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
                  rows="10"
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

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(EmailModal);
