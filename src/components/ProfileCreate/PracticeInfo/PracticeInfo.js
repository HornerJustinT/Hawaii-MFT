import React,{ Component } from 'react';
import { connect } from 'react-redux';

//React-bootstrap import
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";



class PracticeInfo extends Component{
     //create local state

     state = {
         license_state:'',
         license_number:'',
         license_type:'',
         supervision_status:'',
         fees:'',
         license_expiration:'',
         credentials:'',
         telehealth:'',
         statement:'',
         title:'',
         session_format_id:'',
         client_focus_id:'',
         specialty_id:'',
         treatment_preferences_id:'',
         age_groups_served_id:'',

     }
   
componentDidMount (){
    this.props.dispatch({type:'FETCH_INSURANCE_TAKEN'});
    this.props.dispatch({type:'FETCH_SPECIALTY'});
    this.props.dispatch({type:'FETCH_SUPERVISION_STATUS'});
    this.props.dispatch({type:'FETCH_TREATMENT_APPROACHES'});
    this.props.dispatch({type:'FETCH_LICENSE_TYPE'});
    this.props.dispatch({type:'FETCH_DEMOGRPHICS'});
    this.props.dispatch({type:'FETCH_AGE_GROUPS'});
    this.props.dispatch({type:'FETCH_SESSION_FORMAT'});
    
}

//take in the information from the input
handleInputChangeFor = propertyName => (event) =>{
    this.setState({
      [propertyName]:event.target.value
    });
  } 
    handleBack = (event) => {
        event.preventDefault()
        this.props.history.push('/contact-info')
    }
    
    
    handleNext = (event) => {
        event.preventDefault()
        this.props.history.push(`/edit-profile${this.props.user.id}`)
    }
    
