import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import firebase from "../../Firebase";
// Components
import ProfileEditContact from "./ProfileEditContact";
import ProfileEditPractice from "./ProfileEditPractice";
import UploadModal from "../UploadModal/UploadModal";

//React Bootstrap imports
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";


//CSS file imports
import "./ProfileEdit.css";
import "../App/App.css";


var storage = firebase.storage().ref();

class ProfileEdit extends Component {
  //setting state, particularly for conditional render of Basic, Contact & Practice sections
  state = {
    id: 0,
    clickBasic: false,
    languages: [],
    languagesEdit: [],
    profilePhoto: "",
    student: this.props.profile.student,
  };

  getImage = (id) => {
    console.log(id)
    storage
      .child(`images/${id}photo`)
      .getDownloadURL()
      .then((url) => {
        this.setState({ profilePhoto: url });
      })
      .then(() => {
        this.forceUpdate();
      })
      .catch((error) => { // if no photo found
        storage 
          .child(`images/noFile.png`)
          .getDownloadURL()
          .then((url) =>{
            this.setState({profilePhoto:url});
          }).then(()=>{
            this.forceUpdate();
          })
          .catch((error) => {
            console.log('No file found photo also not found')
          })
        // Handle any errors
      });
  };
  //mounting component - dispatching to redux sagas to call data from server for retreival from profile,
  //languages, islands & treatments reducers (props).
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_LANGUAGES" });

    this.props.dispatch({
      type: "FETCH_PROFILE",
      payload: { id: this.props.match.params.id || this.props.user.id },
      admin: this.props.match.params.id || false,
    });
    this.getImage(this.props.user.id);

