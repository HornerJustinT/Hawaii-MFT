import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


//React Botstrap imports
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

//CSS file imports
import "./ProfileEdit.css";
import "../App/App.css";



class ProfileEdit extends Component {
  //setting state, particularly for conditional render of Basic, Contact & Practice sections
  state = {
    clickPractice: false,
    id: this.props.profile.id,
    title: this.props.profile.title,
    credentials: this.props.profile.credentials,
    licenseState: this.props.profile.license_state,
    licenseExpiration: this.props.profile.license_expiration,
    licenseNumber: this.props.profile.license_number,
    licenseType: this.props.profile.license_type,
    licenseTypeEdit: this.props.profile.license_type_id,
    hiamftMemberInfo: this.props.profile.hiamft_member_account_info,
    supervisionStatus: this.props.profile.supervision_status,
    fees: this.props.profile.fees,
    telehealth: this.props.profile.telehealth,
    agesServed: this.props.profile.ages_served,
    agesServedEdit: this.props.profile.ages_served_id,
    clientFocus: this.props.profile.client_focus,
    clientFocusEdit: this.props.profile.client_focus_id,
    clientAges: this.props.profile.ages_served,
    clientAgesEdit: this.props.profile.ages_served_id,
    insurance: this.props.profile.insurance,
    insuranceEdit: this.props.profile.insurance_id,
    sessionFormat: this.props.profile.session_format,
    sessionFormatEdit: this.props.profile.session_format_id,
    specialty: this.props.profile.specialty,
    specialtyEdit: this.props.profile.specialty_id,
    treatmentPreferences: this.props.profile.treatment_preferences,
    treatmentEdit: this.props.profile.treatment_preferences_id,
    student: this.props.profile.student,
  };

  //mounting component - dispatching to redux sagas to call data from server for retreival from profile,
  //languages, islands & treatments reducers (props).

  componentDidMount() {
    console.log(this.props);
    this.props.dispatch({ type: "FETCH_AGE_GROUPS" });
    this.props.dispatch({ type: "FETCH_DEMOGRPHICS" });
    this.props.dispatch({ type: "FETCH_INSURANCE_TAKEN" });
    this.props.dispatch({ type: "FETCH_SESSION_FORMAT" });
    this.props.dispatch({ type: "FETCH_SPECIALTY" });
    this.props.dispatch({ type: "FETCH_TREATMENT_APPROACHES" });
    this.props.dispatch({ type: "FETCH_LICENSE_TYPE" });
    this.props.dispatch({
      type: "FETCH_PROFILE",
      payload: { id: this.props.match.params.id || this.props.user.id },
    });
  } //end componentDidMount

  //updating component to ensure all the data makes it to props for render
  componentDidUpdate(previousProps) {
    if (
      this.state.id !== this.props.user.id &&
      previousProps.profile.id !== this.props.profile.id &&
      this.props.profile.specialty
    ) {
      //declaring new variables for state with return from syncDataEditLanguage & syncDataEditIsland
      //these functions retrieve an id based on the title of each item (ex. island title & island id)
      //the last line of this code block is commented out to demonstrate the next steps for finishing
      //the Practice Info section, which is currently not functional.

      // const updatedTreatments = this.syncDataEditTreatments("treatmentApproaches", "treatmentApproaches");

      //setting state in component update with all of the properties retrieved from props from the database
      //for this particular member's profile view.
      //as above, treatmentApproaches has been commented out
      this.setState({
        id: this.props.profile.id,
        title: this.props.profile.title,
        credentials: this.props.profile.credentials,
        licenseState: this.props.profile.license_state,
        licenseExpiration: this.props.profile.license_expiration,
        licenseNumber: this.props.profile.license_number,
        licenseType: this.props.profile.license_type,
        hiamftMemberInfo: this.props.profile.hiamft_member_account_info,
        supervisionStatus: this.props.profile.supervision_status,
        fees: this.props.profile.fees,
        telehealth: this.props.profile.telehealth,
        agesServed: this.props.profile.ages_served,
        agesServedEdit: this.props.profile.ages_served_id,
        clientFocus: this.props.profile.client_focus,
        clientFocusEdit: this.props.profile.client_focus_id,
        clientAges: this.props.profile.ages_served,
        clientAgesEdit: this.props.profile.ages_served_id,
        insurance: this.props.profile.insurance,
        insuranceEdit: this.props.profile.insurance_id,
        sessionFormat: this.props.profile.session_format,
        sessionFormatEdit: this.props.profile.session_format_id,
        specialty: this.props.profile.specialty,
        specialtyEdit: this.props.profile.specialty_id,
        treatmentPreferences: this.props.profile.treatment_preferences,
        treatmentEdit: this.props.profile.treatment_preferences_id,
        student: this.props.profile.student,
      });
    }
  } //end componentDidUpdate

