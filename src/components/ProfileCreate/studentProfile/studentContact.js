import React,{ Component } from 'react';
import { Prompt } from 'react-router'
//this connects the the component to the redux store
import { connect } from 'react-redux';
import "../profileCreate.css"

//React-bootstrap import
import ProgressBar from 'react-bootstrap/ProgressBar';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//CSS import
import "../profileCreate.css";
import "../../App/App.css";





class studentContact extends Component{
// create the state
           state = {
            island_id:'',
            zip_code_personl:'',
            business_number:'',
            personal_number:'',
            email:'',
            personal_email:'',
            website:'',
            address_home:'',
            city_personal: '',
           //error message input
            islandError:'',
            zipCodeError:'',
            personalNumberError:'',
            emailError:'',
            personalEmailError:'',
            websiteError:'',
            addressOfficeError:'',
            addressHomeError:'',
            cityError:'',
            shouldBlockNavigation : true,
           }

           componentDidMount (){
//when the document is ready it will fetch all the options for islands
            this.props.dispatch({
                type:'FETCH_ISLANDS'
            })
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
            let personalNumberError = '';
            let emailError = '';
            let personalEmailError ='';
            let addressHomeError = '';
            let cityError = '';
            let websiteError ='';
          let formIsValid = true;
  
          
          
          if(this.state.address_home=== ''){
               formIsValid=false;
               addressHomeError = 'Address is required.'
          }
          if(this.state.personal_email === ''){
            formIsValid=false;
            personalEmailError = 'Email is required.'
          }else if(!this.state.personal_email.match(/^[^@]+@[^@]+\.[^@]+$/)){
             formIsValid=false;
              personalEmailError = "Email is invalid."
          }
          if(this.state.personal_number === ''){
               formIsValid=false;
               personalNumberError = 'Phone Number is required.'
             }
             if(this.state.website === ''){
              formIsValid=false;
              websiteError = 'Website is required. Please fill in "N/A" if not applicable.'
            }
          if(this.state.zip_code_personal === ''){
            formIsValid=false;
            zipCodeError = 'Zip Code is required.'
          }else if(!isNaN(this.state.zip_code_personal)===false ){
              formIsValid = false;
              zipCodeError = "Zip Code input is invalid."
          }
          if(this.state.island_id === ''){
               formIsValid=false;
              islandError = 'Island is required.'
          }
  
          if(cityError  || addressHomeError 
              || personalEmailError || emailError ||  personalNumberError 
              || zipCodeError || islandError || websiteError){
            this.setState({cityError, addressHomeError,  
                personalEmailError,  emailError,  personalNumberError, 
                zipCodeError,  islandError, websiteError});
          
          }else{
            return true;
          }
  
        }

studentContactInfo = (e) =>{
  e.preventDefault();
  const isValid = this.validate();

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
                 zip_code_personal: this.state.zip_code_personal,
                 city_personal: this.state.city_personal,
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
        message='You have unsaved changes. Are you sure you want to leave?'
      />

        </div>
            <div className='container'>
            <header>
              {" "}
              <h1 className="text-center">Contact Info</h1>
            </header>
            <div className='progressbar'> <ProgressBar now={50} /></div>
            <Form onSubmit={this.studentContactInfo}>

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
                  <Form.Label>Phone Number*</Form.Label>
                  <Form.Control 
                    name="personal_number"
                    placeholder='Please fill in your Phone Number'
                    value={this.state.personal_number}
                    onChange={this.handleInputChangeFor("personal_number")} />
                  <Form.Text className="text-muted">
                    Not Listed (for HIAMFT-use only) - Please enter in
                               this format: (xxx) xxx-xxxx
               </Form.Text>
                  <h4 className="error">{this.state.personalNumberError}</h4>
                </Form.Group>
              
                <Form.Group as={Col}>
                  <Form.Label>Email Address*</Form.Label>
                  <br />
                  <Form.Control type="text"
                    name="personal_email"
                    placeholder='Please fill in your Email Address'
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
                    placeholder='Please fill in your Website. Ex. www.studentmember.com'
                    value={this.state.website}
                    onChange={this.handleInputChangeFor("website")} />
                  <Form.Text className="text-muted">Listed - Do NOT include HTTPS in url.</Form.Text>
                  <h4 className="error">{this.state.websiteError}</h4>
                </Form.Group>

              
                <Form className="flex-container row-wrap row">
                  <Form.Group as={Col}>
                    <Form.Label>Street Address*</Form.Label>
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
                      name="city_personal"
                      placeholder='Please fill in your City'
                      value={this.state.city_personal}
                      onChange={this.handleInputChangeFor("city_personal")} />
                    <Form.Text className="text-muted">
                      Not Listed (for HIAMFT-use only)
                  </Form.Text>
                    <h4 className="error">{this.state.cityError}</h4>
                  </Form.Group>


                  
                  <Form.Group as={Col}>
                    <Form.Label>Zip Code*</Form.Label>
                    <Form.Control type="number"
                      name="zip_code_personal"
                      placeholder='Please fill in your Zip Code'
                      value={this.state.zip_code_personal}
                      onChange={this.handleInputChangeFor("zip_code_personal")} />
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
export default connect (mapStateToProps)(studentContact);