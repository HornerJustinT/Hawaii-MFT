import React, { Component} from 'react';

//React-bootstrap import
import ProgressBar from 'react-bootstrap/ProgressBar'
import { connect } from 'react-redux';





class ProfileCreate extends Component {

    //create a state 
    state = {
    prefix:'',
	first_name:'',
	last_name:'',
    age:'',
    hiamft_member_account_info:'',
	language:''
    }
componentDidMount(){
 this.getLanguages()
}
    //take in the information from the input
    handleInputChangeFor = propertyName => (event) =>{
        this.setState({
          [propertyName]:event.target.value
        });
      } 
      //reset the inputs once the value has been submitted
      handleReset = () =>{
          this.setState({
            prefix:'',
            first_name:'',
            last_name:'',
            age:'',
            hiamft_member_account_info:'',
            language:''
          })
      }

      
    //upload all the inputs into the members table
    addMembers = (event) =>{
     event.preventDefault();
     this.props.dispatch({
         type:'ADD_CREATE_PROFILE',
         payload:{
            prefix:this.state.prefix,
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            age:this.state.age,
            hiamft_member_account_info:this.state.hiamft_member_account_info
         }
     });
     this.addLanguage();
    this.handleReset();
    }

    addLanguage = (event) =>{
        this.props.dispatch({ type:'ADD_LANGUAGE',
        payload:{
            language:this.state.language
        }
    })
    }
    //get the languges
    getLanguages = () =>{
        this.props.dispatch({
            type:'FETCH_LANGUAGES'});
           
    }
     handleNext = (event) => {
        event.preventDefault ()
        this.props.history.push('/contact-info')
    
    }
    render (){
        return (
            <>
            <div className ='container'>
         <header><h1>Create New Profile</h1></header>
         <br/>

        <ProgressBar now={25} />

         <form onSubmit={this.addMembers}>
         <h3>Basic Info</h3>
         <label>Prefix</label>
         <br/>
         <input type="text"
                  name="prefix"
                  value={this.state.prefix}
                  onChange={this.handleInputChangeFor("prefix")}/><br/>
         <label>First Name</label>
         <br/><input type="text"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.handleInputChangeFor("first_name")}/><br/>
         <label>Last Name</label><br/><input type="text"
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.handleInputChangeFor("last_name")}/><br/>
         <label>Age</label><br/><input type="text"
                  name="age"
                  value={this.state.age}
                  onChange={this.handleInputChangeFor("age")}/>
        <br/>
        <br/>
         <label>Language Spoken</label><br/><select onChange={this.handleInputChangeFor("language")}>
                   {this.props.languages &&
                   
                   <>
                   <option defaultValue='Select a language'>Select a language</option>
                   {this.props.languages.map(language =>
                    <option value={language.title}
        
                  key={language.id}>{language.id}{' '}{language.title}</option>
                    )}
                   </>
                   } 
                    </select>
        <br/>
        <br/>
        <button>+</button><label>Add a Field</label>
        <br/>
        <br/>
        <label>About You</label>
        <br/>
        <textarea type="text"
                  name="hiamft_member_account_info"
                  value={this.state.hiamft_member_account_info}
                  onChange={this.handleInputChangeFor("hiamft_member_account_info")}/>
        <br/>
        <button>Save</button>
         </form>
         <button onClick={this.handleNext}>Save and Next Page</button>
            </div>
            </>
        )
    }
}
const mapStateToProps = reduxstate => ({
    reduxstate,
    languages: reduxstate.languages,
  });

export default connect(mapStateToProps)(ProfileCreate);