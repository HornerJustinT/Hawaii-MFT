import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';


//React-bootstrap imports
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//import CSS file
import "./ProfileEdit.css";
import "../App/App.css";



class ProfileEdit extends Component {
  state = {
    clickBasic: false,
    clickContact: false,
    clickPractice: false,
    languages: [],
    languagesEdit: [],
    islands: [],
    treatmentApproaches: [],
  };
  
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_LANGUAGES" });
    this.props.dispatch({ type: "FETCH_ISLANDS" });
    this.props.dispatch({ type: "FETCH_TREATMENTS" });
    this.props.dispatch({
      type: "FETCH_PROFILE",
      payload: this.props.match.params,
    });
  }

//
  componentDidUpdate() {
    if (this.state.id !== this.props.match.params && this.props.languages.length > 0 && this.props.profile[0]) {
      const updatedLanguages = this.syncDataEdit("languages", "languages");
      const updatedIsland = this.syncDataEditIsland("islands", "island");
      // const updatedTreatments = this.syncDataEditTreatments("treatmentApproaches", "treatmentApproaches");
      this.setState({
        id: this.props.match.params,
        prefix: this.props.profile[0].prefix,
        firstName: this.props.profile[0].first_name,
        lastName: this.props.profile[0].last_name,
        title: this.props.profile[0].title,
        age: this.props.profile[0].age,
        phone: this.props.profile[0].phone,
        address: this.props.profile[0].address,
        city: this.props.profile[0].city,
        island: this.props.profile[0].island,
        islandEdit: updatedIsland,
        email: this.props.profile[0].email,
        zipCode: this.props.profile[0].zip_code,
        website: this.props.profile[0].website,
        credentials: this.props.profile[0].credentials,
        licenseState: this.props.profile[0].license_state,
        licenseExpiration: this.props.profile[0].license_expiration,
        licenseNumber: this.props.profile[0].license_number,
        licenseType: this.props.profile[0].license_type,
        hiamftMemberInfo: this.props.profile[0].hiamft_member_account_info,
        supervisionStatus: this.props.profile[0].supervision_status,
        fees: this.props.profile[0].fees,
        telehealth: this.props.profile[0].telehealth,
        statement: this.props.profile[0].statement,
        languages: this.props.profile[0].languages,
        languagesEdit: updatedLanguages,
        treatmentApproaches: this.props.treatmentPreferences,
        // treatmentAproachesEdit: updatedTreatments,
        agesServed: this.props.profile[0].ages_served,
        clientFocus: this.props.profile[0].client_focus,
        insurance: this.props.profile[0].insurance,
        sessionFormat: this.props.profile[0].session_format,
        specialty: this.props.profile[0].speciaty,
        treatmentPreferences: this.props.profile[0].treatment_preferences,
      });
    }
  }

