import React,{ Component } from 'react';
import { Prompt } from 'react-router'
//this connects the the component to the redux store
import { connect } from 'react-redux';


//React-bootstrap import
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//CSS import
import  "./profileCreate.css"




class ContactInfo extends Component{
// create the state
           state = {
            island_id:'',
            zip_code:'',
            business_zip_code:'',
            business_number:'',
            personal_number:'',
            email:'',
            personal_email:'',
            website:'',
            address_office:'',
            address_home:'',
            city:'',
            cityOfBussiness:'',
            showStudentProfile: false,
            islandError:'',
            zipCodeError:'',
            business_zipCodeError:'',
            businessNumberError:'',
            personalNumberError:'',
            emailError:'',
            personalEmailError:'',
            websiteError:'',
            addressOfficeError:'',
            addressHomeError:'',
            addressMailingError:'',
            cityError:'',
            shouldBlockNavigation : true,
           }

           componentDidMount (){
//when the document is ready it will fetch all the options for islands
            this.props.dispatch({
                type:'FETCH_ISLANDS'
            })
            console.log(this.state)
           }
//take in the information from the input
//when users either choose options from drop down or put info into the input
//the state is changed when there are input data
componentDidUpdate = () => {
     if (this.state.shouldBlockNavigation) {
       window.onbeforeunload = () => true
     } else {
       window.onbeforeunload = undefined
     }
   }
    handleInputChangeFor = propertyName => (event) =>{
        this.setState({
          [propertyName]:event.target.value
        })
      } 
      

     

      validate = () => {
          let islandError = '';
           let zipCodeError = '';
           let business_zipCodeError='';
           let  businessNumberError = '';
            let personalNumberError = '';
            let emailError = '';
            let personalEmailError ='';
           let addressOfficeError ='';
            let addressHomeError = '';
            let cityError = '';
            let businessCityError ='';
            let websiteError = '';
          let formIsValid = true;
  

          if(this.state.city === ''){
            formIsValid=false;
            cityError = 'City - Home is required'
          }else if(!this.state.city.match(/^[a-zA-Z_]+$/) ){
              formIsValid=false;
              cityError = "City - Home is invalid" 
          }
          if(this.state.city_business === ''){
               formIsValid=false;
               businessCityError = 'City - Business is required'
             }else if(!this.state.cityOfBussiness.match(/^[a-zA-Z_]+$/) ){
                 formIsValid=false;
                 businessCityError = "City - Business is invalid" 
             }


          if(this.state.address_home=== ''){
               formIsValid=false;
               addressHomeError = 'Home Address is required'
          }
          if(this.state.website === ''){
            formIsValid=false;
            websiteError = 'Website address is required'
          }

          if(this.state.address_office === ''){
               formIsValid=false;
               addressOfficeError = 'Office Address is required'
          }
        
          if(this.state.personal_email === ''){
            formIsValid=false;
            personalEmailError = 'Personal Email is required'
          }else if(!this.state.personal_email.includes('@') ){
              formIsValid=false;
              personalEmailError = "Personal Email is not valid"
          }
          if(this.state.email === ''){
               formIsValid=false;
               emailError = 'Business Email is required'
          }else if(!this.state.email.includes('@') ){
                 formIsValid=false;
                 emailError = "Business Email is not valid"
             }
          if(this.state.personal_number === ''){
               formIsValid=false;
               personalNumberError = 'Personal Number is required'
             }

          if(this.state.business_number === ''){
               formIsValid=false;
               businessNumberError = 'Business Number is required'
             }
        
          if(this.state.zip_code === ''){
            formIsValid=false;
            zipCodeError = 'Personal Zip Code is required! '
          }else if(!isNaN(this.state.zip_code)===false ){
              formIsValid = false;
              zipCodeError = "Personal Zip code is invalid"
          }

          if(this.state.business_zip_code === ''){
               formIsValid=false;
               business_zipCodeError = 'Business Zip Code is required! '
             }else if(!isNaN(this.state.zip_code)===false ){
                 formIsValid = false;
                 business_zipCodeError = "Business Zip code is invalid"
             }

          if(this.state.island_id === ''){
               formIsValid=false;
              islandError = 'Island Name is required! '
          }
  
          if(cityError || businessCityError || addressHomeError || addressOfficeError 
              || personalEmailError || emailError ||  personalNumberError 
               || businessNumberError|| zipCodeError || islandError || business_zipCodeError || websiteError){
            this.setState({cityError, addressHomeError, addressOfficeError, 
                personalEmailError,  emailError,  personalNumberError, 
               businessNumberError, zipCodeError,  islandError, businessCityError, business_zipCodeError, websiteError});
          
          }else{
            return true;
          }
  
        }

