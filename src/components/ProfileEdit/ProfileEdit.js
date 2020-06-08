import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';


//React-bootstrap imports
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//import CSS file
import "./ProfileEdit.css";
import "../App/App.css";


//setting state for conditional rendering, and also declaring props holding
class ProfileEdit extends Component {
  state = {
    id: 0,
    clickBasic: false,
    clickContact: false,
    clickPractice: false,
    languages: [],
    languagesEdit: [],
    treatmentApproaches: [],
  };

  //dispatching to redux sagas to call data from server for retreival from profile, languages, islands & treatments reducers
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_LANGUAGES" });
    this.props.dispatch({ type: "FETCH_ISLANDS" });
    this.props.dispatch({ type: "FETCH_TREATMENTS" });
    this.props.dispatch({
      type: "FETCH_PROFILE",
      payload: { id: this.props.user.id },
    });
  }
//updating component 
  componentDidUpdate(previousProps) {
    if (
      this.state.id !== this.props.user.id &&
      previousProps.profile.id !== this.props.profile.id &&
      this.props.profile.phone
    ) {
      // setting new prop for 
      const updatedLanguages = this.syncDataEdit("languages", "languages");
      const updatedIsland = this.syncDataEditIsland("islands", "island");
      // const updatedTreatments = this.syncDataEditTreatments("treatmentApproaches", "treatmentApproaches");
      this.setState({
        id: this.props.profile.id,
        prefix: this.props.profile.prefix,
        firstName: this.props.profile.first_name,
        lastName: this.props.profile.last_name,
        title: this.props.profile.title,
        age: this.props.profile.age,
        phone: this.props.profile.phone[0],
        address: this.props.profile.address,
        city: this.props.profile.city,
        island: this.props.profile.island,
        islandEdit: updatedIsland,
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
  }

  //using syncDataEdit in componentDidUpdate to get IDs on values for Edit
  //the reducerName is the reducer that holds the array of object with ids & values
  //the profileName is the property in the profile that holds just the values
  //If Mark changes query returning profile results, this could be generic (see: language_id -> id)
  syncDataEdit = (reducerName, profileName) => {
    console.log(this.props[reducerName], this.props.profile[profileName]);
    if (this.props[reducerName] && this.props.profile[profileName]) {
      const updatedLanguages = this.props.profile[profileName].map((lang) => {
        const results = this.props[reducerName].filter(
          (object) => object.title === lang
        );
        console.log("heres results !!!!!!!", results);
        return results[0].language_id;
      });
      return updatedLanguages;
    }
  };

  syncDataEditIsland = (reducerName, profileName) => {
    console.log(this.props[reducerName], this.props.profile[profileName]);
    if (this.props[reducerName] && this.props.profile[profileName]) {
      const updatedIsland = this.props.profile[profileName].map((island) => {
        const results = this.props[reducerName].filter(
          (object) => object.title === island
        );
        console.log("heres results !!!!!!!", results);
        return results;
        // results[0].island_id
      });
      return updatedIsland;
    }
  };

  // syncDataEditTreatments = (reducerName, profileName) => {
  //   const updatedIsland = this.props.profile[profileName].map(island => {
  //     const results = this.props[reducerName].filter(object => object.title === island)
  //     console.log('heres results !!!!!!!', results);
  //     return (
  //       results
  //       // results[0].island_id
  //     );
  //   })
  //   return updatedIsland;
  // }

  handleEditBasic = () => {
    this.setState({
      clickBasic: true,
    });
  };

  handleSaveBasic = () => {
    this.setState({
      clickBasic: false,
    });
    this.props.dispatch({
      type: "EDIT_PROFILE",
      payload: this.state,
    });
  };

  handleEditContact = () => {
    this.setState({
      clickContact: true,
    });
  };

  handleSaveContact = () => {
    this.setState({
      clickContact: false,
    });
    this.props.dispatch({
      type: "EDIT_PROFILE",
      payload: this.state,
    });
  };

  handleEditPractice = () => {
    this.setState({
      clickPractice: true,
    });
  };

  handleSavePractice = () => {
    this.setState({
      clickPractice: false,
    });
  };

  handleChange = (event, propertyName) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  //every multiselect needs its own handleObjectChange
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
  };

  handleIslandChange = (event, editPropertyName, viewPropertyName) => {
    console.log(
      "here is event.target.selected.options &&&&&&&",
      event.target.selectedOptions
    );
    const array = [];
    for (let option of event.target.selectedOptions) {
      array.push(Number(option.value));
    }
    const updatedIsland = array.map((id) => {
      const results = this.props.islands.filter(
        (object) => object.island_id === id
      );
      console.log("heres results !!!!!!!", results);
      return results[0].title;
    });
    console.log("heres updatedIsland $$$$$$$", updatedIsland);
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
      console.log(
        "here is state.languages KRISTEN AND MARY",
        this.state.languages
      );
      return (
        <Form.Group>
          <Form.Label className="label">Languages Spoken</Form.Label>
          <div>
              {this.state.languages.map((lang) => {
                return (
                  <>
                    <Form.Control
                      disabled="true"
                      readOnly
                      defaultValue={lang}
                    />
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
            {/* {JSON.stringify(this.props.profile)} */}
            {/* <br></br>
          <br/> */}
            {/* {JSON.stringify(this.state)} */}
            {/* 
          <br/>
          <br/> */}
            {/* {JSON.stringify(this.props.treatments)} */}
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
                <Form className="flex-between row-wrap first ">
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
                    <Form className="flex-between row-wrap first">
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
              <div className="flex-between row-wrap">
                <h4>Contact Info</h4>
                <Button
                  className="flex-between row-wrap"
                  onClick={() => this.handleSaveContact()}
                >
                  Save Changes
                </Button>
              </div>
              <div className="border">
                <Form className="first">
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
              <div className="flex-between row-wrap">
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
                    <Form className="first">
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