  //this function handles the conditional rendering to switch between View and Edit modes
  handleEditPractice = () => {
    //setting state to indicate the Edit Basic Info button has been clicked
    this.setState({
      clickPractice: true,
    });
  }; //end handleEditPractice

  //this function saves the new information entered into the Practice Info form
  handleSavePractice = () => {
    //resetting state to indicate the Save Changes button has been clicked
    this.setState({
      clickPractice: false,
    });
    //dispatching to EditPractice saga, sending updated state as payload
    this.props.dispatch({
      type: "EDIT_PRACTICE",
      payload: this.state,
    });

    window.location.reload(false);

    this.props.dispatch({ type: "PROFILE_RESET" });

    this.props.dispatch({
      type: "FETCH_PROFILE",
      payload: { id: this.props.match.params.id || this.props.user.id },
    });
  }; //end handleSavePractice

  //handleChange resets state according to new data entered into form inputs
  handleChange = (event, propertyName) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }; //end handleChange

  handleMultiChange = (event, editPropertyName) => {
    const array = [];
    for (let option of event.target.selectedOptions) {
      array.push(Number(option.value));
    }
    this.setState({
      [editPropertyName]: array,
    });

    this.props.dispatch({
      type: "FETCH_PROFILE",
      payload: { id: this.props.match.params.id || this.props.user.id },
    });
  }; //end handleLangChange

  //handleChangeBoolean resets state according to new data entered into form inputs requiring Boolean values
  handleChangeBoolean = (event, propertyName) => {
    if (event.target.value === "true") {
      this.setState({
        [propertyName]: true,
      });
    } else {
      this.setState({
        [propertyName]: false,
      });
    }
  }; //end handleChangeBoolean

  renderTelehealth = () => {
    if (this.state.telehealth == true) {
      return "Yes, I offer telehealth.";
    } else {
      return "No, I do not offer telehealth.";
    }
  };

  displayInsurance = () => {
    if (this.state.clickPractice) {
      return (
        <Form.Group>
          <Form.Label className="label">Insurances Accepted</Form.Label>
          <Form.Control
            as="select"
            multiple={true}
            value={this.state.insuranceEdit}
            onChange={(event) => this.handleMultiChange(event, "insuranceEdit")}
          >
            {this.props.insuranceTaken.map((insurance) => {
              return (
                <>
                  <option
                    key={insurance.insurance_type_id}
                    value={insurance.insurance_type_id}
                  >
                    {insurance.title}
                  </option>
                </>
              );
            })}
          </Form.Control>
        </Form.Group>
      );
    } else {
      return (
        <Form.Group>
          <Form.Label variant="flat" className="label">
            Insurances Accepted
          </Form.Label>
          <div>
            {this.props.profile.insurance.map((insurance) => {
              return (
                <>
                  <Form.Control
                    disabled={true}
                    readOnly
                    defaultValue={insurance}
                  />
                </>
              );
            })}
          </div>
        </Form.Group>
      );
    }
  };

  // componentWillUnmount(){
  //   clearInterval(this.interval);
  // }

  render() {
    if (
      this.props.profile &&
      this.state.specialty &&
      this.state.clientFocus &&
      this.state.insurance &&
      this.state.clientAges
    ) {
      return (
        <>
          {/**Here is Practice Info render */}
          {JSON.stringify(this.state.clientAges)}
          {JSON.stringify(this.props.profile.ages_served)}
          {this.state.clickPractice ? (
            <div className="body">
              <div className="flex-between row-wrap first">
                <h4>Practice Info</h4>
                <Button
                  className="flex-between row-wrap"
                  onClick={() => this.handleSavePractice()}
                >
                  Save Changes
                </Button>
              </div>
              <div className="border">
                <Form className="flex-between row-wrap row">
                  <Form.Group className="column">
                    <Form.Label className="label">Title</Form.Label>
                    <Form.Control
                      value={this.state.title}
                      onChange={(event) => this.handleChange(event, "title")}
                    />
                  </Form.Group>
                  <Form.Group className="column">
                    <Form.Label className="label">Credentials</Form.Label>
                    <Form.Control
                      value={this.state.credentials}
                      onChange={(event) =>
                        this.handleChange(event, "credentials")
                      }
                    />
                    <Form.Text className="text-muted">
                      Please indicate the credentials you would like to have
                      listed in your HIAMFT Directory listing. Type them in as
                      they would appear following your name. Example: PhD, LMFT,
                      LP
                    </Form.Text>
                  </Form.Group>
                </Form>
                <Form className="row">
                  <Form.Group className="column">
                    <Form.Label className="label">
                      Supervision Status
                    </Form.Label>
                    <Form.Control
                      as="select"
                      value={this.state.supervisionStatus}
                      onChange={(event) =>
                        this.handleChange(event, "supervisionStatus")
                      }
                    >
                      <option value="None">None</option>
                      <option value="Hawai'i qualified">
                        Hawai'i qualified
                      </option>
                      <option value="MFT supervisor">MFT supervisor</option>
                      <option value="AAMFT approved">AAMFT-approved</option>
                      <option value="Supervisor">Supervisor</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="column">
                    <Form.Label className="label">Telehealth</Form.Label>
                    <Form.Control
                      as="select"
                      value={this.state.telehealth}
                      onChange={(event) =>
                        this.handleChangeBoolean(event, "telehealth")
                      }
                      width={"193px"}
                    >
                      <option value={true}>Yes, I offer telehealth.</option>
                      <option value={false}>
                        No, I do not offer telehealth.
                      </option>
                    </Form.Control>
                  </Form.Group>
                </Form>
                <Form className="flex-container row-wrap">
                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label className="label">License Number</Form.Label>
                      <Form.Control
                        value={this.state.licenseNumber}
                        onChange={(event) =>
                          this.handleChange(event, "licenseNumber")
                        }
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label className="label">
                        License Expiration
                      </Form.Label>
                      <Form.Control
                        type="date"
                        value={this.state.licenseExpiration}
                        onChange={(event) =>
                          this.handleChange(event, "licenseExpiration")
                        }
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label className="label">License Type</Form.Label>
                      <Form.Control
                        as="select"
                        value={this.state.licenseType}
                        onChange={(event) =>
                          this.handleChange(event, "licenseType")
                        }
                      >
                        {this.props.license.map((license) => {
                          return (
                            <option value={license.title}>
                              {license.title}
                            </option>
                          );
                        })}
                        {/* <option value="LMFT">LMFT</option>
                        <option value="LMHC">LMHC</option>
                        <option value="LP">LP</option>
                        <option value="LCSW">LCSW</option>
                        <option value="LSW">LSW</option>
                        <option value="LP">LP</option>
                        <option value="LPCC">LPCC</option>
                        <option value="Pre-Licensed (no longer a student)">Pre-Licensed (no longer a student)</option> */}
                      </Form.Control>
                    </Form.Group>
                  </Form.Row>
                </Form>

                <Form className="flex-container row-wrap">
                  {this.displayInsurance()}

                  <Form.Group>
                    <Form.Label className="label">Fees</Form.Label>
                    <InputGroup.Prepend>
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        value={this.state.fees}
                        onChange={(event) => this.handleChange(event, "fees")}
                      />
                    </InputGroup.Prepend>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="label">Session Format</Form.Label>
                    <Form.Control
                      as="select"
                      multiple={true}
                      value={this.state.sessionFormatEdit}
                      onChange={(event) =>
                        this.handleMultiChange(event, "sessionFormatEdit")
                      }
                    >
                      {this.props.sessionFormats.map((session) => {
                        return (
                          <>
                            <option
                              key={session.session_format_id}
                              value={session.session_format_id}
                            >
                              {session.title}
                            </option>
                          </>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>
                </Form>

                <Form className="flex-between row-wrap row">
                  <Form.Group className="column">
                    <Form.Label className="label">Demographic Focus</Form.Label>
                    <Form.Control
                      as="select"
                      multiple={true}
                      value={this.state.clientFocusEdit}
                      onChange={(event) =>
                        this.handleMultiChange(event, "clientFocusEdit")
                      }
                    >
                      {this.props.demographics.map((demographic) => {
                        return (
                          <>
                            <option
                              key={demographic.client_focus_id}
                              value={demographic.client_focus_id}
                            >
                              {demographic.title}
                            </option>
                          </>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="column">
                    <Form.Label className="label">Age Group Focus</Form.Label>
                    <Form.Control
                      as="select"
                      multiple={true}
                      value={this.state.clientAgesEdit}
                      onChange={(event) =>
                        this.handleMultiChange(event, "clientAgesEdit")
                      }
                    >
                      <option value="1">Any</option>
                      <option value="2">Children</option>
                      <option value="3">Adolescents</option>
                      <option value="4">Adults</option>
                      <option value="5">Elders</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
                <Form className="flex-container row-wrap row">
                  <Form.Group className="column">
                    <Form.Label className="label">Specialties</Form.Label>
                    <Form.Control
                      as="select"
                      multiple={true}
                      value={this.state.specialtyEdit}
                      onChange={(event) =>
                        this.handleMultiChange(event, "specialtyEdit")
                      }
                    >
                      {this.props.specialty.map((specialty) => {
                        return (
                          <>
                            <option
                              key={specialty.specialty_id}
                              value={specialty.specialty_id}
                            >
                              {specialty.title}
                            </option>
                          </>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="column">
                    <Form.Label className="label">
                      Treatment & Approach
                    </Form.Label>
                    <Form.Control
                      as="select"
                      multiple={true}
                      value={this.state.treatmentEdit}
                      onChange={(event) =>
                        this.handleMultiChange(event, "treatmentEdit")
                      }
                    >
                      {this.props.treatments.map((treatment) => {
                        return (
                          <>
                            <option
                              key={treatment.treatment_preferences_id}
                              value={treatment.treatment_preferences_id}
                            >
                              {treatment.title}
                            </option>
                          </>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>
                </Form>
              </div>
            </div>
          ) : (
            <div className="body">
              <div className="flex-between row-wrap first">
                <h4>Practice Info</h4>
                <Button
                  className="flex-between row-wrap"
                  onClick={() => this.handleEditPractice()}
                >
                  Edit Practice Info
                </Button>
              </div>
              <div className="border">
                <Form className="flex-between row-wrap row">
                  <Form.Group className="column">
                    <Form.Label className="label">Title</Form.Label>
                    <Form.Control
                      disabled={true}
                      readOnly
                      value={this.state.title}
                    />
                  </Form.Group>
                  <Form.Group className="column">
                    <Form.Label className="label">Credentials</Form.Label>
                    <Form.Control
                      disabled={true}
                      readOnly
                      value={this.state.credentials}
                    />
                  </Form.Group>
                </Form>
                <Form className="flex-between row-wrap row">
                  <Form.Group className="column">
                    <Form.Label className="label">
                      Supervision Status
                    </Form.Label>
                    <Form.Control
                      disabled={true}
                      readOnly
                      value={this.state.supervisionStatus}
                    />
                  </Form.Group>
                  <Form.Group className="column">
                    <Form.Label className="label">Telehealth</Form.Label>
                    <Form.Control
                      disabled={true}
                      readOnly
                      value={this.renderTelehealth()}
                    />
                  </Form.Group>
                </Form>

                <Form className="flex-container row-wrap">
                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label className="label">License Number</Form.Label>
                      <Form.Control
                        disabled={true}
                        readOnly
                        value={this.state.licenseNumber}
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label className="label">
                        License Expiration
                      </Form.Label>
                      <Form.Control
                        type="date"
                        disabled={true}
                        readOnly
                        value={this.state.licenseExpiration}
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label className="label">License Type</Form.Label>
                      <Form.Control
                        disabled={true}
                        readOnly
                        value={this.state.licenseType}
                      />
                    </Form.Group>
                  </Form.Row>
                </Form>
                <Form className="flex-container row-wrap">
                  {this.displayInsurance()}
                  <Form.Group>
                    <Form.Label className="label">Fees</Form.Label>
                    <InputGroup.Prepend>
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        disabled={true}
                        readOnly
                        value={this.state.fees}
                      />
                    </InputGroup.Prepend>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="label">Session Format</Form.Label>
                    <div>
                      {this.state.sessionFormat &&
                        this.state.sessionFormat.map((sessionFormat) => {
                          return (
                            <>
                              <Form.Control
                                disabled={true}
                                readOnly
                                value={sessionFormat}
                              />
                            </>
                          );
                        })}
                    </div>
                  </Form.Group>
                </Form>

                <Form className="flex-between row-wrap row">
                  <Form.Group className="column">
                    <Form.Label className="label">Demographic Focus</Form.Label>
                    <div>
                      {this.state.clientFocus
                        ? this.state.clientFocus.map((focus) => {
                            return (
                              <>
                                <Form.Control
                                  disabled={true}
                                  readOnly
                                  value={focus}
                                />
                              </>
                            );
                          })
                        : ""}
                    </div>
                  </Form.Group>
                  <Form.Group className="column">
                    <Form.Label className="label">Age Group Focus</Form.Label>
                    <div>
                      {this.state.clientAges
                        ? this.state.clientAges.map((focus) => {
                            return (
                              <>
                                <Form.Control
                                  disabled={true}
                                  readOnly
                                  value={focus}
                                />
                              </>
                            );
                          })
                        : ""}
                    </div>
                  </Form.Group>
                </Form>
                <Form className="flex-between row-wrap row">
                  <Form.Group className="column">
                    <Form.Label variant="flat" className="label">
                      Specialties
                    </Form.Label>
                    <div>
                      {this.state.specialty &&
                        this.state.specialty.map((specialty) => {
                          return (
                            <>
                              <Form.Control
                                disabled={true}
                                readOnly
                                value={specialty}
                              />
                            </>
                          );
                        })}
                    </div>
                  </Form.Group>
                  <Form.Group className="column">
                    <Form.Label variant="flat" className="label">
                      Treatment & Approach
                    </Form.Label>
                    <div>
                      {this.state.treatmentPreferences &&
                        this.state.treatmentPreferences.map((treatment) => {
                          return (
                            <>
                              <Form.Control
                                disabled={true}
                                readOnly
                                value={treatment}
                              />
                            </>
                          );
                        })}
                    </div>
                  </Form.Group>
                </Form>
              </div>
            </div>
          )}
        </>
      );
    } else {
      return (
        <>
          <p> user not found </p>
        </>
      );
    }
  }
}

const putReduxStateOnProps = (reduxStore) => ({
  user: reduxStore.user,
  profile: reduxStore.profile,
  treatments: reduxStore.treatmentPreferences,
  specialty: reduxStore.specialtys,
  ageGroups: reduxStore.ageGroups,
  demographics: reduxStore.demographics,
  insuranceTaken: reduxStore.insuranceTaken,
  license: reduxStore.license,
  sessionFormats: reduxStore.sessionFormats,
  student: reduxStore.student,
});

export default withRouter(connect(putReduxStateOnProps)(ProfileEdit));