      addContactInfo = (event) =>{
//this will send all the contact info from contactinfo page into SET_ADDRESS reducer
//once they are sent to the reducer, the data can then be retrievied in practiceInfo
//where it will be bunched up all together with all other inputs from other pages
//it will then gets used to dispatch an action for post request to the server
          event.preventDefault();
          const isValid = this.validate();
          if(!isValid){
               return false
               }else{
                    this.props.dispatch({type:'ADD_ADDRESS', 
                    payload:{island_id: this.state.island_id, 
                              email: this.state.email,
                              personal_email:this.state.personal_email,
                              business_number:this.state.business_number,
                              personal_number:this.state.personal_number,
                              address_office:this.state.address_office,
                              address_home:this.state.address_home,
                              zip_code: this.state.zip_code,
                              business_zip_code: this.state.business_zip_code,
                              city: this.state.city,
                              cityOfBusiness: this.state.cityOfBussiness,
                              website: this.state.website
                         }});
                         this.setState({shouldBlockNavigation:false},()=>{
                              this.props.history.push("/practice");
                            });
               }
 }

studentContactInfo = (e) =>{
  e.preventDefault();

  // const isValid = this.validateStudent();
  // if(!isValid){
    //  return false
    //  }else{
          this.props.dispatch({
               type: 'ADD_ADDRESS',
               payload:{
                 island_id: this.state.island_id, 
                 email: this.state.email,
                 personal_email:this.state.personal_email,
                 personal_number:this.state.personal_number,
                 address_home:this.state.address_home,
                 address_mailing:this.state.address_mailing,
                 zip_code: this.state.zip_code,
                 city: this.state.city,
                 website: this.state.website
               }});
               this.setState({shouldBlockNavigation:false},()=>{
                    this.props.history.push("/student");
                  });
      //  return true;
    //  }
 
 
}

     handleStudent =(e)=>{
       this.setState({
         showStudentProfile: !this.state.showStudentProfile
       })
     }
   
