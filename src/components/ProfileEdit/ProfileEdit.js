import React, { Component } from 'react';
import {connect} from 'react-redux';
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
    clickBasic: false,
    clickContact: false,
    clickPractice: false,
    languages: [],
    languagesEdit: [],
    treatmentApproaches: [],
  };

  //mounting component - dispatching to redux sagas to call data from server for retreival from profile,
  //languages, islands & treatments reducers (props).
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_LANGUAGES" });
    this.props.dispatch({ type: "FETCH_ISLANDS" });
    this.props.dispatch({ type: "FETCH_TREATMENTS" });

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
      const updatedLanguages = this.syncDataEditLanguage(
        "languages",
        "languages"
      );
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
        address: this.props.profile.address,
        city: this.props.profile.city,
        island: this.props.profile.island,
        islandEdit: islandEdit[0].island_id,
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
        languagesEdit: updatedLanguages,
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
  syncDataEditLanguage = (reducerName, profileName) => {
    //this conditional rendering is mitigating an async issue
    if (this.props.profile[reducerName] && this.props.profile[profileName]) {
      //mapping over user's languages from profile reducer (props) and using filter method to return
      //the language object (language.id & language.title) from the languages reducer (all possibilities)
      //where the language.id is the same as the value of langauges in profile reducer
      //this allows us to get the name of the language ('Arabic') off the id ('2') retrieved from the user's profile.
      const updatedLanguages = this.props.profile[profileName].map((lang) => {
        const results = this.props[reducerName].filter(
          (object) => object.title === lang
        );
        return results[0].language_id;
      });
      return updatedLanguages;
    }
  }; //end syncDataEditLanguage

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

  //see comments above - this is commented code to render Treatments
  // syncDataEditTreatments = (reducerName, profileName) => {
  //   const updatedIsland = this.props.profile[profileName].map((treatment) => {
  //     const results = this.props[reducerName].filter(
  //      (object) => object.title === treatment)
  //     return results[0].treatment_id
  //   })
  //   return updatedTreatments;
  // }//end syncDataEditTreatments

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
      payload: {id: this.state.id, enabled: !this.state.enabled}
    });

    // Updates it locally because it doesn't update otherwise
    this.setState({
      enabled: !this.state.enabled,
    });
  }

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

  displayLanguages = () => {
    if (this.state.clickBasic) {
      return (
        <Form.Group>
          <Form.Label className="label">Languages Spoken</Form.Label>
          <Form.Control
            as="select"
            multiple="true"
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
        </Form.Group>
      );
    } else {
      return (
        <Form.Group>
          <Form.Label className="label">Languages Spoken</Form.Label>
          <div>
            {this.state.languages.map((lang) => {
              return (
                <>
                  <Form.Control disabled="true" readOnly defaultValue={lang} />
                </>
              );
            })}
          </div>
        </Form.Group>
      );
    }
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
        </Form.Group>
      );
    } else {
      return (
        <Form.Group>
          <Form.Label variant="flat" className="label">
            Island
          </Form.Label>
          {this.state.island && (
            <Form.Control
              disabled="true"
              readOnly
              defaultValue={this.state.island}
            />
          )}
        </Form.Group>
      );
    }
  };

  render() {
    if (this.props.profile && this.state.languages) {
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
                <Form className="flex-between row-wrap">
                  <Form.Group>
                    <Form.Label variant="flat" className="label">
                      Prefix
                    </Form.Label>
                    <Form.Control
                      defaultValue={this.props.profile.prefix}
                      onChange={(event) => this.handleChange(event, "prefix")}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="label">First Name</Form.Label>
                    <Form.Control
                      defaultValue={this.props.profile.first_name}
                      onChange={(event) =>
                        this.handleChange(event, "firstName")
                      }
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="label">Last Name</Form.Label>
                    <Form.Control
                      defaultValue={this.props.profile.last_name}
                      onChange={(event) => this.handleChange(event, "lastName")}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="label">Age</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={this.props.profile.age}
                      onChange={(event) => this.handleChange(event, "age")}
                    />
                    <Form.Text className="text-muted">
                      Not Listed - HIAMFT-Use Only
                    </Form.Text>
                  </Form.Group>
                  {this.displayLanguages()}
                </Form>
                <Form>
                  <Form.Group>
                    <Form.Label className="label">About You</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="5"
                      defaultValue={this.props.profile.statement}
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
                    <Form className="flex-between row-wrap">
                      <Form.Group>
                        <Form.Label className="label">Prefix</Form.Label>
                        <Form.Control
                          disabled="true"
                          readOnly
                          defaultValue={this.props.profile.prefix}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="label">First Name</Form.Label>
                        <Form.Control
                          disabled="true"
                          readOnly
                          defaultValue={this.props.profile.first_name}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="label">Last Name</Form.Label>
                        <Form.Control
                          disabled="true"
                          readOnly
                          defaultValue={this.props.profile.last_name}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="label">Age</Form.Label>
                        <Form.Control
                          disabled="true"
                          readOnly
                          defaultValue={this.props.profile.age}
                        />
                        <Form.Text className="text-muted">
                          Not Listed - HIAMFT-Use Only
                        </Form.Text>
                      </Form.Group>
                      {this.displayLanguages()}
                    </Form>
                    <Form className="last">
                      <Form.Group>
                        <Form.Label className="label">About You</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="5"
                          disabled="true"
                          readOnly
                          defaultValue={this.props.profile.statement}
                        />
                      </Form.Group>
                    </Form>
                  </div>
                </>
              )}
            </div>
          )}

          {/**Here is Contact Info render */}

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
                    <Form.Label className="label">Phone Number</Form.Label>
                    <Form.Control
                      defaultValue={this.state.phone}
                      onChange={(event) => this.handleChange(event, "phone")}
                    />
                    <Form.Text className="text-muted">
                      Business - Listed
                    </Form.Text>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="label">Email Address</Form.Label>
                    <Form.Control
                      defaultValue={this.props.profile.email}
                      onChange={(event) => this.handleChange(event, "email")}
                    />
                    <Form.Text className="text-muted">
                      Business - Listed
                    </Form.Text>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="label">Website</Form.Label>
                    <Form.Control
                      defaultValue={this.props.profile.website}
                      onChange={(event) => this.handleChange(event, "website")}
                    />
                  </Form.Group>
                </Form>
                <Form>
                  {this.displayIslands()}
                  <Form.Group>
                    <Form.Label variant="flat" className="label">
                      City
                    </Form.Label>
                    <Form.Control
                      defaultValue={this.props.profile.city}
                      onChange={(event) => this.handleChange(event, "city")}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label variant="flat" className="label">
                      Zip Code
                    </Form.Label>
                    <Form.Control
                      defaultValue={this.props.profile.zip_code}
                      onChange={(event) => this.handleChange(event, "zipCode")}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="label">Address</Form.Label>
                    <Form.Control
                      defaultValue={this.props.profile.address}
                      onChange={(event) => this.handleChange(event, "address")}
                    />
                    <Form.Text className="text-muted">
                      Business - Listed
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
                        <Form.Label className="label">Phone Number</Form.Label>
                        <Form.Control
                          disabled="true"
                          readOnly
                          defaultValue={this.state.phone}
                        />
                        <Form.Text className="text-muted">
                          Business - Listed
                        </Form.Text>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label className="label">Email Address</Form.Label>
                        <Form.Control
                          disabled="true"
                          readOnly
                          defaultValue={this.props.profile.email}
                        />
                        <Form.Text className="text-muted">
                          Business - Listed
                        </Form.Text>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label className="label">Website</Form.Label>
                        <Form.Control
                          disabled="true"
                          readOnly
                          defaultValue={this.props.profile.website}
                        />
                      </Form.Group>
                    </Form>
                    <Form>
                      {this.displayIslands()}
                      <Form.Group>
                        <Form.Label className="label">Address</Form.Label>
                        <Form.Control
                          disabled="true"
                          readOnly
                          defaultValue={this.props.profile.address}
                        />
                        <Form.Text className="text-muted">
                          Business - Listed
                        </Form.Text>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label variant="flat" className="label">
                          City
                        </Form.Label>
                        <Form.Control
                          disabled="true"
                          readOnly
                          defaultValue={this.props.profile.city}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label variant="flat" className="label">
                          Zip Code
                        </Form.Label>
                        <Form.Control
                          disabled="true"
                          readOnly
                          defaultValue={this.props.profile.zip_code}
                        />
                      </Form.Group>
                    </Form>
                  </div>
                </>
              )}
            </div>
          )}

          {/**Here is Practice Info render */}
          {/**Below is the skeleton, but the PUT functionality still needs to be written.*/}
          {/* {this.state.clickPractice ? (
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
              {this.state.enabled ? (
                <Button variant="danger" onClick={this.enablePress}>
                  Disable Account
                </Button>
              ) : (
                <Button onClick={this.enablePress}>
                  Enable Account
                </Button>
              )}
            </div>
          )} */}
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