//using syncDataEdit in componentDidUpdate to get IDs on values for Edit
//the reducerName is the reducer that holds the array of object with ids & values
//the profileName is the property in the profile that holds just the values
//If Mark changes query returning profile results, this could be generic (see: language_id -> id)
  syncDataEdit = (reducerName, profileName) => {
    if (this.props[reducerName] && this.props.profile[0]) {
      const updatedLanguages = this.props.profile[0][profileName].map(
        (lang) => {
          const results = this.props[reducerName].filter(
            (object) => object.title === lang
          );
          console.log("heres results !!!!!!!", results);
          return results[0].language_id;
        }
      );
      return updatedLanguages;
    }
    
  }

  syncDataEditIsland = (reducerName, profileName) => {
    if (this.props[reducerName] && this.props.profile[0]) {
      const updatedIsland = this.props.profile[0][profileName].map((island) => {
        const results = this.props[reducerName].filter(
          (object) => object.title === island
        );
        console.log("heres results !!!!!!!", results);
        return results;
        // results[0].island_id
      });
      return updatedIsland;
    }
  }

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
    for(let option of event.target.selectedOptions){
      array.push(Number(option.value))
    }
    const updatedLanguages = array.map(id => {
      const results = this.props.languages.filter(object => object.language_id === id)
      return (
        results[0].title
      );
    })
    this.setState({
      [editPropertyName]: array,
      [viewPropertyName]: updatedLanguages,
    });
  };

  handleIslandChange = (event, editPropertyName, viewPropertyName) => {
    console.log('here is event.target.selected.options &&&&&&&', event.target.selectedOptions);
    const array = [];
    for (let option of event.target.selectedOptions) {
      array.push(Number(option.value))
    }
    const updatedIsland = array.map(id => {
      const results = this.props.islands.filter(object => object.island_id === id)
      console.log('heres results !!!!!!!', results)
      return (
        results[0].title
      );
    })
    console.log('heres updatedIsland $$$$$$$', updatedIsland)
    this.setState({
      [editPropertyName]: array,
      [viewPropertyName]: updatedIsland,
    });
  };

  displayLanguages = () => {
    if(this.state.clickBasic){
      return(
          <Form.Group>
            <Form.Label className="label">Languages Spoken</Form.Label>
            <Form.Control as="select"
              multiple="true"
              value={this.state.languagesEdit}
              onChange={(event) => this.handleLangChange(event, "languagesEdit", "languages")}>
              {this.props.languages.map(lang => {
                return (
                  <>
                    <option key={lang.language_id} value={lang.language_id}>{lang.title}</option>
                  </>
                );
              })}
            </Form.Control>
          </Form.Group>
      );
    }else{
      return(
      <Form.Group>
        <Form.Label className="label">Languages Spoken</Form.Label>
        <div>
          <ul>
            {this.state.languages.map((lang) => {
              return (
                <>
                  <li>{lang}</li>
                </>
              );
            })
            }
          </ul>
        </div>
      </Form.Group>
      );
    }
  }

  displayIslands = () => {
    if (this.state.clickContact) {
      return (
          <Form.Group>
            <Form.Label variant="flat" className="label">
              Island
                </Form.Label>
            <Form.Control as="select"
              value={this.state.islandEdit}
              onChange={(event) => this.handleIslandChange(event, "islandEdit", "island")}>
              {this.props.islands.map(island => {
                return (
                  <>
                    <option key={island.island_id} value={island.island_id}>{island.title}</option>
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
              plaintext
              readOnly
              defaultValue={this.state.island}
            />
          )}
        </Form.Group>
      );
    }
  }


 
  render() {
    if (this.props.profile[0]) {
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
              <Button
                className="flex-between row-wrap"
                onClick={() => this.handleSaveBasic()}
              >
                Save Changes
              </Button>
              <Form className="flex-between row-wrap">
                <Form.Group>
                  <Form.Label variant="flat" className="label">
                    Prefix
                  </Form.Label>
                  <Form.Control
                    defaultValue={this.props.profile[0].prefix}
                    onChange={(event) => this.handleChange(event, "prefix")}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="label">First Name</Form.Label>
                  <Form.Control
                    defaultValue={this.props.profile[0].first_name}
                    onChange={(event) => this.handleChange(event, "firstName")}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="label">Last Name</Form.Label>
                  <Form.Control
                    defaultValue={this.props.profile[0].last_name}
                    onChange={(event) => this.handleChange(event, "lastName")}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="label">Age</Form.Label>
                  <Form.Control
                    type="number"
                    defaultValue={this.props.profile[0].age}
                    onChange={(event) => this.handleChange(event, "age")}
                  />
                  <Form.Text className="text-muted">
                    Not Listed - HIAMFT-Use Only
                  </Form.Text>
                </Form.Group>
                {this.displayLanguages()}
                <Form.Group>
                  <Form.Label className="label">About You</Form.Label>
                  <Form.Control
                    defaultValue={this.props.profile[0].statement}
                    onChange={(event) => this.handleChange(event, "statement")}
                  />
                </Form.Group>
              </Form>
            </div>
          ) : (
            <div className="body">
              <Button
                className="flex-between row-wrap"
                onClick={() => this.handleEditBasic()}
              >
                Edit Basic Info
              </Button>
              {this.props.profile[0] && (
                <>
                  <Form className="flex-between row-wrap">
                    <Form.Group>
                      <Form.Label className="label">Prefix</Form.Label>
                      <Form.Control
                        disabled="true"
                        plaintext
                        readOnly
                        defaultValue={this.props.profile[0].prefix}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="label">First Name</Form.Label>
                      <Form.Control
                        disabled="true"
                        plaintext
                        readOnly
                        defaultValue={this.props.profile[0].first_name}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="label">Last Name</Form.Label>
                      <Form.Control
                        disabled="true"
                        plaintext
                        readOnly
                        defaultValue={this.props.profile[0].last_name}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="label">Age</Form.Label>
                      <Form.Control
                        disabled="true"
                        plaintext
                        readOnly
                        defaultValue={this.props.profile[0].age}
                      />
                      <Form.Text className="text-muted">
                        Not Listed - HIAMFT-Use Only
                      </Form.Text>
                    </Form.Group>
                    {this.displayLanguages()}
                    <Form.Group>
                      <Form.Label className="label">About You</Form.Label>
                      <Form.Control
                        disabled="true"
                        plaintext
                        readOnly
                        defaultValue={this.props.profile[0].statement}
                      />
                    </Form.Group>
                  </Form>
                </>
              )}
            </div>
          )}

          {/**Here is Contact Info render */}

          {this.state.clickContact && this.props.profile[0] ? (
            <div className="body">
              <Button
                className="flex-between row-wrap"
                onClick={() => this.handleSaveContact()}
              >
                Save Changes
              </Button>
              <Form className="flex-between row-wrap">
                {this.displayIslands()}
                <Form.Group>
                  <Form.Label variant="flat" className="label">
                    City
                  </Form.Label>
                  <Form.Control
                    defaultValue={this.props.profile[0].city}
                    onChange={(event) => this.handleChange(event, "city")}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label variant="flat" className="label">
                    Zip Code
                  </Form.Label>
                  <Form.Control
                    defaultValue={this.props.profile[0].zip_code}
                    onChange={(event) => this.handleChange(event, "zipCode")}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="label">Phone Number</Form.Label>
                  <Form.Control
                    defaultValue={this.props.profile[0].phone}
                    onChange={(event) => this.handleChange(event, "phone")}
                  />
                  <Form.Text className="text-muted">
                    Business - Listed
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="label">Email Address</Form.Label>
                  <Form.Control
                    defaultValue={this.props.profile[0].email}
                    onChange={(event) => this.handleChange(event, "email")}
                  />
                  <Form.Text className="text-muted">
                    Business - Listed
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="label">Website</Form.Label>
                  <Form.Control
                    defaultValue={this.props.profile[0].website}
                    onChange={(event) => this.handleChange(event, "website")}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="label">Address</Form.Label>
                  <Form.Control
                    defaultValue={this.props.profile[0].address}
                    onChange={(event) => this.handleChange(event, "address")}
                  />
                  <Form.Text className="text-muted">
                    Business - Listed
                  </Form.Text>
                </Form.Group>
              </Form>
            </div>
          ) : (
            <div className="body">
              <Button
                className="flex-between row-wrap"
                onClick={() => this.handleEditContact()}
              >
                Edit Contact Info
              </Button>
              {this.props.profile[0] && (
                <Form className="flex-between row-wrap">
                  {this.displayIslands()}
                  <Form.Group>
                    <Form.Label variant="flat" className="label">
                      City
                    </Form.Label>
                    <Form.Control
                      disabled="true"
                      plaintext
                      readOnly
                      defaultValue={this.props.profile[0].city}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label variant="flat" className="label">
                      Zip Code
                    </Form.Label>
                    <Form.Control
                      disabled="true"
                      plaintext
                      readOnly
                      defaultValue={this.props.profile[0].zip_code}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="label">Phone Number</Form.Label>
                    <Form.Control
                      disabled="true"
                      plaintext
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
                      plaintext
                      readOnly
                      defaultValue={this.props.profile[0].email}
                    />
                    <Form.Text className="text-muted">
                      Business - Listed
                    </Form.Text>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="label">Website</Form.Label>
                    <Form.Control
                      disabled="true"
                      plaintext
                      readOnly
                      defaultValue={this.props.profile[0].website}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="label">Address</Form.Label>
                    <Form.Control
                      disabled="true"
                      plaintext
                      readOnly
                      defaultValue={this.props.profile[0].address}
                    />
                    <Form.Text className="text-muted">
                      Business - Listed
                    </Form.Text>
                  </Form.Group>
                </Form>
              )}
            </div>
          )}

          {/**Here is Practice Info render */}
          {this.state.clickPractice ? (
            <div className="body">
              <Button
                className="flex-between row-wrap"
                onClick={() => this.handleSavePractice()}
              >
                Save Changes
              </Button>
              <Form className="flex-between row-wrap">
                <Form.Group>
                  <Form.Label variant="flat" className="label">
                    Treatment & Approaches
                  </Form.Label>
                  <Form.Control
                    defaultValue={this.props.profile[0].treatmentPreferences}
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
                    defaultValue={this.props.profile[0].specialties}
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
                    defaultValue={this.props.profile[0].insurance}
                    onChange={(event) => this.handleChange(event, "insurance")}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="label">Supervision Status</Form.Label>
                  <Form.Control
                    defaultValue={this.props.profile[0].supervisionStatus}
                    onChange={(event) =>
                      this.handleChange(event, "supervisionStatus")
                    }
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="label">Telehealth</Form.Label>
                  <Form.Control
                    defaultValue={this.props.profile[0].telehealth}
                    onChange={(event) => this.handleChange(event, "telehealth")}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="label">Client Focus</Form.Label>
                  <Form.Control
                    defaultValue={this.props.profile[0].clientFocus}
                    onChange={(event) =>
                      this.handleChange(event, "clientFocus")
                    }
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="label">Session Format</Form.Label>
                  <Form.Control
                    defaultValue={this.props.profile[0].sessionFormat}
                    onChange={(event) =>
                      this.handleChange(event, "sessionFormat")
                    }
                  />
                </Form.Group>
              </Form>
            </div>
          ) : (
            <div className="body">
              <Button
                className="flex-between row-wrap"
                onClick={() => this.handleEditPractice()}
              >
                Edit Practice Info
              </Button>
              <Form className="flex-between row-wrap">
                <Form.Group>
                  <Form.Label variant="flat" className="label">
                    Treatment & Approaches
                  </Form.Label>
                  <Form.Control
                    disabled="true"
                    plaintext
                    readOnly
                    defaultValue={this.props.profile[0].treatmentPreferences}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label variant="flat" className="label">
                    Specialties
                  </Form.Label>
                  <Form.Control
                    disabled="true"
                    plaintext
                    readOnly
                    defaultValue={this.props.profile[0].specialties}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label variant="flat" className="label">
                    Insurances Taken
                  </Form.Label>
                  <Form.Control
                    disabled="true"
                    plaintext
                    readOnly
                    defaultValue={this.props.profile[0].insurance}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="label">Supervision Status</Form.Label>
                  <Form.Control
                    disabled="true"
                    plaintext
                    readOnly
                    defaultValue={this.props.profile[0].supervisionStatus}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="label">Telehealth</Form.Label>
                  <Form.Control
                    disabled="true"
                    plaintext
                    readOnly
                    defaultValue={this.props.profile[0].telehealth}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="label">Client Focus</Form.Label>
                  <Form.Control
                    disabled="true"
                    plaintext
                    readOnly
                    defaultValue={this.props.profile[0].clientFocus}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="label">Session Format</Form.Label>
                  <Form.Control
                    disabled="true"
                    plaintext
                    readOnly
                    defaultValue={this.props.profile[0].sessionFormat}
                  />
                </Form.Group>
              </Form>
            </div>
          )}
        </>
      );
    } else {
      return <p> user not found </p>
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