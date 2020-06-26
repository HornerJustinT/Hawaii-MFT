import React, { Component} from 'react';
//used to connect the component to the reducer
import { connect } from 'react-redux';
import "./profileCreate.css"

//React-bootstrap import
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { number } from 'prop-types';

// const formValid = formErrors =>{
//   let valid = true;
//   Object.values(formerrors).forEach(val =>{
//     val.length > 0 && (valid=false);
//   });
//   return valid
// }


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

      validate = () =>{
      let prefixError = '';
  let firstNameError = '';
  let lastNameError = '';
  let languageError = '';
  let ageError = '';
  let memberError ='';
  let formIsValid = true;

  if(!this.state.prefix){
    formIsValid=false;
     prefixError = 'Prefix is required'
  }
  if(this.state.prefix.length > 3 || 
    typeof(this.state.prefix) === 'number'||'symbol' ){
      formIsValid=false;
     prefixError = "Prefix is invalid or it is longer than 3"
     
  }
   
  //   if(this.state.first_name.includes('')){
  //     firstNameError = 'Input is empty, First Name is required'
  //  }
  //  if(this.state.first_name.length < 3 || this.state.first_name.value === number){

  //  }
    
  //    if(this.state.last_name.includes('')){
  //     lastNameError = 'Input is empty, Last Name is required'
  //  }
     
  //    if(!this.state.language_id){
  //     languageError = 'Language is not selected, Choose at least one language'
  //  }
    
  //    if(this.state.age.includes('')){
  //     ageError = 'Input is empty, Fill in your Age'
  //  }
    
  //    if(this.state.hiamft_member_account_info.includes('')){
  //     memberError = 'Input is empty, Fill in the about me section'
  //  }
   if(prefixError || firstNameError || lastNameError || languageError || ageError || memberError){
    this.setState({prefixError, firstNameError, lastNameError, languageError, ageError, memberError});
   
   }
    return true;
      }
      
//upload all the inputs into the members table
//this will send all the profile info from createProfile page into SET_CREATE_PROFILE reducer
//once they are sent to the reducer, the data can then be retrievied in practiceInfo
//where it will be bunched up all together with all other inputs from other pages
//it then gets dispatch as an action for post request to the server
    addMembers = (event) =>{
     event.preventDefault();
     const isValid = this.validate();
 if(isValid){
   console.log(this.state)
 }
    //  this.props.dispatch({
    //      type:'ADD_CREATE_PROFILE',
    //      payload:{
    //         prefix:this.state.prefix,
    //         first_name:this.state.first_name,
    //         last_name:this.state.last_name,
    //         age:this.state.age,
    //         hiamft_member_account_info:this.state.hiamft_member_account_info,
    //         language_id:this.state.language_id
    //      }
    //  });
    // this.handleReset();
    // this.props.history.push('/contact-info');
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
          <div className='header'><header>
              <h1>Create New Profile</h1>
            </header></div>  
            <br />

            <ProgressBar now={25} />
               <div><h3>Basic Info</h3></div> 
            <Form  onSubmit={this.addMembers}>
            
           <div className='container-box'>
            <div className='label-container'><Form.Label>Prefix</Form.Label></div>
            <div className='container-input'><input
                type="text"
                name="prefix"
                value={this.state.prefix}
                onChange={this.handleInputChangeFor("prefix")}
              /><h4 className='error'>{this.state.prefixError}</h4></div></div>
            
              <div className='container-box'>
                <div className='label-container'><Form.Label>First Name</Form.Label></div>  
             <div className='container-input'><input
                type="text"
                name="first_name"
                value={this.state.first_name}
                onChange={this.handleInputChangeFor("first_name")}
              /><h4 className='error'>{this.state.firstNameError}</h4></div></div>
            
            <div className='container-box'>
              <div className='label-container'><Form.Label>Last Name</Form.Label></div>
            <div className='container-input'> <input
                type="text"
                name="last_name"
                value={this.state.last_name}
                onChange={this.handleInputChangeFor("last_name")}
              /><h4 className='error'>{this.state.lastNameError}</h4></div></div>
            <div className='container-box'>
            <div className='label-container'><Form.Label>Age</Form.Label></div> 
              <div className='container-input'><input
                type="text"
                name="age"
                value={this.state.age}
                onChange={this.handleInputChangeFor("age")}
              /><h4 className='error'>{this.state.ageError}</h4></div>
            </div>
    
            <div className='container-box'>
            <div className='label-container'> <Form.Label>Language Spoken</Form.Label></div>
            <div className='container-input'><select
                multiple="true"
                onChange={(event) =>
                  this.handleMultiLanguages(event,"language_id")
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
              </select> <h4 className='error'>{this.state.languageError}</h4></div>

            </div>
            
             <div className='container-box'>
             <div className='label-container'> <Form.Label>About You</Form.Label></div>
             <div className='container-input'><textarea
                type="text"
                name="hiamft_member_account_info"
                value={this.state.hiamft_member_account_info}
                onChange={this.handleInputChangeFor(
                  "hiamft_member_account_info"
                )}
              /><h4 className='error'>{this.state.memberError}</h4></div>
             </div>

             
            
            
              
               <div>
                 <Button className="save" type="submit">
                Next
              </Button></div>
              
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