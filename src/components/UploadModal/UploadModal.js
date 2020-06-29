import React, { useState } from "react";

//React-bootstrap imports
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
//FireBase
import { storage } from "../../Firebase";

function RegistrationModal(props) {
  const [show, setShow] = useState(false);
  const [sImage, setImage] = useState('')
  const [progress,setProgress] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUpload = (event) => {
    console.log(sImage)
    const image = sImage
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress)
      },
      (error) => {
        //error function
        console.log(error);
      },
      () => {
        //complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            this.setState({ url });
          });
      }
    );
  };
  // let handleChange = (uploadedImage) =>{
  //   console.log('in handle change')
  //   stateImage = uploadedImage;
  //   console.log(uploadedImage)
  //   console.log(props)
    
  // }
  // const updateProgress = (progress)=>{
  //   stateProgress = progress
  // }
  // const saveImage = () =>{
  //   console.log('in save image')
  // }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Upload A Profile Picture
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload An Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type = "file" onChange={ e => setImage(e.target.files[0]) }></input>
          <progress value={0} max="100" />
          <button onClick={handleUpload}>Upload</button>
          {/* <button onClick={}>Save Image</button> */}
        </Modal.Body>
        <div></div>
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps)(RegistrationModal);
