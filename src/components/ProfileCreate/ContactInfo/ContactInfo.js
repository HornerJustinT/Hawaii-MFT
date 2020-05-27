import React,{ Component } from 'react';

//React-bootstrap import
import ProgressBar from 'react-bootstrap/ProgressBar'


class ContactInfo extends Component{

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
             <input/>
             <br/>
             <label>Email Address</label>
             <br/>
             <input/>
             <br/>
             <label>Email Address</label>
             <br/>
             <input/>
             <br/>
             <label>Website</label>
             <br/>
             <input/>
             <br/>
             <label>Address</label>
             <br/>
             <input/>
             <br/>
             <label>Address</label>
             <br/>
             <input/>
             <br/>
             <label>Address</label>
             <br/>
             <input/>
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
export default ContactInfo;