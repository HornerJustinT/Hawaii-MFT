import React, { Component} from 'react';
import firebase from "../../Firebase";
//used to connect the component to the reducer
import { connect } from 'react-redux';
import "./profileCreate.css"


//React-bootstrap import
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UploadModal from "../UploadModal/UploadModal";
var storage = firebase.storage().ref();

class ProfileCreate extends Component {
    //create a state 
    state = {
        prefix:'',
      first_name:'',
      last_name:'',
        age:'',
        hiamft_member_account_info:'',
      language_id:'',
      prefixError:'',
      firstNameError:'',
      lastNameError:'',
      languageError:'',
      ageError:'',
      memberError:'',
      profilePhoto:'',
     }
    
//when the document is ready it will fetch all the languages
//from which users can choose the languages they speak
componentDidMount(){
 this.getLanguages()

}

//take in the information from the input
//when users either choose options from drop down or put info into the input
//the state is changed when there are input data
    handleInputChangeFor = propertyName => (event) =>{

        this.setState({
          [propertyName]:event.target.value
        });
      } 




      handleMultiLanguages = (event, editPropertyName) => {
        const array = [];
        for (let option of event.target.selectedOptions) {
          array.push(Number(option.value));
        }
        // this.handleLangChange(event, "languagesEdit")
        this.setState({
          [editPropertyName]: array,
        });
      };
//reset the inputs once the value has been submitted
      handleReset = () =>{
          this.setState({
            prefix:'',
            first_name:'',
            last_name:'',
            age:'',
            hiamft_member_account_info:'',
            language_id:'',
          })
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

      validate = () => {
        let prefixError = '';
        let firstNameError = '';
        let lastNameError = '';
        let languageError = '';
        let ageError = '';
        let memberError ='';
        let formIsValid = true;

        if(this.state.prefix === ''){
          formIsValid=false;
          prefixError = 'Prefix is required'
        }else if(!this.state.prefix.match(/^[a-zA-Z_]+$/) ){
            formIsValid=false;
          prefixError = "Prefix is invalid" 
        }

        if(this.state.first_name === ''){
          formIsValid=false;
          firstNameError = 'First Name is required'
        }else if(!this.state.first_name.match(/^[a-zA-Z_]+$/) ){
            formIsValid=false;
            firstNameError = "First Name is invalid"
        }

        if(this.state.last_name === ''){
          formIsValid=false;
          lastNameError = 'Last Name is required'
        }else if(!this.state.last_name.match(/^[a-zA-Z_]+$/) ){
            formIsValid=false;
            lastNameError = "Last Name is invalid"
        }


        if(this.state.language_id === ''){
          formIsValid=false;
          languageError  = 'Language is required, choose at least one language! '
        }
      
        if(this.state.age === ''){
          formIsValid=false;
          ageError= 'Age is required! '
        }else if(!isNaN(this.state.age)===false ){
            formIsValid=false;
            ageError= "Age input is invalid"
        }

 
        if(this.state.hiamft_member_account_info === ''){
          formIsValid=false;
          memberError = 'About me section is required!'   
        }
        
        if(prefixError || firstNameError || lastNameError || languageError || ageError || memberError){
          this.setState({prefixError, firstNameError, lastNameError, languageError, ageError, memberError});
        
        }else{
          return true;
        }

      }
      
//upload all the inputs into the members table
//this will send all the profile info from createProfile page into SET_CREATE_PROFILE reducer
//once they are sent to the reducer, the data can then be retrievied in practiceInfo
//where it will be bunched up all together with all other inputs from other pages
//it then gets dispatch as an action for post request to the server
    addMembers = (event) =>{
     event.preventDefault();
     const isValid = this.validate();

    if(!isValid){
      return false
      }else{
        this.props.dispatch({
              type:'ADD_CREATE_PROFILE',
              payload:{
                  prefix:this.state.prefix,
                  first_name:this.state.first_name,
                  last_name:this.state.last_name,
                  age:this.state.age,
                  hiamft_member_account_info:this.state.hiamft_member_account_info,
                  language_id:this.state.language_id
              }
        });

        this.props.history.push("/contact-info");
        return true;
      }
    }

   
    //get the languges
    getLanguages = () =>{
        this.props.dispatch({
            type:'FETCH_LANGUAGES'});
           
    }
     handleNext = (event) => {
        event.preventDefault ()
       
    
    }
    render (){
      return (
        <>
          <div className="container">
            <header>
              {" "}
              <h1 className="text-center">Create New Profile</h1>
            </header>

            <br />

            <ProgressBar now={25} />
            <div className="text-center">
              <h3 className="subtitle">Basic Info</h3>
            </div>
            <UploadModal refresh = {this.getImage} name={this.props.user}></UploadModal>
            <img className = "photo" src={this.state.profilePhoto}></img>
            <Form onSubmit={this.addMembers}>
              <div className="inputs">
                <div className="box-1">
                  <div className="container-box">
                    <div className="label-container">
                      <Form.Label>Prefix</Form.Label>
                    </div>
                    <div className="container-input">
                      <Form.Control
                        type="text"
                        name="prefix"
                        value={this.state.prefix}
                        onChange={this.handleInputChangeFor("prefix")}
                      />
                      <h4 className="error">{this.state.prefixError}</h4>
                    </div>
                  </div>

                  <div className="container-box">
                    <div className="label-container">
                      <Form.Label>Age</Form.Label>
                    </div>
                    <div className="container-input">
                      <Form.Control
                        type="text"
                        name="age"
                        value={this.state.age}
                        onChange={this.handleInputChangeFor("age")}
                      />
                      <h4 className="error">{this.state.ageError}</h4>
                    </div>
                  </div>
                  <div className="container-box">
                    <div className="label-container">
                      <Form.Label>Language</Form.Label>
                    </div>
                    <div className="container-input">
                      <Form.Control
                        as="select"
                        multiple={true}
                        onChange={(event) =>
                          this.handleMultiLanguages(event, "language_id")
                        }
                      >
                        {this.props.languages && (
                          <>
                            <option defaultValue="Select a language">
                              Select a language
                            </option>
                            {this.props.languages.map((language) => (
                              <option
                                value={language.language_id}
                                key={language.language_id}
                              >
                                {language.title}
                              </option>
                            ))}
                          </>
                        )}
                      </Form.Control>{" "}
                      <h4 className="error">{this.state.languageError}</h4>
                    </div>
                  </div>
                </div>
                <div className="box-2">
                  <div className="container-box">
                    <div className="label-container">
                      <Form.Label>First Name</Form.Label>
                    </div>
                    <div className="container-input">
                      <Form.Control
                        type="text"
                        name="first_name"
                        value={this.state.first_name}
                        onChange={this.handleInputChangeFor("first_name")}
                      />
                      <h4 className="error">{this.state.firstNameError}</h4>
                    </div>
                  </div>

                  <div className="container-box">
                    <div className="label-container">
                      <Form.Label>Last Name</Form.Label>
                    </div>
                    <div className="container-input">
                      {" "}
                      <Form.Control
                        type="text"
                        name="last_name"
                        value={this.state.last_name}
                        onChange={this.handleInputChangeFor("last_name")}
                      />
                      <h4 className="error">{this.state.lastNameError}</h4>
                    </div>
                  </div>

                  <div className="container-box">
                    <div className="label-container">
                      {" "}
                      <Form.Label>About You</Form.Label>
                    </div>
                    <div className="container-input">
                      <Form.Control
                        as="textarea"
                        type="text"
                        name="hiamft_member_account_info"
                        value={this.state.hiamft_member_account_info}
                        onChange={this.handleInputChangeFor(
                          "hiamft_member_account_info"
                        )}
                      />
                      <h4 className="error">{this.state.memberError}</h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="next-button">
                <Button type="submit">Next</Button>
              </div>
            </Form>
          </div>
        </>
      );
    }
}
const mapStateToProps = reduxstate => ({
    reduxstate,
    languages: reduxstate.languages,
    user: reduxstate.user
  });

export default connect(mapStateToProps)(ProfileCreate);