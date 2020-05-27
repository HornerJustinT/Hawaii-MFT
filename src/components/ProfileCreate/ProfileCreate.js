import React, { Component} from 'react';
import {HashRouter as Router, Route  } from 'react-router-dom';
import ContactInfo from './ContactInfo/ContactInfo';
import PracticeInfo from './PracticeInfo/PracticeInfo';
import uploadImage from './UploadImage/UploadImage';
import ProfileReview from './ProfileReview/ProfileReview';



class ProfileCreate extends Component {
    
    
     handleNext = (event) => {
        event.preventDefault ()
        this.props.history.push('/contact')
    
    }
    render (){
        return (
            <>
            <div className='container'>
         <header><h1>Create Profile</h1></header>
         <br/>
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