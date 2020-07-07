import React, { useState, useCallback, useRef, useEffect } from "react";

//React-bootstrap imports
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import ReactCrop from "react-image-crop";
import "../UploadModal/UploadModal.css";
import "react-image-crop/dist/ReactCrop.css";
//FireBase
import { storage } from "../../Firebase";
import ModalHeader from "react-bootstrap/ModalHeader";

const pixelRatio = 2;
function getResizedCanvas(canvas, newWidth, newHeight) {
  const tmpCanvas = document.createElement("canvas");
  tmpCanvas.width = newWidth;
  tmpCanvas.height = newHeight;

  const ctx = tmpCanvas.getContext("2d");
  ctx.drawImage(
    canvas,
    0,
    0,
    canvas.width,
    canvas.height,
    0,
    0,
    newWidth,
    newHeight
  );

  return tmpCanvas;
}
function getCroppedImg(image, crop, fileName) {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        blob.name = fileName;
        resolve(blob);
      },
      "image/jpeg",
      1
    );
  });
}

function RegistrationModal(props) {
  const [show, setShow] = useState(false);
  const [upImg, setUpImg] = useState();
  const [pleaseWait, makePleaseWait] = useState(false);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 10, aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);
  const [progress, setProgress] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);
  const startPromise = () => {
    getCroppedImg(imgRef.current, completedCrop, "dummy").then((result) =>
      handleUpload(result)
    );
  };
  const handleUpload = (image) => {
    console.log(image);
    makePleaseWait(true);
    const uploadTask = storage.ref(`images/${props.name.id}photo`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //error function
        console.log(error);
      },
      () => {
        //complete function
        storage.ref("images").child(image.name);
        props.refresh(props.name.id);
        handleClose();
        makePleaseWait(false);
      }
    );
  };
  if (pleaseWait === true) {
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Upload A Profile Picture
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Please Wait ....</Modal.Title>
          </Modal.Header>
          <Modal.Body></Modal.Body>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Upload A Profile Picture
        </Button>

        <Modal show={show} onHide={handleClose} size='xl' >
          <Modal.Header closeButton>
            <Modal.Title>Upload An Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.File
                  label="Photo Upload"
                  accept="image/*"
                  onChange={onSelectFile}
                />
              </Form.Group>
            </Form>
            <ReactCrop
              src={upImg}
              onImageLoaded={onLoad}
              crop={crop}
              ruleOfThirds
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
            />
            <div>
              <canvas
                ref={previewCanvasRef}
                style={{
                  width: completedCrop?.width ?? 0,
                  height: completedCrop?.height ?? 0,
                }}
              />
            </div>
            <h3>After choosing your file, please crop your profile photo and press upload</h3>
            <Button onClick={startPromise}>Upload</Button>
            {/* <button onClick={}>Save Image</button> */}
          </Modal.Body>
          <div></div>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps)(RegistrationModal);
