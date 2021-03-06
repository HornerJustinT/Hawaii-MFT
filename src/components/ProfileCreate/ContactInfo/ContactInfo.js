import React,{ Component } from 'react';
//this connects the the component to the redux store
import { connect } from 'react-redux';

//React-bootstrap import
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";




class ContactInfo extends Component{
// create the state
           state = {
            island_id:'',
            zip_code:'',
            business_number:'',
            personal_number:'',
            email:'',
            personal_email:'',
            website:'',
            address_office:'',
            address_home:'',
            address_mailing:'',
            city:'',
            showStudentProfile: false
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
    handleInputChangeFor = propertyName => (event) =>{
        this.setState({
          [propertyName]:event.target.value
        })
      } 

     
      addContactInfo = (event) =>{
//this will send all the contact info from contactinfo page into SET_ADDRESS reducer
//once they are sent to the reducer, the data can then be retrievied in practiceInfo
//where it will be bunched up all together with all other inputs from other pages
//it will then gets used to dispatch an action for post request to the server
          event.preventDefault();
          this.props.dispatch({type:'ADD_ADDRESS', 
                              payload:{island_id: this.state.island_id, 
                                        email: this.state.email,
                                        personal_email:this.state.personal_email,
                                        business_number:this.state.business_number,
                                        personal_number:this.state.personal_number,
                                        address_office:this.state.address_office,
                                        address_home:this.state.address_home,
                                        address_mailing:this.state.address_mailing,
                                        zip_code: this.state.zip_code,
                                        city: this.state.city,
                                        website: this.state.website
          }});
          this.props.history.push('/practice');               
     }

studentContactInfo = (e) =>{
  e.preventDefault();
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
  this.props.history.push('/student'); 
}

     handleStudent =(e)=>{
       e.preventDefault();
       this.setState({
         showStudentProfile: !this.state.showStudentProfile
       })
     }
   
    render (){
      let itemToRender;
       if(this.state.showStudentProfile){
        itemToRender = <div>
           
           <Form onSubmit={this.studentContactInfo}>
             <br/>
             <Form.Check
              type="switch"
              id="custom-switch"
              label="Are you a Student?"
              className="switch"
              onChange={this.handleStudent}
            />
                <br/>
             <label>Island</label>
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
             <br/>
             <br/>
             <Form.Label>Zip Code</Form.Label>
             <br/>
             <input type="number"
                  name="zip_code"
                  value={this.state.zip_code}
                  onChange={this.handleInputChangeFor("zip_code")}/>
                <br/>
             <br/>
             <Form.Label>Phone Number - Personal</Form.Label>
             <br/>
             <input type="number"
                  name="personal_number"
                  value={this.state.personal_number}
                  onChange={this.handleInputChangeFor("personal_number")}/>
                <br/>
             <Form.Label>Email Address - Personal</Form.Label>
             <br/>
             <input type="text"
                  name="personal_email"
                  value={this.state.personal_email}
                  onChange={this.handleInputChangeFor("personal_email")}/>
             <br/>
             <Form.Label>Website</Form.Label>
             <br/>
             <input type="text"
                  name="website"
                  value={this.state.website}
                  onChange={this.handleInputChangeFor("website")}/>
             <br/>

             <Form.Label>Address - Home</Form.Label>
             <br/>
             <input type="text"
                  name="address_home"
                  value={this.state.address_home}
                  onChange={this.handleInputChangeFor("address_home")}/>
             <br/>
             <Form.Label>Address - Mailing</Form.Label>
             <br/>
             <input type="text"
                  name="address_mailing"
                  value={this.state.address_mailing}
                  onChange={this.handleInputChangeFor("address_mailing")}/>
             <br/>
             <br/>
             <Form.Label>City</Form.Label>
             <br/>
             <input type="text"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleInputChangeFor("city")}/>
             <br/>
             <br/>
            
           <Button type="submit">Next</Button>
            </Form>

            
        </div>
       }else{
         itemToRender = <div>
                   <Form onSubmit={this.addContactInfo}>
             <br/>
             <Form.Check
              type="switch"
              id="custom-switch"
              label="Are you a Student?"
              className="switch"
              onChange={this.handleStudent}
            />
                <br/>
             <label>Island</label>
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
             <br/>
             <br/>
             <Form.Label>Zip Code</Form.Label>
             <br/>
             <input type="number"
                  name="zip_code"
                  value={this.state.zip_code}
                  onChange={this.handleInputChangeFor("zip_code")}/>
                <br/>
             <Form.Label>Phone Number - Business</Form.Label>
             <br/>
             <input type="number"
                  name="business_number"
                  value={this.state.business_number}
                  onChange={this.handleInputChangeFor("business_number")}/>
             <br/>
             <br/>
             <Form.Label>Phone Number - Personal</Form.Label>
             <br/>
             <input type="number"
                  name="personal_number"
                  value={this.state.personal_number}
                  onChange={this.handleInputChangeFor("personal_number")}/>
                <br/>
             <Form.Label>Email Address - Business</Form.Label>
             <br/>
             <input type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChangeFor("email")}/>
             <br/>
             <Form.Label>Email Address - Personal</Form.Label>
             <br/>
             <input type="text"
                  name="personal_email"
                  value={this.state.personal_email}
                  onChange={this.handleInputChangeFor("personal_email")}/>
             <br/>
             <Form.Label>Website</Form.Label>
             <br/>
             <input type="text"
                  name="website"
                  value={this.state.website}
                  onChange={this.handleInputChangeFor("website")}/>
             <br/>
             <Form.Label>Address - Office</Form.Label>
             <br/>
             <input type="text"
                  name="address_office"
                  value={this.state.address_office}
                  onChange={this.handleInputChangeFor("address_office")}/>
             <br/>
             <Form.Label>Address - Home</Form.Label>
             <br/>
             <input type="text"
                  name="address_home"
                  value={this.state.address_home}
                  onChange={this.handleInputChangeFor("address_home")}/>
             <br/>
             <Form.Label>Address - Mailing</Form.Label>
             <br/>
             <input type="text"
                  name="address_mailing"
                  value={this.state.address_mailing}
                  onChange={this.handleInputChangeFor("address_mailing")}/>
             <br/>
             <br/>
             <Form.Label>City</Form.Label>
             <br/>
             <input type="text"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleInputChangeFor("city")}/>
             <br/>
             <br/>
            
           <Button type="submit">Next</Button>
            </Form>
         </div>
       }
      
        return(
            <>
            <div className='container'>
            <header><h1>Contact Info</h1></header>
             <br/>
            <ProgressBar now={50} />
              {itemToRender}
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