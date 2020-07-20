import React, { Component} from 'react';
import firebase from "../../Firebase";
//used to connect the component to the reducer
import { connect } from 'react-redux';
import "./profileCreate.css"
import "../App/App.css";


import { Prompt } from 'react-router'


//React-bootstrap import
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import UploadModal from "../UploadModal/UploadModal";
import Col from 'react-bootstrap/Col';
var storage = firebase.storage().ref();

class ProfileCreate extends Component {
    //create a state 
    state = {
      prefix:'',
      first_name:'',
      last_name:'',
      age:'',
      statement:'',
      language_id:'',
      prefixError:'',
      firstNameError:'',
      lastNameError:'',
      languageError:'',
      ageError:'',
      memberError:'',
      shouldBlockNavigation : true,
     }
    
//when the document is ready it will fetch all the languages
//from which users can choose the languages they speak
componentDidMount(){
 this.getLanguages()
 console.log("user that will be added", this.props.saveUserReducer);

}
componentDidUpdate = () => {
  if (this.state.shouldBlockNavigation) {
    window.onbeforeunload = () => true
  } else {
    window.onbeforeunload = undefined
  }
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
            statement:'',
            language_id:'',
          })
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
          prefixError = 'Prefix is required.'
        }else if(!this.state.prefix.match(/^[\.a-zA-Z_]+$/) ){
            formIsValid=false;
          prefixError = "Prefix input is invalid." 
        }

        if(this.state.first_name === ''){
          formIsValid=false;
          firstNameError = 'First Name is required.'
        }else if(!this.state.first_name.match(/^[a-zA-Z_]+$/) ){
            formIsValid=false;
            firstNameError = "First Name input is invalid."
        }

        if(this.state.last_name === ''){
          formIsValid=false;
          lastNameError = 'Last Name is required.'
        }else if(!this.state.last_name.match(/^[a-zA-Z_]+$/) ){
            formIsValid=false;
            lastNameError = "Last Name input is invalid."
        }


        if(this.state.language_id === ''){
          formIsValid=false;
          languageError  = 'Language is required, choose at least one language.'
        }
      
        if(this.state.age === ''){
          formIsValid=false;
          ageError= 'Age is required.'
        }else if(!isNaN(this.state.age)===false ){
            formIsValid=false;
            ageError= "Age input is invalid."
        }

 
        if(this.state.statement === ''){
          formIsValid=false;
          memberError = 'Personal Statement is required.'   
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
                  statement:this.state.statement,
                  language_id:this.state.language_id
              }
        });
        this.setState({shouldBlockNavigation:false}, (e)=>{
          this.props.history.push("/contact-info");
        });
        return true;
      }
    }

   
    //get the languges
    getLanguages = () =>{
        this.props.dispatch({
            type:'FETCH_LANGUAGES'});
           
    }
    handleStudent =(e)=>{
      this.setState({
        showStudentProfile: !this.state.showStudentProfile
      })
    }
    
    render (){
      console.log("user that will be added", this.props.saveUserReducer);
      return (
        <>
          <div>
            <Prompt
              when={this.state.shouldBlockNavigation}
              message="You have unsaved changes. Are you sure you want to leave?"
            />
          </div>

          <div className="container">
            <header>
              <h1 className="text-center">Create New Profile</h1>
            </header>
            <div className="progressbar">
              {" "}
              <ProgressBar now={25} />
            </div>

            <div className="text-center">
              <h3 className="subtitle">Basic Info</h3>
            </div>
            <Form onSubmit={this.addMembers}>
              <Form className="flex-container row-wrap row">
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Prefix</Form.Label>
                    <FormControl
                      type="text"
                      name="prefix"
                      value={this.state.prefix}
                      onChange={this.handleInputChangeFor("prefix")}
                      className="prefix"
                    />
                    <Form.Text className="text-muted">
                      Do not use special characters or punctuation.
                    </Form.Text>
                    <h4 className="error">{this.state.prefixError}</h4>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>First Name</Form.Label>
                    <FormControl
                      type="text"
                      name="first_name"
                      value={this.state.first_name}
                      onChange={this.handleInputChangeFor("first_name")}
                    />
                    <h4 className="error">{this.state.firstNameError}</h4>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Last Name</Form.Label>
                    <FormControl
                      type="text"
                      name="last_name"
                      value={this.state.last_name}
                      onChange={this.handleInputChangeFor("last_name")}
                    />
                    <h4 className="error">{this.state.lastNameError}</h4>
                  </Form.Group>
                </Form.Row>
              </Form>
              <Form className="flex-container row-wrap row">
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="text"
                      name="age"
                      value={this.state.age}
                      onChange={this.handleInputChangeFor("age")}
                    />
                    <Form.Text className="text-muted">
                      Not Listed (for HIAMFT-use only)
                    </Form.Text>
                    <h4 className="error">{this.state.ageError}</h4>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Language</Form.Label>
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
                    </Form.Control>
                    <Form.Text className="text-muted">
                      To select multiple on Mac: press & hold Command key. To
                      select multiple on PC, press & hold CTRL.
                    </Form.Text>
                    <h4 className="error">{this.state.languageError}</h4>
                  </Form.Group>
                </Form.Row>
              </Form>
              <Form className="flex-container row-wrap row">
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Personal Statement</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="5"
                      type="text"
                      name="statement"
                      value={this.state.statement}
                      onChange={this.handleInputChangeFor("statement")}
                    />
                    <Form.Text className="text-muted">
                      Please tell us a bit about yourself and your practice. You
                      will be able to edit this section later. This will be
                      publicly visible in the directory. Limit 10,000
                      characters.
                    </Form.Text>
                    <h4 className="error">{this.state.memberError}</h4>
                  </Form.Group>
                </Form.Row>
              </Form>
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
    user: reduxstate.user,
    saveUserReducer: reduxstate.saveUserReducer
  });

export default connect(mapStateToProps)(ProfileCreate);