    render (){

        return(
            <>
            <div className='container'>
            <header><h1 className="text-center">Contact Info</h1></header>
            <ProgressBar now={50} />
              

 
            <div>
                          <Prompt
        when={this.state.shouldBlockNavigation}
        message='You have unsaved changes, are you sure you want to leave?'
      />

        </div>
                   <Form onSubmit={this.addContactInfo}>
                <br/>
             <label>Island*</label>
             <br/>
             <Form.Control
                 as="select" onChange={this.handleInputChangeFor("island_id")}>
             {this.props.islands &&
                   
                   <>
                   <option defaultValue='Select your Island'>Select your Island</option>
                   {this.props.islands.map(island =>
                    <option value={island.island_id}
        
                  key={island.island_id}>{island.title}</option>
                    )}
                   </>
                   } 
             </Form.Control>
             <h4 className="error">{this.state.islandError}</h4>
             <br/>
             <br/>
             <Form.Label>Zip Code - Personal*</Form.Label>
             <br/>
             <Form.Control type="number"
                  name="zip_code"
                  placeholder='Please fill in your Zip code'
                  value={this.state.zip_code}
                  onChange={this.handleInputChangeFor("zip_code")}/>
                   <h4 className="error">{this.state.zipCodeError}</h4>
                <br/>
                <Form.Label>Zip Code - Business*</Form.Label>
             <br/>
             <Form.Control type="number"
                  name="zip_code"
                  placeholder='Please fill in your Zip code'
                  value={this.state.business_zip_code}
                  onChange={this.handleInputChangeFor("business_zip_code")}/>
                   <h4 className="error">{this.state.business_zipCodeError}</h4>
             <Form.Label>Phone Number - Business*</Form.Label>
             <br/>
             <Form.Control type="number"
                  name="business_number"
                  placeholder='Please fill in your business phone number'
                  value={this.state.business_number}
                  onChange={this.handleInputChangeFor("business_number")}/>
                   <h4 className="error">{this.state.businessNumberError}</h4>
             <br/>
             <br/>
             <Form.Label>Phone Number - Personal*</Form.Label>
             <br/>
             <Form.Control type="number"
                  name="personal_number"
                  placeholder='Please fill in your personal phone number'
                  value={this.state.personal_number}
                  onChange={this.handleInputChangeFor("personal_number")}/>
                   <h4 className="error">{this.state.personalNumberError}</h4>
                <br/>
             <Form.Label>Email Address - Business*</Form.Label>
             <br/>
             <Form.Control type="text"
                  name="email"
                  placeholder='Please fill in your business email address'
                  value={this.state.email}
                  onChange={this.handleInputChangeFor("email")}/>
                   <h4 className="error">{this.state.emailError}</h4>
             <br/>
             <Form.Label>Email Address - Personal*</Form.Label>
             <br/>
             <Form.Control type="text"
                  name="personal_email"
                  placeholder='Please fill in your personal email address'
                  value={this.state.personal_email}
                  onChange={this.handleInputChangeFor("personal_email")}/>
                   <h4 className="error">{this.state.personalEmailError}</h4>
             <br/>
             <Form.Label>Website*</Form.Label>
             <br/>
             <Form.Control type="text"
                  name="website"
                  placeholder='Please fill in your website'
                  value={this.state.website}
                  onChange={this.handleInputChangeFor("website")}/>
                   <h4 className="error">{this.state.websiteError}</h4>
             <br/>
             <Form.Label>Address - Office*</Form.Label>
             <br/>
             <Form.Control type="text"
                  name="address_office"
                  placeholder='Please fill in your office address'
                  value={this.state.address_office}
                  onChange={this.handleInputChangeFor("address_office")}/>
                   <h4 className="error">{this.state.addressOfficeError}</h4>
             <br/>
             <Form.Label>Address - Home*</Form.Label>
             <br/>
             <Form.Control type="text"
                  name="address_home"
                  placeholder='Please fill in your home address'
                  value={this.state.address_home}
                  onChange={this.handleInputChangeFor("address_home")}/>
                   <h4 className="error">{this.state.addressHomeError}</h4>
             <br/>
             <Form.Label>City - Personal*</Form.Label>
             <br/>
             <Form.Control type="text"
                  name="city"
                  placeholder='Please fill in your city'
                  value={this.state.city}
                  onChange={this.handleInputChangeFor("city")}/>
                   <h4 className="error">{this.state.cityError}</h4>
             <br/>
             <Form.Label>City - Business*</Form.Label>
             <br/>
             <Form.Control type="text"
                  name="city"
                  placeholder='Please fill in your city'
                  value={this.state.cityOfBussiness}
                  onChange={this.handleInputChangeFor("cityOfBussiness")}/>
                  <h4 className="error">{this.state.businessCityError}</h4>
             <br/>
            

             <div  className="next-button">
                  <Button type="submit">Next</Button>
                  </div>

            </Form>
            </div>
           

            </>
        )
    }

}
const mapStateToProps = reduxstate => ({
    reduxstate,
    islands: reduxstate.islands,
    user: reduxstate.user
  });
export default connect (mapStateToProps)(ContactInfo);