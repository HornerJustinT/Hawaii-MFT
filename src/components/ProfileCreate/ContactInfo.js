import React,{ Component } from 'react';
import { Prompt } from 'react-router'
//this connects the the component to the redux store
import { connect } from 'react-redux';


//React-bootstrap import
import ProgressBar from 'react-bootstrap/ProgressBar';
import Col from 'react-bootstrap/Col';
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
            cityError = 'City is required.'
          }else if(!this.state.city.match(/^[a-zA-Z_]+$/) ){
              formIsValid=false;
              cityError = "City input is invalid." 
          }
          if(this.state.city_business === ''){
               formIsValid=false;
               businessCityError = 'City is required.'
             }else if(!this.state.cityOfBussiness.match(/^[a-zA-Z_]+$/) ){
                 formIsValid=false;
                 businessCityError = "City input is invalid." 
             }

          if(this.state.address_home=== ''){
               formIsValid=false;
               addressHomeError = 'Street Address - Personal is required.'
          }
          if(this.state.website === ''){
            formIsValid=false;
            websiteError = 'Website is required. Please fill in "N/A" if not applicable.'
          }

          if(this.state.address_office === ''){
               formIsValid=false;
               addressOfficeError = 'Street Address - Business is required.'
          }
        
          if(this.state.personal_email === ''){
            formIsValid=false;
            personalEmailError = 'Email - Personal is required.'
          }else if(!this.state.personal_email.includes('@') ){
              formIsValid=false;
              personalEmailError = "Email - Personal input is not valid."
          }
          if(this.state.email === ''){
               formIsValid=false;
               emailError = 'Email - Business is required.'
          }else if(!this.state.email.includes('@') ){
                 formIsValid=false;
                 emailError = "Email - Business input is not valid."
             }
          if(this.state.personal_number === ''){
               formIsValid=false;
               personalNumberError = 'Phone Number - Personal is required.'
             }

          if(this.state.business_number === ''){
               formIsValid=false;
               businessNumberError = 'Phone Number - Business is required.'
             }
        
          if(this.state.zip_code === ''){
            formIsValid=false;
            zipCodeError = 'Zip Code is required.'
          }else if(!isNaN(this.state.zip_code)===false ){
              formIsValid = false;
              zipCodeError = "Zip Code input is invalid."
          }

          if(this.state.business_zip_code === ''){
               formIsValid=false;
               business_zipCodeError = 'Zip Code is required.'
             }else if(!isNaN(this.state.zip_code)===false ){
                 formIsValid = false;
                 business_zipCodeError = "Zip Code input is invalid."
             }

          if(this.state.island_id === ''){
               formIsValid=false;
              islandError = 'Island is required.'
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

   
    render (){
     return(
            <>
            <div className='container'>
            <header>
              <h1 className="text-center">Contact Info</h1>
            </header>
            <div className='progressbar'> <ProgressBar now={50} /></div>
            <div>
              <Prompt
                when={this.state.shouldBlockNavigation}
                message='You have unsaved changes. Are you sure you want to leave?'
              />
            </div>
            
           <Form onSubmit={this.addContactInfo}>
             <Form.Group as={Col}>
               <Form.Label>Island*</Form.Label>
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
               <Form.Text className="text-muted">Listed</Form.Text>
               <h4 className="error">{this.state.islandError}</h4>
             </Form.Group>
             <Form.Group as={Col}>
               <Form.Label>Phone Number - Business*</Form.Label>
               <Form.Control
                 name="business_number"
                 placeholder='Please fill in your Business Phone Number.'
                 value={this.state.business_number}
                 onChange={this.handleInputChangeFor("business_number")} />
               <Form.Text className="text-muted">Listed - Please enter in this format: (xxx) xxx-xxxx</Form.Text>
               <h4 className="error">{this.state.businessNumberError}</h4>
             </Form.Group>
             <Form.Group as={Col}>
               <Form.Label>Phone Number - Personal*</Form.Label>
               <Form.Control 
                 name="personal_number"
                 placeholder='Please fill in your Personal Phone Number.'
                 value={this.state.personal_number}
                 onChange={this.handleInputChangeFor("personal_number")} />
               <Form.Text className="text-muted">
                 Not Listed (for HIAMFT-use only) - Please enter in
                            this format: (xxx) xxx-xxxx
               </Form.Text>
               <h4 className="error">{this.state.personalNumberError}</h4>
             </Form.Group>
             <Form.Group as={Col}>
               <Form.Label>Email Address - Business*</Form.Label>
               <Form.Control type="text"
                 name="email"
                 placeholder='Please fill in your Business Email Address.'
                 value={this.state.email}
                 onChange={this.handleInputChangeFor("email")} />
               <Form.Text className="text-muted">Listed</Form.Text>
               <h4 className="error">{this.state.emailError}</h4>
             </Form.Group>
             <Form.Group as={Col}>
               <Form.Label>Email Address - Personal*</Form.Label>
               <br />
               <Form.Control type="text"
                 name="personal_email"
                 placeholder='Please fill in your Personal Email Address'
                 value={this.state.personal_email}
                 onChange={this.handleInputChangeFor("personal_email")} />
               <Form.Text className="text-muted">
                 Not Listed (for HIAMFT-use only)
               </Form.Text>
               <h4 className="error">{this.state.personalEmailError}</h4>
             </Form.Group>
             <Form.Group as={Col}>
               <Form.Label>Website*</Form.Label>
               <Form.Control type="text"
                 name="website"
                 placeholder='Please fill in your Website.'
                 value={this.state.website}
                 onChange={this.handleInputChangeFor("website")} />
               <Form.Text className="text-muted">Listed</Form.Text>
               <h4 className="error">{this.state.websiteError}</h4>
             </Form.Group>
 
             <Form className="flex-container row-wrap row">
                 <Form.Group as={Col}>
                   <Form.Label>Street Address - Business*</Form.Label>
                   <Form.Control type="text"
                     name="address_office"
                     placeholder='ex. 321 Grove St.'
                     value={this.state.address_office}
                     onChange={this.handleInputChangeFor("address_office")} />
                   <Form.Text className="text-muted">Listed</Form.Text>
                   <h4 className="error">{this.state.addressOfficeError}</h4>
                 </Form.Group>
                 <Form.Group as={Col}>
                   <Form.Label>City*</Form.Label>
                   <Form.Control type="text"
                     name="city"
                     placeholder='Please fill in your City'
                     value={this.state.cityOfBussiness}
                     onChange={this.handleInputChangeFor("cityOfBussiness")} />
                   <Form.Text className="text-muted">Listed</Form.Text>
                   <h4 className="error">{this.state.businessCityError}</h4>
                 </Form.Group>
                 <Form.Group as={Col}>
                   <Form.Label>Zip Code*</Form.Label>
                   <Form.Control type="number"
                     name="zip_code"
                     placeholder='Please fill in your Zip Code.'
                     value={this.state.business_zip_code}
                     onChange={this.handleInputChangeFor("business_zip_code")} />
                   <Form.Text className="text-muted">Listed</Form.Text>
                   <h4 className="error">{this.state.business_zipCodeError}</h4>
                 </Form.Group>
             </Form>
            <Form className="flex-container row-wrap row">
                 <Form.Group as={Col}>
                   <Form.Label>Street Address - Personal*</Form.Label>
                   <Form.Control type="text"
                     name="address_home"
                     placeholder='ex. 321 Grove St.'
                     value={this.state.address_home}
                     onChange={this.handleInputChangeFor("address_home")} />
                   <Form.Text className="text-muted">
                     Not Listed (for HIAMFT-use only)
                  </Form.Text>
                   <h4 className="error">{this.state.addressHomeError}</h4>
                 </Form.Group>
                <Form.Group as={Col}>
                   <Form.Label>City*</Form.Label>
                   <Form.Control type="text"
                     name="city"
                     placeholder='Please fill in your City'
                     value={this.state.city}
                     onChange={this.handleInputChangeFor("city")} />
                   <Form.Text className="text-muted">
                     Not Listed (for HIAMFT-use only)
                  </Form.Text>
                   <h4 className="error">{this.state.cityError}</h4>
                 </Form.Group>
                <Form.Group as={Col}>
                   <Form.Label>Zip Code*</Form.Label>
                   <Form.Control type="number"
                     name="zip_code"
                     placeholder='Please fill in your Zip Code.'
                     value={this.state.zip_code}
                     onChange={this.handleInputChangeFor("zip_code")} />
                   <Form.Text className="text-muted">
                     Not Listed (for HIAMFT-use only)
                  </Form.Text>
                   <h4 className="error">{this.state.zipCodeError}</h4>
                 </Form.Group>
            </Form>
             
             <div className="next-button">
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