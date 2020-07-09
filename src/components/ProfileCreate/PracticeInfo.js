import React,{ Component } from 'react';
import { Prompt } from 'react-router'
//this connects the component to th redux store
import { connect } from 'react-redux';
import "./profileCreate.css"


//React-bootstrap import
import ProgressBar from 'react-bootstrap/ProgressBar';
import Col from 'react-bootstrap/Col';
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
         //write the errors for all the practiceInfo inputs
         licenseStateError:'',
         licenseNumberError:'',
         licenseTypeError:'',
         supervisionStatusError:'',
         feesError:'',
         licenseExpirationError:'',
         credentialsError:'',
         telehealthError:'',
         statementError:'',
         titleError:'',
         sessionFormatIdError:'',
         clientFocusIdError:'',
         specialtyIdError:'',
         treatmentPreferencesIdError:'',
         ageGroupsError:'',
         insuranceTypeIdError:'',
         shouldBlockNavigation : true,
        
     }
  
componentDidMount (){
  //dispatch actions in order to fetch the data for options that users can select
  //the actions are dispatched when document is on ready to be used 
    this.props.dispatch({type:'FETCH_INSURANCE_TAKEN'});
    this.props.dispatch({type:'FETCH_SPECIALTY'});
    this.props.dispatch({type:'FETCH_SUPERVISION_STATUS'});
    this.props.dispatch({type:'FETCH_TREATMENT_APPROACHES'});
    this.props.dispatch({type:'FETCH_LICENSE_TYPE'});
    this.props.dispatch({type:'FETCH_DEMOGRPHICS'});
    this.props.dispatch({type:'FETCH_AGE_GROUPS'});
    this.props.dispatch({type:'FETCH_SESSION_FORMAT'});
}
componentDidUpdate = () => {
  if (this.state.shouldBlockNavigation) {
    window.onbeforeunload = () => true
  } else {
    window.onbeforeunload = undefined
  }
}

