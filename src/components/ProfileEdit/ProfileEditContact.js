import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


//React Botstrap imports
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//CSS file imports
import "./ProfileEdit.css";
import "../App/App.css";



class ProfileEditContact extends Component {
    //setting state, particularly for conditional render of Basic, Contact & Practice sections
    state = {
        id: 0,
        clickContact: false,
    };

    //mounting component - dispatching to redux sagas to call data from server for retreival from profile,
    //languages, islands & treatments reducers (props).
    componentDidMount() {
        this.props.dispatch({ type: "FETCH_ISLANDS" });
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

            const updatedIsland = this.syncDataEditIsland("islands", "island");
            const islandEdit = updatedIsland[0];
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
                phonePersonal: this.props.profile.phone_personal[0],
                address: this.props.profile.address,
                addressPersonal: this.props.profile.address_personal[0],
                city: this.props.profile.city,
                cityPersonal: this.props.profile.city_personal,
                island: this.props.profile.island,
                islandEdit: islandEdit[0].island_id,
                email: this.props.profile.email,
                emailPersonal: this.props.profile.email_personal,
                zipCode: this.props.profile.zip_code,
                zipCodePersonal: this.props.profile.zip_code_personal,
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
                // languagesEdit: updatedLanguages,
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

    //the syncDataEdit functions are called in componentDidUpdate to get IDs on values to be edited.
    //the reducerName is the reducer that holds the array of objects with ids & values (all of the options from the DB)
    //the profileName is the property in the profile that holds just the values for this specific user
    //reducerName & profileName as arguments were written in the general sense originally to try to make this a
    //generic function. Due to the way the database is set up, we found it easier in this instance to write a new
    //function for each reducer & corresponding property to retrieve IDs for property titles.
    //with some changes to the database, the following functions could become one generic function to be called to sync data.
   

    //see comments above
    syncDataEditIsland = (reducerName, profileName) => {
        if (this.props[reducerName] && this.props.profile[profileName]) {
            const updatedIsland = this.props.profile[profileName].map((island) => {
                const results = this.props[reducerName].filter(
                    (object) => object.title === island
                );
                return results;
            });
            return updatedIsland;
        }
    }; //end syncDataEditIsland

    //this function handles the conditional rendering to switch between View and Edit modes
    handleEditContact = () => {
        //setting state to indicate the Edit Basic Info button has been clicked
        this.setState({
            clickContact: true,
        });
    }; //end handleEditContact

    //this function saves the new information entered into the Contact Info form
    handleSaveContact = () => {
        //resetting state to indicate the Save Changes button has been clicked
        this.setState({
            clickContact: false,
        });
        //dispatching to EditContact saga, sending updated state as payload
        this.props.dispatch({
            type: "EDIT_CONTACT",
            payload: this.state,
        });
    }; //end handleSaveContact

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
    //see comments directly above
    handleIslandChange = (event, editPropertyName, viewPropertyName) => {
        const array = [];
        for (let option of event.target.selectedOptions) {
            array.push(Number(option.value));
        }
        const updatedIsland = array.map((id) => {
            const results = this.props.islands.filter(
                (object) => object.island_id === id
            );
            return results[0].title;
        });
        this.setState({
            [editPropertyName]: array,
            [viewPropertyName]: updatedIsland,
        });
    };

    displayIslands = () => {
        if (this.state.clickContact) {
            return (
              <Form.Group>
                <Form.Label variant="flat" className="label">
                  Island
                </Form.Label>
                <Form.Control
                  as="select"
                  value={this.state.islandEdit}
                  onChange={(event) =>
                    this.handleIslandChange(event, "islandEdit", "island")
                  }
                >
                  {this.props.islands.map((island) => {
                    return (
                      <>
                        <option key={island.island_id} value={island.island_id}>
                          {island.title}
                        </option>
                      </>
                    );
                  })}
                </Form.Control>
                <Form.Text className="text-muted">
                  Listed
                </Form.Text>
              </Form.Group>
            );
        } else {
            return (
                <Form.Group>
                    <Form.Label variant="flat" className="label">
                        Island
                    </Form.Label>
                    {this.state.island && (
                        <>
                        <Form.Control
                            disabled={true}
                            readOnly
                            defaultValue={this.state.island}
                        />
                        <Form.Text className="text-muted">
                                Listed
                              </Form.Text>
                        </>
                    )}
                </Form.Group>
            );
        }
    };

    render() {
        if (this.props.profile && this.state.languages) {
            return (
              <>
                {this.state.clickContact && this.props.profile ? (
                  <div className="body">
                    <div className="flex-between row-wrap first">
                      <h4>Contact Info</h4>
                      <Button
                        className="flex-between row-wrap"
                        onClick={() => this.handleSaveContact()}
                      >
                        Save Changes
                      </Button>
                    </div>
                    <div className="border">
                      <Form>
                        <Form.Group>
                          <Form.Label className="label">
                            Email Address - Business
                          </Form.Label>
                          <Form.Control
                            defaultValue={this.props.profile.email}
                            onChange={(event) =>
                              this.handleChange(event, "email")
                            }
                          />
                          <Form.Text className="text-muted">Listed</Form.Text>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label className="label">
                            Email Address - Personal
                          </Form.Label>
                          <Form.Control
                            defaultValue={this.props.profile.email_personal}
                            onChange={(event) =>
                              this.handleChange(event, "emailPersonal")
                            }
                          />
                          <Form.Text className="text-muted">
                            Not Listed (for HIAMFT-use only)
                          </Form.Text>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label className="label">Website</Form.Label>
                          <Form.Control
                            defaultValue={this.props.profile.website}
                            onChange={(event) =>
                              this.handleChange(event, "website")
                            }
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label className="label">
                            Phone Number - Business
                          </Form.Label>
                          <Form.Control
                            defaultValue={this.state.phone}
                            onChange={(event) =>
                              this.handleChange(event, "phone")
                            }
                          />
                          <Form.Text className="text-muted">Listed</Form.Text>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label className="label">
                            Phone Number - Personal
                          </Form.Label>
                          <Form.Control
                            defaultValue={this.state.phone_personal}
                            onChange={(event) =>
                              this.handleChange(event, "phonePersonal")
                            }
                          />
                          <Form.Text className="text-muted">
                            Not Listed (for HIAMFT-use only)
                          </Form.Text>
                        </Form.Group>
                      </Form>
                      <Form>
                        {this.displayIslands()}

                        <Form.Group>
                          <Form.Label className="label">
                            Address - Business
                          </Form.Label>
                          <Form.Control
                            defaultValue={this.props.profile.address}
                            onChange={(event) =>
                              this.handleChange(event, "address")
                            }
                          />
                          <Form.Text className="text-muted">Listed</Form.Text>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label variant="flat" className="label">
                            City - Business
                          </Form.Label>
                          <Form.Control
                            defaultValue={this.props.profile.city}
                            onChange={(event) =>
                              this.handleChange(event, "city")
                            }
                          />
                          <Form.Text className="text-muted">Listed</Form.Text>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label variant="flat" className="label">
                            Zip Code - Business
                          </Form.Label>
                          <Form.Control
                            defaultValue={this.props.profile.zip_code}
                            onChange={(event) =>
                              this.handleChange(event, "zipCode")
                            }
                          />
                          <Form.Text className="text-muted">Listed</Form.Text>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label className="label">
                            Address - Personal
                          </Form.Label>
                          <Form.Control
                            defaultValue={this.props.profile.address_personal}
                            onChange={(event) =>
                              this.handleChange(event, "addressPersonal")
                            }
                          />
                          <Form.Text className="text-muted">
                            Not Listed (for HIAMFT-use only)
                          </Form.Text>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label variant="flat" className="label">
                            City - Personal
                          </Form.Label>
                          <Form.Control
                            defaultValue={this.props.profile.city_personal}
                            onChange={(event) =>
                              this.handleChange(event, "cityPersonal")
                            }
                          />
                          <Form.Text className="text-muted">
                            Not Listed (for HIAMFT-use only)
                          </Form.Text>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label variant="flat" className="label">
                            Zip Code - Personal
                          </Form.Label>
                          <Form.Control
                            defaultValue={this.props.profile.zip_code_personal}
                            onChange={(event) =>
                              this.handleChange(event, "zipCodePersonal")
                            }
                          />
                          <Form.Text className="text-muted">
                            Not Listed (for HIAMFT-use only)
                          </Form.Text>
                        </Form.Group>
                      </Form>
                    </div>
                  </div>
                ) : (
                  <div className="body">
                    <div className="flex-between row-wrap first">
                      <h4>Contact Info</h4>
                      <Button
                        className="flex-between row-wrap first"
                        onClick={() => this.handleEditContact()}
                      >
                        Edit Contact Info
                      </Button>
                    </div>
                    {this.props.profile && (
                      <>
                        <div className="border">
                          <Form>
                            <Form.Group>
                              <Form.Label className="label">
                                Email Address - Business
                              </Form.Label>
                              <Form.Control
                                disabled={true}
                                readOnly
                                defaultValue={this.state.email}
                              />
                              <Form.Text className="text-muted">
                                Listed
                              </Form.Text>
                            </Form.Group>

                            <Form.Group>
                              <Form.Label className="label">
                                Email Address - Personal
                              </Form.Label>
                              <Form.Control
                                disabled={true}
                                readOnly
                                defaultValue={this.state.emailPersonal}
                              />
                              <Form.Text className="text-muted">
                                Not Listed (for HIAMFT-use only)
                              </Form.Text>
                            </Form.Group>

                            <Form.Group>
                              <Form.Label className="label">Website</Form.Label>
                              <Form.Control
                                disabled={true}
                                readOnly
                                defaultValue={this.state.website}
                              />
                            </Form.Group>

                            <Form.Group>
                              <Form.Label className="label">
                                Phone Number - Business
                              </Form.Label>
                              <Form.Control
                                disabled={true}
                                readOnly
                                defaultValue={this.state.phone}
                              />
                              <Form.Text className="text-muted">
                                Listed
                              </Form.Text>
                            </Form.Group>

                            <Form.Group>
                              <Form.Label className="label">
                                Phone Number - Personal
                              </Form.Label>
                              <Form.Control
                                disabled={true}
                                readOnly
                                defaultValue={this.state.phonePersonal}
                              />
                              <Form.Text className="text-muted">
                                Not Listed (for HIAMFT-use only)
                              </Form.Text>
                            </Form.Group>
                          </Form>
                          <Form>
                            {this.displayIslands()}

                            <Form.Group>
                              <Form.Label className="label">
                                Address - Business
                              </Form.Label>
                              <Form.Control
                                disabled={true}
                                readOnly
                                defaultValue={this.state.address}
                              />
                              <Form.Text className="text-muted">
                                Listed
                              </Form.Text>
                            </Form.Group>

                            <Form.Group>
                              <Form.Label variant="flat" className="label">
                                City - Business
                              </Form.Label>
                              <Form.Control
                                disabled={true}
                                readOnly
                                defaultValue={this.state.city}
                              />
                              <Form.Text className="text-muted">
                                Listed
                              </Form.Text>
                            </Form.Group>

                            <Form.Group>
                              <Form.Label variant="flat" className="label">
                                Zip Code - Business
                              </Form.Label>
                              <Form.Control
                                disabled={true}
                                readOnly
                                defaultValue={this.state.zipCode}
                              />
                              <Form.Text className="text-muted">
                                Listed
                              </Form.Text>
                            </Form.Group>

                            <Form.Group>
                              <Form.Label className="label">
                                Address - Personal
                              </Form.Label>
                              <Form.Control
                                disabled={true}
                                readOnly
                                defaultValue={this.state.addressPersonal}
                              />
                              <Form.Text className="text-muted">
                                Not Listed (for HIAMFT-use only)
                              </Form.Text>
                            </Form.Group>

                            <Form.Group>
                              <Form.Label variant="flat" className="label">
                                City - Personal
                              </Form.Label>
                              <Form.Control
                                disabled={true}
                                readOnly
                                defaultValue={this.state.cityPersonal}
                              />
                              <Form.Text className="text-muted">
                                Not Listed (for HIAMFT-use only)
                              </Form.Text>
                            </Form.Group>

                            <Form.Group>
                              <Form.Label variant="flat" className="label">
                                Zip Code - Personal
                              </Form.Label>
                              <Form.Control
                                disabled={true}
                                readOnly
                                defaultValue={this.state.zipCodePersonal}
                              />
                              <Form.Text className="text-muted">
                                Not Listed (for HIAMFT-use only)
                              </Form.Text>
                            </Form.Group>
                          </Form>
                        </div>
                      </>
                    )}
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

export default withRouter(connect(putReduxStateOnProps)(ProfileEditContact));