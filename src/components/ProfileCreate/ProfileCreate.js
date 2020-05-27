import React, { Component} from 'react';

//React-bootstrap import
import ProgressBar from 'react-bootstrap/ProgressBar'





class ProfileCreate extends Component {
    
    
     handleNext = (event) => {
        event.preventDefault ()
        this.props.history.push('/contact-info')
    
    }
    render (){
        return (
            <>
            <div className='container'>
         <header><h1>Create New Profile</h1></header>
         <br/>

        <ProgressBar now={25} />

         <form>
         <h3>Basic Info</h3>
         <label>Prefix</label>
         <br/>
         <input/><br/>
         <label>First Name</label>
         <br/><input/><br/>
         <label>Last Name</label><br/><input/><br/>
         <label>Age</label><br/><input/>
         <label>Language Spoken</label><br/><select><option value='' defaultValue='Select a language'>Select a language</option></select>
        <br/>
        <br/>
        <button>+</button><label>Add a Field</label>
        <br/>
        <br/>
        <label>About You</label>
        <br/>
        <textarea></textarea>
        <br/>
        <button>Save</button>
        <button onClick={this.handleNext}>Save and Next Page</button>
         </form>
        



            </div>
            </>
        )
    }
}

export default ProfileCreate;