//take in the information from the input
//when users either choose options from drop down or put info into the input
//the state is changed when there are input data
handleInputChangeFor = propertyName => (event) =>{
    this.setState({
      [propertyName]:event.target.value
    });
  } 
    handleBack = (event) => {
//will help navigate back to the previous page
//that is contact infor page
        event.preventDefault()
        this.props.history.push('/contact-info')
    }

    
    handleNext = (event) => {
//this helps to navigate to the next page
//that is the profile edit page
        event.preventDefault()
     
    }
    validate = () => {
      let licenseStateError = '';
      let licenseNumberError = '';
      let licenseTypeError = '';
      let supervisionStatusError = '';
      let feesError = '';
      let licenseExpirationError = '';
      let  credentialsError = '';
      let telehealthError = '';
      let statementError = '';
      let titleError= '';
      let sessionFormatIdError = '';
      let  clientFocusIdError = '';
      let specialtyIdError = '';
      let treatmentPreferencesIdError = '';
      let  ageGroupsError = '';
      let insuranceTypeIdError = '';

      let formIsValid = true;

      if(this.state.license_state === ''){
        formIsValid=false;
        licenseStateError = 'State of Issuance is required.'
      }else if(!this.state.license_state.match(/^[a-zA-Z_]+$/) ){
          formIsValid=false;
          licenseStateError = "State of Issuance input is invalid." 
      }
      if(this.state.title === ''){
        formIsValid=false;
        titleError = 'Title is required.'
      }else if(!this.state.title.match(/^[a-zA-Z_]+$/) ){
          formIsValid=false;
          titleError = "Title input is invalid." 
      }
      if(this.state.statement === ''){
        formIsValid=false;
        statementError = 'Statement is required'
      }else if(!this.state.statement.match(/^[a-zA-Z_]+$/) ){
          formIsValid=false;
          statementError  = "Statement is invalid" 
      }

      if(this.state.license_number === ''){
        formIsValid=false;
        licenseNumberError = 'License Number is required.'
      }else if(!isNaN(this.state.license_number) === false ){
          formIsValid=false;
          licenseNumberError = "License Number input is invalid." 
      }
      if(this.state.fees === ''){
        formIsValid=false;
        feesError = 'Fees is required.'
      }else if(!isNaN(this.state.fees) === false ){
          formIsValid=false;
          feesError = "Fees input is invalid." 
      }
      if(this.state.license_type === ''){
        formIsValid=false;
        licenseTypeError = 'License Type is required.'
   }

      if(this.state.supervision_status === ''){
           formIsValid=false;
           supervisionStatusError = 'Supervision Status is required.'
      }

      if(this.state.license_expiration === ''){
           formIsValid=false;
           licenseExpirationError = 'License Expiration is required.'
      }
      if(this.state.telehealth === ''){
           formIsValid=false;
           telehealthError = 'Telehealth is required.'
      }
      if(this.state.session_format_id === ''){
        formIsValid=false;
        sessionFormatIdError = 'Session Format is required.'
        }
        if(this.state.client_focus_id === ''){
        formIsValid=false;
        clientFocusIdError = 'Demographic Focus is required.'
        }
        if(this.state.specialty_id === ''){
        formIsValid=false;
       specialtyIdError = 'Specialization is required.'
        }
        if(this.state.treatment_preferences_id === ''){
        formIsValid=false;
        treatmentPreferencesIdError = 'Treatment & Approach is required.'
        }
        if(this.state.age_groups_served_id === ''){
        formIsValid=false;
        ageGroupsError = 'Age Focus Group is required.'
       }
       if(this.state.credentials === ''){
         formIsValid=false;
        credentialsError = 'Credentials is required.'
        }
        if(this.state.insurance_type_id === ''){
          formIsValid=false;
         insuranceTypeIdError = 'Insurance Accepted is required.'
         }

      if( licenseStateError || licenseNumberError || licenseTypeError ||   supervisionStatusError
           || feesError ||  licenseExpirationError ||   credentialsError 
           ||  telehealthError||  statementError || titleError || sessionFormatIdError || clientFocusIdError
           ||  specialtyIdError || treatmentPreferencesIdError|| ageGroupsError||  insuranceTypeIdError){
        this.setState({licenseStateError, licenseNumberError, licenseTypeError, supervisionStatusError,
           feesError, licenseExpirationError, credentialsError,telehealthError, statementError, titleError, sessionFormatIdError, clientFocusIdError,
          specialtyIdError, treatmentPreferencesIdError, ageGroupsError, insuranceTypeIdError});
      
      }else{
        return true;
      }

    }
  //every multiselect needs its own handle[Property]Change function
  //this functions take the new id of an item selected in the multiselect
  //and converts it to a title (name).
  //i.e. select language "Arabic" which has a value of '2', and returns the name of language "Arabic"
  handleMultiChange = (event, editPropertyName) => {
    const array = [];
    for (let option of event.target.selectedOptions) {
      array.push(Number(option.value));
    }
    // this.handleLangChange(event, "languagesEdit")
    this.setState({
      [editPropertyName]: array,
    });
  }; //end handleLangChange
    

    addMembersInfo = (event) =>{
//this action will dispatch all the info collegeted from all three pages
//and those are createprofile, contactinfo and practicinfo pages
      event.preventDefault();


      const isValid = this.validate();
      // if(!isValid){
        //  return false
        //  }else{
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
            license_type:this.state.license_type,
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
            language_id:this.props.createProfile.language_id,
           }
          });
          this.setState({shouldBlockNavigation:false},()=>{
            this.props.history.push("/uploadimage");
          });
          //this will reset the inputs on the parcticeinfo page
           return true;
        //  }
    }

   
    render (){
     
        return (
          <>
            <div>
              <Prompt
                when={this.state.shouldBlockNavigation}
                message='You have unsaved changes. Are you sure you want to leave?'
              />

            </div>
                <div className="container">
                <header>
                  <h1 className="text-center">Practice Info</h1>
                </header>
                <div className='progressbar'> <ProgressBar now={75} /></div>

              <Form onSubmit={this.addMembersInfo}>
                <Form.Group>
                  <Form.Label>Title*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='Please fill in your Title.'
                    name="title"
                    value={this.state.title}
                    onChange={this.handleInputChangeFor("title")}
                  />
                  <Form.Text className="text-muted">
                    Not Listed (for HIAMFT-use only)
                  </Form.Text>
                   <h4 className="error">{this.state.titleError}</h4>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Credentials*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='Please fill in your Credentials.'
                    name="title"
                    value={this.state.credentials}
                    onChange={this.handleInputChangeFor("credentials")}
                  />
                  <Form.Text className="text-muted">
                    Please indicate the credentials you would like to have
                    listed in your HIAMFT Directory listing. Type them in as
                    they would appear following your name. Example: 'PhD,
                    LMFT, LP'
                  </Form.Text>
                   <h4 className="error">{this.state.credentialsError}</h4>
                </Form.Group>

                <Form.Group>
                  <Form.Label>License Type*</Form.Label>
                  <br />
                  <Form.Control
                    as="select"
                    onChange={this.handleInputChangeFor("license_type")}
                  >
                    {this.props.license && (
                      <>
                        <option value='' defaultValue="Select License Type">
                          Select License Type
                        </option>
                        {this.props.license.map((type) => (
                          <option
                            value={type.title}
                            key={type.license_type_id}
                          >
                            {type.title}
                          </option>
                           
                        ))}
                      </>
                    )}
                  </Form.Control>
                  <Form.Text className="text-muted">
                    Not Listed (for HIAMFT-use only) - Please list licenses
                    that you'd like to appear after your name in Credentials section
                      </Form.Text>
                        <h4 className="error">{this.state.licenseTypeError}</h4>
                </Form.Group>

                <Form.Group>
                  <Form.Label>License State of Issuance*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='Please fill in your License State of Issuance.'
                    name="license_state"
                    value={this.state.license_state}
                    onChange={this.handleInputChangeFor("license_state")}
                  />
                  <Form.Text className="text-muted">
                    Not Listed (for HIAMFT-use only)
                      </Form.Text>
                   <h4 className="error">{this.state.licenseStateError}</h4>
                </Form.Group>

                <Form.Group>
                  <Form.Label>License Number*</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder='Please fill in your License Number.'
                    name="license_number"
                    value={this.state.license_number}
                    onChange={this.handleInputChangeFor("license_number")}
                  />
                  <Form.Text className="text-muted">
                    Not Listed (for HIAMFT-use only)
                      </Form.Text>
                   <h4 className="error">{this.state.licenseNumberError}</h4>
                </Form.Group>

                <Form.Group>
                  <Form.Label>License Expiration Date*</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder='Please fill in your License Expiration Date.'
                    name="license_expiration"
                    value={this.state.license_expiration}
                    onChange={this.handleInputChangeFor("license_expiration")}
                  />
                  <Form.Text className="text-muted">
                    Not Listed (for HIAMFT-use only)
                      </Form.Text>
                   <h4 className="error">{this.state.licenseExpirationError}</h4>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Supervision Status*</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={this.handleInputChangeFor("supervision_status")}
                  >
                    <option value="None">None</option>
                    <option value="Hawai'i qualified">Hawai'i-Qualified</option>
                    <option value="MFT supervisor">MFT Supervisor</option>
                    <option value="AAMFT approved">AAMFT-approved</option>
                    <option value="Supervisor">Supervisor</option>
                  </Form.Control>
                  <Form.Text className="text-muted">Listed</Form.Text>
                  <h4 className="error">{this.state.supervisionStatusError}</h4>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Insurance Accepted* - you may select multiple</Form.Label>
                  <Form.Control
                    as="select"
                    multiple={true}
                    onChange={(event) =>
                      this.handleMultiChange(event, "insurance_type_id")
                    }
                  >
                    {this.props.insuranceTaken && (
                      <>
                        {this.props.insuranceTaken.map((insurance) => (
                          <option
                            value={insurance.insurance_type_id}
                            key={insurance.insurance_type_id}
                          >
                            {insurance.title}
                          </option>
                        ))}
                      </>
                    )}
                  </Form.Control>
                  <Form.Text className="text-muted">
                    Listed - To select multiple on Mac: press & hold Command key. To
                    select multiple on PC, press & hold CTRL.
                  </Form.Text>
                  <h4 className="error">{this.state.insuranceTypeIdError}</h4>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Fees*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='Please fill in your Fees.'
                    name="fees"
                    value={this.state.fees}
                    onChange={this.handleInputChangeFor("fees")}
                  />
                  <Form.Text className="text-muted">
                    Listed - Please indicate a standard rate or range
                      </Form.Text>
                   <h4 className="error">{this.state.feesError}</h4>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Specialization(s)* - you may select multiple</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder='Please fill in your specialization.'
                    multiple={true}
                    onChange={(event) =>
                      this.handleMultiChange(event,"specialty_id")
                    }
                  >
                    {this.props.specialtys && (
                      <>
                        {this.props.specialtys.map((specialty) => (
                          <option
                            value={specialty.specialty_id}
                            key={specialty.specialty_id}
                          >
                            {specialty.title}
                          </option>
                        ))}
                      </>
                    )}
                  </Form.Control>
                  <Form.Text className="text-muted">
                    Listed - To select multiple on Mac: press & hold Command
                    key. To select multiple on PC, press & hold CTRL.
                      </Form.Text>
                  <h4 className="error">{this.state.specialtyIdError}</h4>
                </Form.Group>

                

                
                

                

                <Form.Group>
                  <Form.Label>Treatment & Approach* - you may select multiple</Form.Label>
                  <Form.Control
                    as="select"
                    multiple={true}
                    onChange={(event) =>
                      this.handleMultiChange(event, "treatment_preferences_id")
                    }
                  >
                    {this.props.treatmentPreferences && (
                      <>
                        {this.props.treatmentPreferences.map((treatment) => (
                          <option
                            value={treatment.treatment_preferences_id}
                            key={treatment.treatment_preferences_id}
                          >
                            {treatment.title}
                          </option>
                        ))}
                      </>
                    )}
                  </Form.Control>
                  <Form.Text className="text-muted">
                    Listed - To select multiple on Mac: press & hold Command
                    key. To select multiple on PC, press & hold CTRL.
                      </Form.Text>
                  <h4 className="error">{this.state.treatmentPreferencesIdError}</h4>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Demographic Focus* - you may select multiple</Form.Label>
                  <Form.Control
                    as="select"
                    multiple={true}
                    onChange={(event) =>
                      this.handleMultiChange(event, "client_focus_id")
                    }
                  >
                    {this.props.demographics && (
                      <>
                        {this.props.demographics.map((group) => (
                          <option
                            value={group.client_focus_id}
                            key={group.client_focus_id}
                          >
                            {group.title}
                          </option>
                        ))}
                      </>
                    )}
                  </Form.Control>
                  <Form.Text className="text-muted">
                    Listed - To select multiple on Mac: press & hold Command
                    key. To select multiple on PC, press & hold CTRL.
                      </Form.Text>
                  <h4 className="error">{this.state.clientFocusIdError}</h4>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Age Group Focus* - you may select multiple</Form.Label>
                  <Form.Control
                    as="select"
                    multiple={true}
                    onChange={(event) =>
                      this.handleMultiChange(event, "age_groups_served_id")
                    }
                  >
                    {this.props.ageGroups && (
                      <>
                        {this.props.ageGroups.map((agegroup) => (
                          <option
                            value={agegroup.age_groups_served_id}
                            key={agegroup.age_groups_served_id}
                          >
                            {agegroup.title}
                          </option>
                        ))}
                      </>
                    )}
                  </Form.Control>
                  <Form.Text className="text-muted">
                    Listed - To select multiple on Mac: press & hold Command
                    key. To select multiple on PC, press & hold CTRL.
                      </Form.Text>
                  <h4 className="error">{this.state.ageGroupsError}</h4>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Session Format(s)* - you may select multiple</Form.Label>
                  <Form.Control
                    as="select"
                    multiple={true}
                    onChange={(event) =>
                      this.handleMultiChange(event, "session_format_id")
                    }
                  >
                    {this.props.sessionFormats && (
                      <>
                        {this.props.sessionFormats.map((session) => (
                          <option
                            value={session.session_format_id}
                            key={session.session_format_id}
                          >
                            {session.title}
                          </option>
                        ))}
                      </>
                    )}
                  </Form.Control>
                  <Form.Text className="text-muted">
                    Listed - To select multiple on Mac: press & hold Command
                    key. To select multiple on PC, press & hold CTRL.
                      </Form.Text>
                  <h4 className="error">{this.state.sessionFormatIdError}</h4>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Are you providing telehealth?*</Form.Label>
                    <Form.Control
                      as="select"
                      placeholder='Please choose if you are providing telehealth.'
                      name="telehealth"
                      value={this.state.telehealth}
                      onChange={this.handleInputChangeFor("telehealth")}
                    >
                      <option>No, I do not offer telehealth.</option>
                      <option>Yes, I offer telehealth.</option>
                    </Form.Control>
                  <Form.Text className="text-muted">Listed</Form.Text>
                  <h4 className="error">{this.state.telehealthError}</h4>
                </Form.Group>

                <Form.Group>
                  <div  className="next-button">
                  <Button type="submit">Next</Button>
                  </div>
                </Form.Group>
              </Form>
            </div>
          </>
        );
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