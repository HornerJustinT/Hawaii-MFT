import React, {  useState  } from 'react';

//React-bootstrap imports
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


function EmailModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Send Referral Email
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Send Referral Email for Jane Rain</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Recipient's Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBriefMessage">
                            <Form.Label>Brief Message</Form.Label>
                            <Form.Control type="input" 
                            as="textarea" rows="10"
                            placeholder="Hi Emily,
                            Jane Rain is a colleague of mine who is also on O'ahu and I think she'd be a great fit for you. 
                            Below is her contact info.
                            Best wishes!"
                            />
                        <Form.Control 
                            rows="5"
                            plaintext 
                            readOnly 
                            defaultValue="Jane Rain
                                jane@familytherapy.com
                                806-123-4567

                                123 Dreamhouse Lane
                                Kailua, Hawaii
                            " />
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

export default EmailModal;