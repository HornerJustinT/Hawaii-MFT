import React, { useState } from "react";

//React-bootstrap imports
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";

function RegistrationModal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const registerNewUser = () => {
        //generating random registration key
        let registration_key = Math.floor(Math.random() * 10000000000);

        //sending key to saga
        props.dispatch({ type: "CREATE_REGISTRATION_KEY", payload: registration_key });
        return registration_key;
    }


    console.log(props);
    return (
        <>
            <Button variant="primary" onClick={handleShow} >
                Register New User
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Registration Link</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Here is your unique registration link. Please copy and paste this now. You will not be able to retrieve it.
                </Modal.Body>
                <Modal.Body>
                    localhost:3000/#/create-profile/{registerNewUser()}
                </Modal.Body>                
            </Modal>
        </>
    );
}
const mapStateToProps = (state) => ({
    profile: state.profile,
});
export default connect(mapStateToProps)(RegistrationModal);
