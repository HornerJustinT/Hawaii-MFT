import React, { Component} from 'react';
import firebase from "../../../Firebase";
//used to connect the component to the reducer
import { connect } from 'react-redux';

import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./uploadImage.css";
import "../../App/App.css";
import UploadModal from "../../UploadModal/UploadModal";




var storage = firebase.storage().ref();

class uploadImage extends Component {
  state= {
    profilephoto: ''
  }


  componentDidMount(){

  }

  getImage = (id) => {
    console.log(id)
    storage
      .child(`images/${id}photo`)
      .getDownloadURL()
      .then((url) => {
        this.setState({ profilePhoto: url});
      }).then(()=>{
        this.forceUpdate();
      })
      .catch((error) => { // if no photo found
        storage 
          .child(`images/noFile.png`)
          .getDownloadURL()
          .then((url) =>{
            this.setState({profilePhoto:url});
          }).then(()=>{
            this.forceUpdate();
          })
          .catch((error) => {
            console.log('No file found photo also not found')
          })
        // Handle any errors
      });
  }




handleNext = (e) =>{
  e.preventDefault()
  this.props.history.push(`/edit-profile`)
}



    render (){
        return(

          <>
      <div className='container'>     
     <div className="text-center">
      
         <h1 className='header'><header className='uploadImage'>Upload Your Profile Image</header></h1>
         <div className='progressbar'> <ProgressBar now={100} /></div>
         <br/>
         <br/>
              <img className="photo" src={this.state.profilePhoto}></img>
              <div>
                <UploadModal
                  refresh={this.getImage}
                  name={this.props.user}
                  style={{"margin-bottom": "15px"}}
                ></UploadModal>
              </div>
              <div className='toEditView'><Button onClick={this.handleNext}>Next</Button></div>
            
      </div>
      </div>  
      
          </>
        )
    }
}
const mapStateToProps = reduxstate => ({
  reduxstate,
  languages: reduxstate.languages,
  user: reduxstate.user
});

export default connect(mapStateToProps)(uploadImage);
