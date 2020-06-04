import React,{ Component } from 'react';
import { connect } from 'react-redux';

//React-bootstrap import
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";



class ContactInfo extends Component{
// create the state
           state = {
            phone_type_id:'',
            number:'',
            island_id:'',
            email:'',
            personal_email:'',
            address:'',
            languages:'',
            zip_code:'',
            website:'',
            city:'',
            
           }
/**
  "zip_code" INT,
  
 */
           componentDidMount (){
            this.props.dispatch({
                type:'FETCH_ISLANDS'
            })
           }
    handleBack = (event) => {
        event.preventDefault()
        this.props.history.push('/create-profile')
    }

    handleNext = (event) => {
        event.preventDefault()
        this.props.history.push('/practice')
    }
    handleInputChangeFor = propertyName => (event) =>{
        this.setState({
          [propertyName]:event.target.value
        })
      } 

      handleSave =(event) =>{
        event.preventDefault();
        this.addContactInfo();
       this.addAddress()
      }
      addContactInfo = () =>{
          this.props.dispatch({type:'ADD_CONTACTINFO', 
                                 payload:{island_id: this.state.island_id, 
                                  email: this.state.email,
                                  personal_email:this.state.personal_email
                                           }});
                        
      }
    addAddress = () =>{
      this.props.dispatch({type:'ADD_ADDRESS',
                          payload:{zip_code: this.state.zip_code,
                                       city: this.state.city,
                                        website:this.state.website}})
    }

  
      
    render (){
        return(
            <>
            <div className='container'>
            <header><h1>Contact Info</h1></header>
             <br/>
            <ProgressBar now={50} />
            <Form onSubmit={this.handleSave}>
             <label>Island</label>
             <br/>
             <select onChange={this.handleInputChangeFor("island_id")}>
             {this.props.islands &&
                   
                   <>
                   <option defaultValue='Select your Island'>Select your Island</option>
                   {this.props.islands.map(island =>
                    <option value={island.island_id}
        
                  key={island.island_id}>{island.title}</option>
                    )}
                   </>
                   } 
             </select>
             <br/>
             <br/>
             <label>Zip Code</label>
             <br/>
             <input type="number"
                  name="zip_code"
                  value={this.state.zip_code}
                  onChange={this.handleInputChangeFor("zip_code")}/>
                <br/>
             <label>Phone Number - Business</label>
             <br/>
             <input type="number"
                  name="number"
                  value={this.state.number}
                  onChange={this.handleInputChangeFor("number")}/>
             <br/>
             <br/>
             <label>Phone Number - Personal</label>
             <br/>
             <input type="number"
                  name="number"
                  value={this.state.personal_number}
                  onChange={this.handleInputChangeFor("personal_number")}/>
                <br/>
             <label>Email Address - Business</label>
             <br/>
             <input type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChangeFor("email")}/>
             <br/>
             <label>Email Address - Personal</label>
             <br/>
             <input type="text"
                  name="personal_email"
                  value={this.state.personal_email}
                  onChange={this.handleInputChangeFor("personal_email")}/>
             <br/>
             <label>Website</label>
             <br/>
             <input type="text"
                  name="website"
                  value={this.state.website}
                  onChange={this.handleInputChangeFor("website")}/>
             <br/>
             <label>Address - Office</label>
             <br/>
             <input type="text"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleInputChangeFor("address")}/>
             <br/>
             <label>Address - Home</label>
             <br/>
             <input type="text"
                  name="home_address"
                  value={this.state.home_address}
                  onChange={this.handleInputChangeFor("homeaddress")}/>
             <br/>
             <label>Address - Mailing</label>
             <br/>
             <input type="text"
                  name="mailing_address"
                  value={this.state.mailing_address}
                  onChange={this.handleInputChangeFor("mailing_address")}/>
             <br/>
             <br/>
             <label>City</label>
             <br/>
             <input type="text"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleInputChangeFor("city")}/>
             <br/>
            
           <button>Save</button>
            </Form>
            <button onClick={this.handleBack}>Back</button>
            <button onClick={this.handleNext}>Save and Next Page</button>
           

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