import React, { Component} from 'react';
//used to connect the component to the reducer
import { connect } from 'react-redux';

//React-bootstrap import
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";




class ProfileCreate extends Component {

    //create a state 
    state = {
    prefix:'',
	first_name:'',
	last_name:'',
    age:'',
    hiamft_member_account_info:'',
	language_id:''
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
            language_id:''
          })
      }

      
//upload all the inputs into the members table
//this will send all the profile info from createProfile page into SET_CREATE_PROFILE reducer
//once they are sent to the reducer, the data can then be retrievied in practiceInfo
//where it will be bunched up all together with all other inputs from other pages
//it then gets dispatch as an action for post request to the server
    addMembers = (event) =>{
     event.preventDefault();
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
    this.handleReset();
    this.props.history.push('/contact-info');
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
              <h1>Create New Profile</h1>
            </header>
            <br />

            <ProgressBar now={25} />
            <Form onSubmit={this.addMembers}>
              <h3>Basic Info</h3>
              <label>Prefix</label>
              <br />
              <input
                type="text"
                name="prefix"
                value={this.state.prefix}
                onChange={this.handleInputChangeFor("prefix")}
              />
              <br />
              <Form.Label>First Name</Form.Label>
              <br />
              <input
                type="text"
                name="first_name"
                value={this.state.first_name}
                onChange={this.handleInputChangeFor("first_name")}
              />
              <br />
              <Form.Label>Last Name</Form.Label>
              <br />
              <input
                type="text"
                name="last_name"
                value={this.state.last_name}
                onChange={this.handleInputChangeFor("last_name")}
              />
              <br />
              <Form.Label>Age</Form.Label>
              <br />
              <input
                type="text"
                name="age"
                value={this.state.age}
                onChange={this.handleInputChangeFor("age")}
              />
              <br />
              <br />
              <Form.Label>Language Spoken</Form.Label>
              <br />
              <select
                multiple="true"
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
              </select>
              <br />
              <br />
              <br />
              <br />
              <Form.Label>About You</Form.Label>
              <br />
              <textarea
                type="text"
                name="hiamft_member_account_info"
                value={this.state.hiamft_member_account_info}
                onChange={this.handleInputChangeFor(
                  "hiamft_member_account_info"
                )}
              />
              <br />
              <Button className="save" type="submit">
                Next
              </Button>
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