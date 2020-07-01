import React, { Component} from 'react';
import firebase from "../../Firebase";
//used to connect the component to the reducer
import { connect } from 'react-redux';

import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UploadModal from "../UploadModal/UploadModal";
var storage = firebase.storage().ref();

class uploadImage extends Component {
    render (){
        return(

          <>



          </>
        )
    }
}

export default uploadImage;