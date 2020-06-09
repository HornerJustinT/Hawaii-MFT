import React, { useState } from "react";

//React-bootstrap imports
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";

function EmailModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(props);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Send Referral Email
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send Referral Email for {props.profile.first_name} {props.profile.last_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Recipient's Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBriefMessage">
              <Form.Label>Brief Message</Form.Label>
              <Form.Control
                type="input"
                as="textarea"
                rows="10"
                placeholder={`Hello, 
${props.profile.first_name} ${props.profile.last_name} is a colleague of mine I think she'd be a great fit for you! Below is her contact info.
Best wishes!`}
              />
              <Form.Control
                rows="5"
                plaintext
                readOnly
                defaultValue={`${props.profile.website} ${props.profile.phone} ${props.profile.address}
                             `}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleClose}>
              Send Email
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps)(EmailModal);
