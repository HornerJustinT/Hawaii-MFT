import React,{ Component } from 'react';
import { connect } from 'react-redux';

//React-bootstrap import
import ProgressBar from 'react-bootstrap/ProgressBar'


class PracticeInfo extends Component{
     //create local state

     state = {
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
    handleSave = (event) => {
        event.preventDefault()
    }
    handleNext = (event) => {
        event.preventDefault()
        this.props.history.push('/uploadImage')
    }
    
    addPracticeInfo = (event) =>{
      event.preventDefault()
        this.props.dispatch({type:'ADD_MEMBER',
         payload:{
           id: this.props.user.id,
          prefix:this.props.createProfile.prefix,
          first_name:this.props.createProfile.first_name,
          last_name:this.props.createProfile.last_name,
          age:this.props.createProfile.age,
          hiamft_member_account_info:this.props.createProfile.hiamft_member_account_info,
          zip_code: this.props.contactInfo.zip_code,
          license_state:this.state.license_state,
          supervision_status:this.state.supervision_status,
          fees:this.state.fees,
          license_expiration:this.state.license_expiration,
          license_number:this.state.license_number,
          license_type:this.state.license_type,
          credentials:this.state.credentials,
          telehealth:this.state.telehealth,
          statement:this.state.statement,
          title:this.state.title,
          website:this.props.reduxstate.website,
             city:this.props.reduxstate.city

          
 /*     */
         }
        })
        this.handleReset()
    }
    handleReset = ()=>{
      this.setState({
        license_state:'',
          supervision_status:'',
          fees:'',
          license_expiration:'',
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
        <form onSubmit={this.addPracticeInfo}>
        <label>License Type</label><br/><select onChange={this.handleInputChangeFor("language")}>
        {this.props.license &&    
                   <>
                   <option value='' defaultValue='Select License Type'>Select License Type</option>
                   {this.props.license.map(licensetype =>
                    <option value={licensetype.title}
        
                  key={licensetype.id}>{licensetype.id}{' '}{licensetype.title}</option>
                    )}
                   </>
                   } 
           </select>
        <br/>
        <br/>
        <button>+</button><label>Add a Field</label>
        <br/>
        <br/>
        <label>License State of Issue</label><br/><input type="text"
                  name="license_state"
                  value={this.state.license_state}
                  onChange={this.handleInputChangeFor("license_state")}/>
        <br/>
        <br/>
        <label>License Expiration Date</label><br/><input 
                  type='date'
                  name="license_expiration"
                  value={this.state.license_expiration}
                  onChange={this.handleInputChangeFor("license_expiration")}/>
        <br/>
        <br/>
        <label>Fees</label><br/><input type="text"
                  name="fees"
                  value={this.state.fees}
                  onChange={this.handleInputChangeFor("fees")}/>
                   <br/>
                   <br/>
        <label>Specialization</label><br/><select>
                {this.props.specialtys &&
                   
                   <>
                  
            <option value='' defaultValue='Select a Speciality'>Select a Speciality</option>
                   {this.props.specialtys.map(specialty =>
                    <option value={specialty.title}
        
                  key={specialty.id}>{specialty.id}{' '}{specialty.title}</option>
                    )}
                   </>
                   } 
            
            </select>
        <br/>
        <br/>
        <button>+</button><label>Add a Field</label>
        <br/>
        <br/>
        <label>Supervision Status</label><br/><select onChange={this.handleInputChangeFor("supervision_status")}>
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
        <label>Insurance Taken</label><br/><select>
        {this.props.insuranceTaken &&    
                   <>
                  <option value='' defaultValue='Select Insurance Type'>Select Insurance Type</option>
                   {this.props.insuranceTaken.map(insurance =>
                    <option value={insurance.title}
        
                  key={insurance.id}>{insurance.id}{' '}{insurance.title}</option>
                    )}
                   </>
                   } 
            </select>
        <br/>
        <br/>
        <button>+</button><label>Add a Field</label>
        <br/>
        <br/>
        <label>Are you providing telehealth?</label>
        <br/>
        <label>Yes</label><input type='radio' className='choice' value='yes'/>
        <label>No</label><input type='radio' className='choice' value='no'/>
        <br/>
        <br/>
        <label>Treatment Approaches/Preferences</label><br/><select>
        {this.props.treatmentPreferences &&    
                   <>
                <option value='' defaultValue='Select an Approach'>Select an Approach</option>
                   {this.props.treatmentPreferences.map(treatment =>
                    <option value={treatment.title}
        
                  key={treatment.id}>{treatment.id}{' '}{treatment.title}</option>
                    )}
                   </>
                   } 
          </select>
        <br/>
        <br/>
        <button>+</button><label>Add a Field</label>
        <br/>
        <br/>
        <label>Client Focus</label><br/><select>
        {this.props.demographics &&    
                   <>
               
                <option value='' defaultValue='Select a Demographic'>Select a Demographic</option>
                   {this.props.demographics.map(group =>
                    <option value={group.title}
        
                  key={group.id}>{group.id}{' '}{group.title}</option>
                    )}
                   </>
                   } 
            </select>
        <select>
        {this.props.ageGroups &&    
                   <>
                <option value='' defaultValue='Select an Age Group'>Select an Age Group</option>
                   {this.props.ageGroups.map(agegroup=>
                    <option value={agegroup.title}
        
                  key={agegroup.id}>{agegroup.id}{' '}{agegroup.title}</option>
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
        <label>Session Format(s)</label><br/><select>
        {this.props.sessionFormats &&    
                   <>
                 <option value='' defaultValue='Select a Session Format'>Select a Session Format</option>
                   {this.props.sessionFormats.map(session =>
                    <option value={session.title}
        
                  key={session.id}>{session.id}{' '}{session.title}</option>
                    )}
                   </>
                   } 
           </select>
        <br/>
        <br/>
        <button>+</button><label>Add a Field</label>
        <br/>
        <br/>
        <button>Save</button>
        </form>
            <button onClick={this.handleBack}>Back</button>
           
            <button onClick={this.handleNext}>Next Page</button>

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
    contactInfo: reduxstate.contactInfo,
    user: reduxstate.user
  });
export default connect(mapStateToProps)(PracticeInfo);