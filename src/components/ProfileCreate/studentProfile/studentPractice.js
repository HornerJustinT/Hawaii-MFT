import React,{ Component } from 'react';
//this connects the component to th redux store
import { connect } from 'react-redux';
import "../profileCreate.css"

//React-bootstrap import
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "../../App/App.css";




class studentPractice extends Component{
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
         clientFocusIdError:'',
         specialtyIdError:'',
         treatmentPreferencesIdError:'',
         ageGroupsError:'',
         shouldBlockNavigation : true,
         newId:'',
         insurance_type_id:''

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
    this.props.dispatch({
      type:"NEW_ID"
    });
}
componentWillReceiveProps(nextProps){
  this.setState({
    user:nextProps.user
  })
}
componentDidUpdate = () => {
  if (this.state.shouldBlockNavigation) {
    window.onbeforeunload = () => true
  } else {
    window.onbeforeunload = undefined
  }
  console.log(this.props.reduxstate.getUsersReducer.length)
  console.log(this.props.reduxstate.getUsersReducer)
  if (this.props.reduxstate.getUsersReducer[0]) {
    const o = this.props.reduxstate.getUsersReducer;
    const max = o.reduce(function (prev, current) {
      return (prev.id > current.id) ? prev : current
    })
    if (this.state.newId === "")
      this.setState({ newId: (max.id) }, () => { console.log(this.state) })
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

  validate = () => {
      
     
    let  clientFocusIdError = '';
    let specialtyIdError = '';
    let treatmentPreferencesIdError = '';
    let  ageGroupsError = '';
    
    let formIsValid = true;

   
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
      ageGroupsError = 'Age Group Focus is required.'
     }
    

    if(  clientFocusIdError||  specialtyIdError || treatmentPreferencesIdError|| ageGroupsError){
      this.setState({ clientFocusIdError, specialtyIdError, treatmentPreferencesIdError, ageGroupsError});
    
    }else{
      return true;
    }

  }

    addMembersInfo = (event) =>{
//this action will dispatch all the info collegeted from all three pages
//and those are createprofile, contactinfo and practicinfo pages
const isValid = this.validate();
if(!isValid){
   return false
   }else{
      event.preventDefault();
      this.props.dispatch({
        type: "REGISTER",
        payload: {
          username: this.props.saveUserReducer.username,
          password: this.props.saveUserReducer.password
        },
      });
      this.props.dispatch({type:'ADD_MEMBER',
        payload:{
          user: (this.state.newId+1),
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
          city_personal:this.props.contactAddress.city_personal,
          zip_code_personal: this.props.contactAddress.zip_code_personal,
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
          insurance_type_id:[ 12 ],
          language_id:this.props.createProfile.language_id,
          student: true,
         }
        });
        this.setState({shouldBlockNavigation:false},()=>{
            this.props.history.push("/uploadimage");
          });
          //this will reset the inputs on the parcticeinfo page
           return true;
         }

    }

  
    render (){
        return(
            <>
            <div className='container'>
             
            <header>
              {" "}
              <h1 className="text-center">Practice Interests & Focus Areas</h1>
            </header>
        <br/>
        <div className='progressbar'> <ProgressBar now={75} /></div>
        <br/>
        <Form onSubmit={this.addMembersInfo}>

                <Form.Group>
                  <Form.Label>Supervision Status*</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="Student"
                    onChange={this.handleInputChangeFor("supervision_status")}
                  >
                    <option value="None">Student</option>
                  </Form.Control>
                  <Form.Text className="text-muted">Listed</Form.Text>
                  <h4 className="error">{this.state.supervisionStatusError}</h4>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Specialization(s)* - you may select multiple</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder='Please fill in your Specialization'
                    multiple={true}
                    onChange={(event) =>
                      this.handleMultiChange(event, "specialty_id")
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
                  <div className="next-button">
                    <Button type="submit">Next</Button>
                  </div>
                </Form.Group>
              </Form>
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
    user: reduxstate.user,
    saveUserReducer: reduxstate.saveUserReducer,
    reduxstate
  });
export default connect(mapStateToProps)(studentPractice);