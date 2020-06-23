import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


//React Botstrap imports
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//CSS file imports
import "./ProfileEdit.css";
import "../App/App.css";



class ProfileEdit extends Component {
    //setting state, particularly for conditional render of Basic, Contact & Practice sections
    state = {
        id: 0,
        clickPractice: false,
        treatmentApproaches: [],
    };

    //mounting component - dispatching to redux sagas to call data from server for retreival from profile,
    //languages, islands & treatments reducers (props).
    componentDidMount() {
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
            this.props.profile.phone
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
                enabled: this.props.profile.enabled,
                prefix: this.props.profile.prefix,
                firstName: this.props.profile.first_name,
                lastName: this.props.profile.last_name,
                title: this.props.profile.title,
                age: this.props.profile.age,
                phone: this.props.profile.phone[0],
                address: this.props.profile.address,
                city: this.props.profile.city,
                island: this.props.profile.island,
                email: this.props.profile.email,
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
                treatmentApproaches: this.props.treatmentPreferences,
                // treatmentAproachesEdit: updatedTreatments,
                agesServed: this.props.profile.ages_served,
                clientFocus: this.props.profile.client_focus,
                insurance: this.props.profile.insurance,
                sessionFormat: this.props.profile.session_format,
                specialty: this.props.profile.speciaty,
                treatmentPreferences: this.props.profile.treatment_preferences,
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
    }; //end handleSavePractice