    if(this.props.match.params.id){
      this.getImage(this.props.match.params.id)
    }
    else{
      this.getImage(this.props.user.id)
    }

  } //end componentDidMount

  //updating component to ensure all the data makes it to props for render
  componentDidUpdate(previousProps) {
    if (
      this.state.id !== this.props.user.id &&
      previousProps.profile.id !== this.props.profile.id &&
      this.props.profile.phone
    ) {
      //setting state in component update with all of the properties retrieved from props from the database
      //for this particular member's profile view.
      //as above, treatmentApproaches has been commented out
      this.setState({
        id: this.props.profile.id,
        enabled: this.props.profile.enabled,
        prefix: this.props.profile.prefix,
        firstName: this.props.profile.first_name,
        lastName: this.props.profile.last_name,
        title: this.props.profile.title,
        age: this.props.profile.age,
        phone: this.props.profile.phone[0],
        address: this.props.profile.address[0],
        city: this.props.profile.city,
        island: this.props.profile.island,
        email: this.props.profile.email[0],
        zipCode: this.props.profile.zip_code,
        website: this.props.profile.website,
        credentials: this.props.profile.credentials,
        licenseState: this.props.profile.license_state,
        licenseExpiration: this.props.profile.license_expiration,
        licenseNumber: this.props.profile.license_number,
        licenseType: this.props.profile.license_type,
        hiamftMemberInfo: this.props.profile.hiamft_member_account_info,
        supervisionStatus: this.props.profile.supervision_status,
        fees: this.props.profile.fees,
        telehealth: this.props.profile.telehealth,
        statement: this.props.profile.statement,
        languages: this.props.profile.languages,
        languagesEdit: this.props.profile.languages_id,
        agesServed: this.props.profile.ages_served,
        clientFocus: this.props.profile.client_focus,
        insurance: this.props.profile.insurance,
        sessionFormat: this.props.profile.session_format,
        specialty: this.props.profile.specialty,
        treatmentPreferences: this.props.profile.treatment_preferences,
        student: this.props.profile.student,
      });

      if (this.props.profile.student) {
          this.pushStudent();
        }
    }
  } //end componentDidUpdate

  pushStudent = () => {
    this.props.history.push('/edit-student');
  }


  //this function handles the conditional rendering to switch between View and Edit modes
  handleEditBasic = () => {
    //setting state to indicate the Edit Basic Info button has been clicked
    this.setState({
      clickBasic: true,
    });
  }; //end handleEditBasic

  // Enables or disabled the profile based on if its enabled already or not
  enablePress = () => {
    // Send the dispatch to redux
    this.props.dispatch({
      type: "ENABLE_PROFILE",
      payload: { id: this.state.id, enabled: !this.state.enabled },
    });

    // Updates it locally because it doesn't update otherwise
    this.setState({
      enabled: !this.state.enabled,
    });
  };

  //this function saves the new information entered into the Basic Info form
  handleSaveBasic = () => {
    //resetting state to indicate the Save Changes button has been clicked
    this.setState({
      clickBasic: false,
    });
    //dispatching to EditBasic saga, sending updated state as payload
    this.props.dispatch({
      type: "EDIT_BASIC",
      payload: this.state,
    });
  }; //end handleSaveBasic

  //handleChange resets state according to new data entered into form inputs
  handleChange = (event, propertyName) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }; //end handleChange

  //every multiselect needs its own handle[Property]Change function
  //this functions take the new id of an item selected in the multiselect
  //and converts it to a title (name).
  //i.e. select language "Arabic" which has a value of '2', and returns the name of language "Arabic"
  handleLangChange = (event, editPropertyName, viewPropertyName) => {
    const array = [];
    for (let option of event.target.selectedOptions) {
      array.push(Number(option.value));
    }
    const updatedLanguages = array.map((id) => {
      const results = this.props.languages.filter(
        (object) => object.language_id === id
      );
      return results[0].title;
    });
    this.setState({
      [editPropertyName]: array,
      [viewPropertyName]: updatedLanguages,
    });
  }; //end handleLangChange

  displayLanguages = () => {
    if (this.state.clickBasic) {
      return (
        <Form.Group className="column">
          <Form.Label className="label">Languages Spoken</Form.Label>
          <Form.Control
            as="select"
            multiple={true}
            value={this.state.languagesEdit}
            onChange={(event) =>
              this.handleLangChange(event, "languagesEdit", "languages")
            }
          >
            {this.props.languages.map((lang) => {
              return (
                <>
                  <option key={lang.language_id} value={lang.language_id}>
                    {lang.title}
                  </option>
                </>
              );
            })}
          </Form.Control>
          <Form.Text className="text-muted">
            Listed - To select multiple on Mac: press & hold Command key. To
            select multiple on PC, press & hold CTRL.
          </Form.Text>
        </Form.Group>
      );
    } else {
      return (
        <Form.Group className="column">
          <Form.Label className="label">Languages Spoken</Form.Label>
          <div>
            {this.state.languages.map((lang) => {
              return (
                <>
                  <Form.Control disabled={true} readOnly defaultValue={lang} />
                </>
              );
            })}
          </div>
          <Form.Text className="text-muted">
            Listed
          </Form.Text>
        </Form.Group>
      );
    }
  };

  render() {

    if (this.props.profile && this.state.languages && this.state.student === false) {
      return (
        <>
          <div className="header">
            <h3>My Profile</h3>
          </div>

          {/**Here is Basic Info render */}
          {this.state.clickBasic ? (
            <div className="body">
              <div className="flex-between row-wrap">
                <h4>Basic Info</h4>
                <Button
                  className="flex-between row-wrap"
                  onClick={() => this.handleSaveBasic()}
                >
                  Save Changes
                </Button>
              </div>
              <div className="border">
                <Form className="flex-container row-wrap row">
                  <Form.Group as={Col}>
                    <Form.Label variant="flat" className="label">
                      Prefix
                    </Form.Label>
                    <Form.Control
                      defaultValue={this.state.prefix}
                      onChange={(event) => this.handleChange(event, "prefix")}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label className="label">First Name</Form.Label>
                    <Form.Control
                      defaultValue={this.state.firstName}
                      onChange={(event) =>
                        this.handleChange(event, "firstName")
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label className="label">Last Name</Form.Label>
                    <Form.Control
                      defaultValue={this.state.lastName}
                      onChange={(event) => this.handleChange(event, "lastName")}
                    />
                  </Form.Group>
                </Form>

                <Form className="flex-between row-wrap row">
                  <Form.Group className="column">
                    <Form.Label className="label">Age</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={this.state.age}
                      onChange={(event) => this.handleChange(event, "age")}
                    />
                    <Form.Text className="text-muted">
                      Not Listed (for HIAMFT-use only)
                    </Form.Text>
                  </Form.Group>
                  {this.displayLanguages()}
                </Form>
                <Form>
                  <Form.Group>
                    <Form.Label className="label">
                      Personal Statement
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="5"
                      defaultValue={this.state.statement}
                      onChange={(event) =>
                        this.handleChange(event, "statement")
                      }
                    />
                  </Form.Group>
                </Form>
              </div>
            </div>
          ) : (
            <div className="body">
              <div className="flex-between row-wrap">
                <h4>Basic Info</h4>
                <Button
                  className="flex-between row-wrap"
                  onClick={() => this.handleEditBasic()}
                >
                  Edit Basic Info
                </Button>
              </div>
              {this.props.profile && (
                <>
                  <div className="border">
                    <Form className="flex-container row">
                      <Form.Row>
                          <Form.Group as={Col}>
                            <Form.Label className="label">Prefix</Form.Label>
                            <Form.Control
                              disabled={true}
                              readOnly
                              defaultValue={this.state.prefix}
                            />
                          </Form.Group>
                          <Form.Group as={Col}>
                            <Form.Label className="label">First Name</Form.Label>
                            <Form.Control
                              disabled={true}
                              readOnly
                              defaultValue={this.state.firstName}
                            />
                          </Form.Group>
                          <Form.Group as={Col}>
                            <Form.Label className="label">Last Name</Form.Label>
                            <Form.Control
                              disabled={true}
                              readOnly
                              defaultValue={this.state.lastName}
                            />
                          </Form.Group>
                      </Form.Row>
                    </Form>

                    <Form className="flex-between row-wrap row">
                      <Form.Group className="column">
                        <Form.Label className="label">Age</Form.Label>
                        <Form.Control
                          disabled={true}
                          readOnly
                          defaultValue={this.state.age}
                        />
                        <Form.Text className="text-muted">
                          Not Listed (for HIAMFT-use only)
                        </Form.Text>
                      </Form.Group>
                      {this.displayLanguages()}
                    </Form>
                      <Form className="flex-between row-wrap row last">
                      <Form.Group className="column">
                        <Form.Label className="label">
                          Personal Statement
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="5"
                          disabled={true}
                          readOnly
                          defaultValue={this.state.statement}
                        />
                          <Form.Text className="text-muted">
                            10,000 character limit
                          </Form.Text>
                      </Form.Group>
                    </Form>
                  </div>
                </>
              )}
            </div>
          )}

          <ProfileEditContact />
          <ProfileEditPractice />

          <div className="bodyPhoto">
            <h4>Profile Picture</h4>
            <div >
              <img className="photo" src={this.state.profilePhoto}></img>

              <div className="button">
                <UploadModal
                  refresh={this.getImage}
                  name={this.props.user}
                ></UploadModal>
              </div>
            </div>
          </div>

          <div className="body">
            {this.state.enabled ? (
              <Button
                variant="danger"
                className="disable"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to disable this account? A disabled account will no longer appear in the search directory. You may re-enable it at any time."
                    )
                  )
                    this.enablePress();
                }}
              >
                Disable Account
              </Button>
            ) : (
              <Button className="disable" onClick={this.enablePress}>
                Enable Account
              </Button>
            )}
          </div>
        </>
      );
    } else if ( this.state.student === true){
      {this.pushStudent()}
    } else {
      return <p> user not found </p>;
    }
  }
}

const putReduxStateOnProps = (reduxStore) => ({
  user: reduxStore.user,
  profile: reduxStore.profile,
  languages: reduxStore.languages,
  islands: reduxStore.islands,
  treatments: reduxStore.treatmentPreferences,
});

export default withRouter(connect(putReduxStateOnProps)(ProfileEdit));
