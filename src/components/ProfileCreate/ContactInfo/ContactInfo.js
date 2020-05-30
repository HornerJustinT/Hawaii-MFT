import React,{ Component } from 'react';

//React-bootstrap import
import ProgressBar from 'react-bootstrap/ProgressBar';
import { connect } from 'react-redux';


class ContactInfo extends Component{
// create the state
           state = {
            phone_type_id:'',
            title:'',
            number:'',
            island_id:'',
            title:'',
            email:'',
            address:'',
            languages:''
           }
    handleBack = (event) => {
        event.preventDefault()
        this.props.history.push('/create-profile')
    }

    handleSave = (event) => {
        event.preventDefault()
       
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

    render (){
        return(
            <>
            <div className='container'>
            <header><h1>Contact Info</h1></header>
             <br/>
            <ProgressBar now={50} />

             <label>Island</label>
             <br/>
             <select>
                 <option defaultValue='Select your Island'>Select your Island</option>
             </select>
             <br/>
             <br/>
             <label>Phone Number</label>
             <br/>
             <input type="number"
                  name="number"
                  value={this.state.age}
                  onChange={this.handleInputChangeFor("number")}/>
             <br/>
             <label>Email Address</label>
             <br/>
             <input type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChangeFor("email")}/>
             <br/>
             <label>Email Address</label>
             <br/>
             <input type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChangeFor("email")}/>
             <br/>
             <label>Website</label>
             <br/>
             <input type="text"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleInputChangeFor("address")}/>
             <br/>
             <label>Address</label>
             <br/>
             <input type="text"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleInputChangeFor("address")}/>
             <br/>
             <label>Address</label>
             <br/>
             <input type="text"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleInputChangeFor("address")}/>
             <br/>
             <label>Address</label>
             <br/>
             <input type="text"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleInputChangeFor("address")}/>
             <br/>
             <br/>
            <button onClick={this.handleBack}>Back</button>
            <button onClick={this.handleSave}>Save</button>
            <button onClick={this.handleNext}>Next Page</button>

            </div>
           

            </>
        )
    }

}
const mapStateToProps = state => ({
    state 
  });
export default connect (mapStateToProps)(ContactInfo);