    //handleChange resets state according to new data entered into form inputs
    handleChange = (event, propertyName) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }; //end handleChange

      //see comments above - this is commented code to render Treatments
  // syncDataEditTreatments = (reducerName, profileName) => {
  //   const updatedIsland = this.props.profile[profileName].map((treatment) => {
  //     const results = this.props[reducerName].filter(
  //      (object) => object.title === treatment)
  //     return results[0].treatment_id
  //   })
  //   return updatedTreatments;
  // }//end syncDataEditTreatments

    render() {
        if (this.props.profile && this.state.languages) {
            return (
                <>
                    {/**Here is Practice Info render */}
                    {/**Below is the skeleton, but the PUT functionality still needs to be written.*/}
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
                <Form className="flex-between row-wrap">
                  <Form.Group>
                    <Form.Label className="label">Title</Form.Label>
                    <Form.Control
                      defaultValue={this.props.profile.title}
                      onChange={(event) => this.handleChange(event, "title")}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="label">Credentials</Form.Label>
                    <Form.Control
                      defaultValue={this.props.profile.credentials}
                      onChange={(event) =>
                        this.handleChange(event, "credentials")
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="label">
                      Supervision Status
                    </Form.Label>
                    <Form.Control
                      defaultValue={this.props.profile.supervisionStatus}
                      onChange={(event) =>
                        this.handleChange(event, "supervisionStatus")
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="label">Telehealth</Form.Label>
                    <Form.Control
                      defaultValue={this.props.profile.telehealth}
                      onChange={(event) =>
                        this.handleChange(event, "telehealth")
                      }
                    />
                  </Form.Group>
                </Form>
                <Form className="flex-between row-wrap">
                  <Form.Group>
                    <Form.Label className="label">License Number</Form.Label>
                    <Form.Control
                      defaultValue={this.props.profile.licenseNumber}
                      onChange={(event) =>
                        this.handleChange(event, "licenseNumber")
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="label">
                      License Expiration Date
                    </Form.Label>
                    <Form.Control
                      defaultValue={this.props.profile.licenseExpiration}
                      onChange={(event) =>
                        this.handleChange(event, "licenseExpiration")
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="label">License Type</Form.Label>
                    <Form.Control
                      defaultValue={this.props.profile.licenseType}
                      onChange={(event) =>
                        this.handleChange(event, "licenseType")
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="label">Fees</Form.Label>
                    <Form.Control
                      defaultValue={this.props.profile.fees}
                      onChange={(event) => this.handleChange(event, "fees")}
                    />
                  </Form.Group>
                </Form>
                <Form>
                  <Form.Group>
                    <Form.Label variant="flat" className="label">
                      Treatment & Approaches
                    </Form.Label>
                    <Form.Control
                      defaultValue={this.props.profile.treatmentPreferences}
                      onChange={(event) =>
                        this.handleChange(event, "treatmentPreferences")
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label variant="flat" className="label">
                      Specialties
                    </Form.Label>
                    <Form.Control
                      defaultValue={this.props.profile.specialties}
                      onChange={(event) =>
                        this.handleChange(event, "specialties")
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label variant="flat" className="label">
                      Insurances Taken
                    </Form.Label>
                    <Form.Control
                      defaultValue={this.props.profile.insurance}
                      onChange={(event) =>
                        this.handleChange(event, "insurance")
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="label">Client Focus</Form.Label>
                    <Form.Control
                      defaultValue={this.props.profile.clientFocus}
                      onChange={(event) =>
                        this.handleChange(event, "clientFocus")
                      }
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="label">Session Format</Form.Label>
                    <Form.Control
                      defaultValue={this.props.profile.sessionFormat}
                      onChange={(event) =>
                        this.handleChange(event, "sessionFormat")
                      }
                    />
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
                <Form className="flex-between row-wrap">
                  <Form.Group>
                    <Form.Label className="label">Title</Form.Label>
                    <Form.Control
                      disabled="true"
                      readOnly
                      defaultValue={this.props.profile.title}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="label">Credentials</Form.Label>
                    <Form.Control
                      disabled="true"
                      readOnly
                      defaultValue={this.props.profile.credentials}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="label">
                      Supervision Status
                    </Form.Label>
                    <Form.Control
                      disabled="true"
                      readOnly
                      defaultValue={this.props.profile.supervisionStatus}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="label">Telehealth</Form.Label>
                    <Form.Control
                      disabled="true"
                      readOnly
                      defaultValue={this.props.profile.telehealth}
                    />
                  </Form.Group>
                </Form>
                <Form className="flex-between row-wrap">
                  <Form.Group>
                    <Form.Label className="label">License Number</Form.Label>
                    <Form.Control
                      disabled="true"
                      readOnly
                      defaultValue={this.props.profile.licenseNumber}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="label">
                      License Expiration Date
                    </Form.Label>
                    <Form.Control
                      disabled="true"
                      readOnly
                      defaultValue={this.props.profile.licenseExpiration}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="label">License Type</Form.Label>
                    <Form.Control
                      disabled="true"
                      readOnly
                      defaultValue={this.props.profile.licenseType}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="label">Fees</Form.Label>
                    <Form.Control
                      disabled="true"
                      readOnly
                      defaultValue={this.props.profile.fees}
                    />
                  </Form.Group>
                </Form>
                <Form>
                  <Form.Group>
                    <Form.Label variant="flat" className="label">
                      Treatment & Approaches
                    </Form.Label>
                    <Form.Control
                      disabled="true"
                      readOnly
                      defaultValue={this.props.profile.treatmentPreferences}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label variant="flat" className="label">
                      Specialties
                    </Form.Label>
                    <Form.Control
                      disabled="true"
                      readOnly
                      defaultValue={this.props.profile.specialties}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label variant="flat" className="label">
                      Insurances Taken
                    </Form.Label>
                    <Form.Control
                      disabled="true"
                      readOnly
                      defaultValue={this.props.profile.insurance}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="label">Client Focus</Form.Label>
                    <Form.Control
                      disabled="true"
                      readOnly
                      defaultValue={this.props.profile.clientFocus}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="label">Session Format</Form.Label>
                    <Form.Control
                      disabled="true"
                      readOnly
                      defaultValue={this.props.profile.sessionFormat}
                    />
                  </Form.Group>
                </Form>
              </div>
            </div>
          )}
                </>
            );
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
    treatments: reduxStore.treatmentPreferences
});

export default withRouter(connect(putReduxStateOnProps)(ProfileEdit));