    addMembersInfo = (event) =>{
      event.preventDefault();
        this.props.dispatch({type:'ADD_MEMBER',
         payload:{
          prefix:this.props.createProfile.prefix,
          first_name:this.props.createProfile.first_name,
          last_name:this.props.createProfile.last_name,
          age:this.props.createProfile.age,
          hiamft_member_account_info:this.props.createProfile.hiamft_member_account_info,
          license_state:this.state.license_state,
          supervision_status:this.state.supervision_status,
          fees:this.state.fees,
          license_expiration:this.state.license_expiration,
          license_number:this.state.license_number,
          license_type:this.state.license_type_id,
          credentials:this.state.credentials,
          telehealth:this.state.telehealth,
          statement:this.state.statement,
          title:this.state.title,
          website:this.props.contactAddress.website,
          city:this.props.contactAddress.city,
          zip_code: this.props.contactAddress.zip_code,
          island_id: this.props.contactAddress.island_id,
          email: this.props.contactAddress.email,
          personal_email:this.props.contactAddress.personal_email,
          business_number:this.props.contactAddress.business_number,
          personal_number:this.props.contactAddress.personal_number,
          address_office:this.props.contactAddress.address_office,
          address_home:this.props.contactAddress.address_home,
          address_mailing:this.props.contactAddress.address_mailing,
          session_format_id:this.state.session_format_id,
          client_focus_id:this.state.client_focus_id,
          specialty_id:this.state.specialty_id,
          treatment_preferences_id:this.state.treatment_preferences_id,
          age_groups_served_id:this.state.age_groups_served_id,
          insurance_type_id:this.state.insurance_type_id,
          language_id:this.props.createProfile.language_id
         }
        });
     
     this.handleReset();
    }

  
    handleReset = ()=>{
      this.setState({
        license_state:'',
        license_number:'',
        license_type:'',
        supervision_status:'',
        fees:'',
        license_expiration:'',
        specialty:'',
        credentials:'',
        telehealth:'',
        statement:'',
        title:'',
        session_format_id:'',
        client_focus_id:'',
        specialty_id:'',
        treatment_preferences_id:'',
        age_groups_served_id:'',
        insurance_type_id:'',
      })
    }
    render (){
        return(
            <>
            <div className='container'>
        <header><h1>Practice Info</h1></header>
        <br/>
        <ProgressBar now={75} />
        <br/>
        <Form onSubmit={this.addMembersInfo}>
        <br/>
        <br/>
        <Form.Label>Title </Form.Label><br/><input type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleInputChangeFor("title")}/>
        <br/>
        <br/>
        <Form.Label>Credentials </Form.Label><br/><input type="text"
                  name="title"
                  value={this.state.credentials}
                  onChange={this.handleInputChangeFor("credentials")}/>
        <br/>
        <br/>
        <Form.Label>License Type</Form.Label><br/><Form.Control as="select" onChange={this.handleInputChangeFor("license_type_id")}>
        {this.props.license &&    
                   <>
                   <option value='' defaultValue='Select License Type'>Select License Type</option>
                   {this.props.license.map(licensetype =>
                    <option value={licensetype.license_type_id}
        
                  key={licensetype.license_type_id}>{licensetype.title}</option>
                    )}
                   </>
                   } 
           </Form.Control>
        <br/>
        <br/>
        <button>+</button><label>Add a Field</label>
        <br/>
        <br/>
        <Form.Label>License State of Issue</Form.Label><br/><input type="text"
                  name="license_state"
                  value={this.state.license_state}
                  onChange={this.handleInputChangeFor("license_state")}/>
        <br/>
        <br/>
        <Form.Label>License Number</Form.Label><br/><input type="number"
                  name="license_number"
                  value={this.state.license_number}
                  onChange={this.handleInputChangeFor("license_number")}/>
        <br/>
        <br/>
        <Form.Label>License Expiration Date</Form.Label><br/><input 
                  type='date'
                  name="license_expiration"
                  value={this.state.license_expiration}
                  onChange={this.handleInputChangeFor("license_expiration")}/>
        <br/>
        <br/>
        <Form.Label>Statement</Form.Label><br/><input type="text"
                  name="statement"
                  value={this.state.statement}
                  onChange={this.handleInputChangeFor("statement")}/>
                   <br/>
                   <br/>
        <Form.Label>Fees</Form.Label><br/><input type="text"
                  name="fees"
                  value={this.state.fees}
                  onChange={this.handleInputChangeFor("fees")}/>
                   <br/>
                   <br/>
        <Form.Label>Specialization</Form.Label><br/><select onChange={this.handleInputChangeFor("specialty_id")}>
                {this.props.specialtys &&
                   
                   <>
                  
            <option value='' defaultValue='Select a Speciality'>Select a Speciality</option>
                   {this.props.specialtys.map(specialty =>
                    <option value={specialty.specialty_id}
        
                  key={specialty.specialty_id}>{specialty.title}</option>
                    )}
                   </>
                   } 
            
            </select>
        <br/>
        <br/>
        <button>+</button><label>Add a Field</label>
        <br/>
        <br/>
        <Form.Label>Supervision Status</Form.Label><br/><select onChange={this.handleInputChangeFor("supervision_status")}>
                   <option value="None">None</option>
                   <option value="Hawai'i qualified">Hawai'i qualified</option>
                   <option value="MFT supervisor">MFT supervisor</option>
                   <option value="AAMFT approved">AAMFT approved</option>
                   <option value="Supervisor">Supervisor</option>
           </select>
        <br/>
        <br/>
        <button>+</button><label>Add a Field</label>
        <br/>
        <br/>
        <Form.Label>Insurance Taken</Form.Label><br/><select onChange={this.handleInputChangeFor("insurance_type_id")}>
        {this.props.insuranceTaken &&    
                   <>
                  <option value='' defaultValue='Select Insurance Type'>Select Insurance Type</option>
                   {this.props.insuranceTaken.map(insurance =>
                    <option value={insurance.insurance_type_id}
        
                  key={insurance.insurance_type_id}>{insurance.title}</option>
                    )}
                   </>
                   } 
            </select>
        <br/>
        <br/>
        <button>+</button><label>Add a Field</label>
        <br/>
        <br/>
        <Form.Label>Are you providing telehealth?</Form.Label>
        <br/>
        <label>Yes</label><input 
                              type='radio' 
                              name='choice' 
                              value='yes' 
                              onChange={this.handleInputChangeFor("telehealth")}/>
        <label>No</label><input 
                              type='radio' 
                              name='choice' 
                              value='no'
                              onChange={this.handleInputChangeFor("telehealth")}/>
        <br/>
        <br/>
        <Form.Label>Treatment Approaches/Preferences</Form.Label><br/><select onChange={this.handleInputChangeFor("treatment_preferences_id")}>
        {this.props.treatmentPreferences &&    
                   <>
                <option value='' defaultValue='Select an Approach'>Select an Approach</option>
                   {this.props.treatmentPreferences.map(treatment =>
                    <option value={treatment.treatment_preferences_id}
        
                  key={treatment.treatment_preferences_id}>{treatment.title}</option>
                    )}
                   </>
                   } 
          </select>
        <br/>
        <br/>
        <button>+</button><label>Add a Field</label>
        <br/>
        <br/>
        <Form.Label>Client Focus</Form.Label><br/><select onChange={this.handleInputChangeFor("client_focus_id")}>
        {this.props.demographics &&    
                   <>
               
                <option value='' defaultValue='Select a Demographic'>Select a Demographic</option>
                   {this.props.demographics.map(group =>
                    <option value={group.client_focus_id}
        
                  key={group.client_focus_id}>{group.title}</option>
                    )}
                   </>
                   } 
            </select>
        <select onChange={this.handleInputChangeFor("age_groups_served_id")}>
        {this.props.ageGroups &&    
                   <>
                <option value='' defaultValue='Select an Age Group'>Select an Age Group</option>
                   {this.props.ageGroups.map(agegroup=>
                    <option value={agegroup.age_groups_served_id}
        
                  key={agegroup.age_groups_served_id}>{agegroup.title}</option>
                    )}
                   </>
                   } 
           </select>
        <br/>
        <br/>
        <button>+</button><label>Add a Field</label>
        <button>+</button><label>Add a Field</label>
        <br/>
        <br/>
        <Form.Label>Session Format(s)</Form.Label><br/><select onChange={this.handleInputChangeFor("session_format_id")}>
        {this.props.sessionFormats &&    
                   <>
                 <option value='' defaultValue='Select a Session Format'>Select a Session Format</option>
                   {this.props.sessionFormats.map(session =>
                    <option value={session.session_format_id}
        
                  key={session.session_format_id}>{session.title}</option>
                    )}
                   </>
                   } 
           </select>
        <br/>
        <br/>
        <button>+</button><label>Add a Field</label>
        <br/>
        <br/>
        <Button type="submit">Save</Button>
        </Form>
            
          <Button onClick={this.handleBack}>Back</Button>
          <Button onClick={this.handleNext}>Next</Button>
           
          

            </div>
           
            </>
        )
    }

}

const mapStateToProps = reduxstate => ({
    languages: reduxstate.languages,
    specialtys: reduxstate.specialtys,
    insuranceTaken: reduxstate.insuranceTaken,
    license: reduxstate.license,
    treatmentPreferences:reduxstate.treatmentPreferences,
    demographics:reduxstate.demographics,
    ageGroups:reduxstate.ageGroups,
    sessionFormats:reduxstate.sessionFormats,
    createProfile: reduxstate.createProfile,
    contactAddress: reduxstate.contactAddress,
    user: reduxstate.user
  });
export default connect(mapStateToProps)(PracticeInfo);