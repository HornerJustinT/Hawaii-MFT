import React,{ Component } from 'react';
//this connects the component to th redux store
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
//this will reset the inputs on the parcticeinfo page
this.props.history.push(`/edit-profile`)
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
        return (
          <>
            <div className="container">
              <header>
                <h1 className="text-center">Practice Info</h1>
              </header>
              <ProgressBar now={75} />

              <Form onSubmit={this.addMembersInfo}>
                <Form.Group>
                  <Form.Label>Title </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleInputChangeFor("title")}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Credentials </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={this.state.credentials}
                    onChange={this.handleInputChangeFor("credentials")}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>License Type</Form.Label>
                  <br />
                  <Form.Control
                    as="select"
                    onChange={this.handleInputChangeFor("license_type_id")}
                  >
                    {this.props.license && (
                      <>
                        <option value="" defaultValue="Select License Type">
                          Select License Type
                        </option>
                        {this.props.license.map((licensetype) => (
                          <option
                            value={licensetype.license_type_id}
                            key={licensetype.license_type_id}
                          >
                            {licensetype.title}
                          </option>
                        ))}
                      </>
                    )}
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>License State of Issue</Form.Label>
                  <Form.Control
                    type="text"
                    name="license_state"
                    value={this.state.license_state}
                    onChange={this.handleInputChangeFor("license_state")}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>License Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="license_number"
                    value={this.state.license_number}
                    onChange={this.handleInputChangeFor("license_number")}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>License Expiration Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="license_expiration"
                    value={this.state.license_expiration}
                    onChange={this.handleInputChangeFor("license_expiration")}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Statement</Form.Label>
                  <Form.Control
                    type="text"
                    name="statement"
                    value={this.state.statement}
                    onChange={this.handleInputChangeFor("statement")}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Fees</Form.Label>
                  <Form.Control
                    type="text"
                    name="fees"
                    value={this.state.fees}
                    onChange={this.handleInputChangeFor("fees")}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Specialization</Form.Label>
                  <Form.Control
                    as="select"
                    multiple={true}
                    onChange={(event) =>
                      this.handleMultiChange(event, "specialty_id")
                    }
                  >
                    {this.props.specialtys && (
                      <>
                        <option value="" defaultValue="Select a Speciality">
                          Select a Speciality
                        </option>
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
                </Form.Group>

                <Form.Group>
                  <Form.Label>Supervision Status</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={this.handleInputChangeFor("supervision_status")}
                  >
                    <option value="None">None</option>
                    <option value="Hawai'i qualified">Hawai'i qualified</option>
                    <option value="MFT supervisor">MFT supervisor</option>
                    <option value="AAMFT approved">AAMFT approved</option>
                    <option value="Supervisor">Supervisor</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Insurance Taken</Form.Label>
                  <Form.Control
                    as="select"
                    multiple={true}
                    onChange={(event) =>
                      this.handleMultiChange(event, "insurance_type_id")
                    }
                  >
                    {this.props.insuranceTaken && (
                      <>
                        <option value="" defaultValue="Select Insurance Type">
                          Select Insurance Type
                        </option>
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
                </Form.Group>

                <Form.Group>
                  <Form.Label>Are you providing telehealth?</Form.Label>
                  <Form.Control
                    as="select"
                    name="telehealth"
                    value={this.state.telehealth}
                    onChange={this.handleInputChangeFor("telehealth")}
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Treatment Approaches/Preferences</Form.Label>
                  <Form.Control
                    as="select"
                    multiple={true}
                    onChange={(event) =>
                      this.handleMultiChange(event, "treatment_preferences_id")
                    }
                  >
                    {this.props.treatmentPreferences && (
                      <>
                        <option value="" defaultValue="Select an Approach">
                          Select an Approach
                        </option>
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
                </Form.Group>

                <Form.Group>
                  <Form.Label>Client Focus</Form.Label>
                  <Form.Control
                    as="select"
                    multiple={true}
                    onChange={(event) =>
                      this.handleMultiChange(event, "client_focus_id")
                    }
                  >
                    {this.props.demographics && (
                      <>
                        <option value="" defaultValue="Select a Demographic">
                          Select a Demographic
                        </option>
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
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    as="select"
                    multiple={true}
                    onChange={(event) =>
                      this.handleMultiChange(event, "age_groups_served_id")
                    }
                  >
                    {this.props.ageGroups && (
                      <>
                        <option value="" defaultValue="Select an Age Group">
                          Select an Age Group
                        </option>
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
                </Form.Group>

                <Form.Group>
                  <Form.Label>Session Format(s)</Form.Label>
                  <Form.Control
                    as="select"
                    multiple={true}
                    onChange={(event) =>
                      this.handleMultiChange(event, "session_format_id")
                    }
                  >
                    {this.props.sessionFormats && (
                      <>
                        <option value="" defaultValue="Select a Session Format">
                          Select a Session Format
                        </option>
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
                </Form.Group>

                <Form.Group>
                  <Button type="submit">Save</Button>
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