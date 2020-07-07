import React,{ Component } from 'react';
import { Prompt } from 'react-router'
//this connects the the component to the redux store
import { connect } from 'react-redux';

//React-bootstrap import
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//CSS import
// import "../profileCreate.css";




class studentContact extends Component{
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
      

      validateStudent = () =>{
        let personalEmailError ='';
        let formIsValid = true;

        if(this.state.personal_email === ''){
          formIsValid=false;
          personalEmailError = 'Personal Email is required'
        }else if(!this.state.personal_email.includes('@') ){
            formIsValid=false;
            personalEmailError = "Personal Email is not valid"
        }

        if(personalEmailError){
          this.setState({personalEmailError})
        }else{
          return true;
        }

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
               || businessNumberError|| zipCodeError || islandError || business_zipCodeError){
            this.setState({cityError, addressHomeError, addressOfficeError, 
                personalEmailError,  emailError,  personalNumberError, 
               businessNumberError, zipCodeError,  islandError, businessCityError, business_zipCodeError});
          
          }else{
            return true;
          }
  
        }

studentContactInfo = (e) =>{
  e.preventDefault();

  const isValid = this.validateStudent();
  if(!isValid){
     return false
     }else{
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
                    this.props.history.push("/student-practice");
                  });
       return true;
     }
 
 
}

     
   
    render (){
        return(
            <>
              <div>
                          <Prompt
        when={this.state.shouldBlockNavigation}
        message='You have unsaved changes, are you sure you want to leave?'
      />

        </div>
            <div className='container'>
            <header><h1 className="text-center">Contact Info</h1></header>
            <ProgressBar now={50} />
            <Form onSubmit={this.studentContactInfo}>
             <br/>
        
             <Form.Label>Island</Form.Label>
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
             <Form.Label>Zip Code</Form.Label>
             <br/>
             <Form.Control type="number"
                  name="zip_code"
                  placeholder='Please fill your zip code'
                  value={this.state.zip_code}
                  onChange={this.handleInputChangeFor("zip_code")}/>
                  <h4 className="error">{this.state.zipCodeError}</h4>
             <br/>
             <Form.Label>Phone Number - Personal</Form.Label>
             <br/>
             <Form.Control type="number"
                  name="personal_number"
                  placeholder='Please fill in your personal phone number'
                  value={this.state.personal_number}
                  onChange={this.handleInputChangeFor("personal_number")}/>
                  <h4 className="error">{this.state.personalNumberError}</h4>
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
             <Form.Label>Website</Form.Label>
             <br/>
             <Form.Control type="text"
                  name="website"
                  placeholder='Please fill in your website'
                  value={this.state.website}
                  onChange={this.handleInputChangeFor("website")}/>
                  <h4 className="error">{this.state.websiteError}</h4>
             <br/>
             <Form.Label>Address - Home</Form.Label>
             <br/>
             <Form.Control type="text"
                  name="address_home"
                  placeholder='Please fill in your home address'
                  value={this.state.address_home}
                  onChange={this.handleInputChangeFor("address_home")}/>
                  <h4 className="error">{this.state.addressHomeError}</h4>
             <br/>
             <Form.Label>City</Form.Label>
             <br/>
             <Form.Control type="text"
                  name="city"
                  placeholder='Please fill in your city name'
                  value={this.state.city}
                  onChange={this.handleInputChangeFor("city")}/>
                  <h4 className="error">{this.state.cityError}</h4>
             <br/>
             <br/>
            
           <Button type="submit">Next</Button>
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
export default connect (mapStateToProps)(studentContact);