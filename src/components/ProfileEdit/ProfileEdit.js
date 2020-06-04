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
  };
  
  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_PROFILE",
      payload: this.props.match.params,
    });
  }

//
  componentDidUpdate() {
    if (this.state.id !== this.props.match.params && this.props.languages.length > 0) {
      const updatedLanguages = this.syncDataEdit("languages", "languages")
      this.setState({
        id: this.props.match.params,
        prefix: this.props.profile.prefix,
        firstName: this.props.profile.first_name,
        lastName: this.props.profile.last_name,
        title: this.props.profile.title,
        age: this.props.profile.age,
        phone: this.props.profile.phone,
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
        languagesEdit: updatedLanguages,
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
    const updatedLanguages = this.props.profile[profileName].map(lang => {
      const results = this.props[reducerName].filter(object => object.title === lang)
      console.log('heres results !!!!!!!', results)
      return (
        results[0].language_id
      );
    })
    return updatedLanguages;
  }

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
  handleObjectChange = (event, editPropertyName, viewPropertyName) => {
    console.log('here is event.target.selected.options &&&&&&&', event.target.selectedOptions);
    const array = [];
    for(let option of event.target.selectedOptions){
      array.push(Number(option.value))
    }
    const updatedLanguages = array.map(id => {
      const results = this.props.languages.filter(object => object.language_id === id)
      console.log('heres results !!!!!!!', results)
      return (
        results[0].title
      );
    })
    console.log('heres updatedLangs $$$$$$$', updatedLanguages)
    this.setState({
      [editPropertyName]: array,
      [viewPropertyName]: updatedLanguages,
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
              onChange={(event) => this.handleObjectChange(event, "languagesEdit", "languages")}>
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

    displayLanguages = () => {
    if(this.state.clickBasic){
      return(
          <Form.Group>
            <Form.Label className="label">Languages Spoken</Form.Label>
            <Form.Control as="select"
              multiple="true"
              value={this.state.languagesEdit}
              onChange={(event) => this.handleObjectChange(event, "languagesEdit", "languages")}>
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

  render() {
    return (
      <>
        <div className="header">
          <h3>My Profile</h3>
          {JSON.stringify(this.props.profile)}
          <br></br>
          <br/>
          {JSON.stringify(this.state)}

          
          {JSON.stringify(this.props.islands)}
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
                  defaultValue={this.props.profile.prefix}
                  onChange={(event) => this.handleChange(event, "prefix")}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="label">First Name</Form.Label>
                <Form.Control
                  defaultValue={this.props.profile.first_name}
                  onChange={(event) => this.handleChange(event, "firstName")}
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
              <Form.Group>
                <Form.Label className="label">About You</Form.Label>
                <Form.Control
                  defaultValue={this.props.profile.statement}
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
            <Form className="flex-between row-wrap">
              <Form.Group>
                <Form.Label className="label">Prefix</Form.Label>
                <Form.Control
                  disabled="true"
                  plaintext
                  readOnly
                  defaultValue={this.props.profile.prefix}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="label">First Name</Form.Label>
                <Form.Control
                  disabled="true"
                  plaintext
                  readOnly
                  defaultValue={this.props.profile.first_name}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="label">Last Name</Form.Label>
                <Form.Control
                  disabled="true"
                  plaintext
                  readOnly
                  defaultValue={this.props.profile.last_name}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="label">Age</Form.Label>
                <Form.Control
                  disabled="true"
                  plaintext
                  readOnly
                  defaultValue={this.props.profile.age}
                />
              </Form.Group>
              {this.displayLanguages()}
              <Form.Group>
                <Form.Label className="label">About You</Form.Label>
                <Form.Control
                  disabled="true"
                  plaintext
                  readOnly
                  defaultValue={this.props.profile.statement}
                />
              </Form.Group>
            </Form>
          </div>
        )}
        {/**Here is Contact Info render */}
        {this.state.clickContact ? (
          <div className="body">
            <Button
              className="flex-between row-wrap"
              onClick={() => this.handleSaveContact()}
            >
              Save Changes
            </Button>
            <Form className="flex-between row-wrap">
              <Form.Group>
                <Form.Label variant="flat" className="label">
                  Island
                </Form.Label>
                <Form.Control
                  defaultValue={this.props.profile.island}
                  onChange={(event) => this.handleChange(event, "island")}
                />
              </Form.Group>
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
                  defaultValue={this.props.profile.zip}
                  onChange={(event) => this.handleChange(event, "zip")}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="label">Phone Number</Form.Label>
                <Form.Control
                  defaultValue={this.props.profile.phone}
                  onChange={(event) => this.handleChange(event, "phone")}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="label">Email Address</Form.Label>
                <Form.Control
                  defaultValue={this.props.profile.email}
                  onChange={(event) => this.handleChange(event, "email")}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="label">Website</Form.Label>
                <Form.Control
                  defaultValue={this.props.profile.website}
                  onChange={(event) => this.handleChange(event, "website")}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="label">Address</Form.Label>
                <Form.Control
                  defaultValue={this.props.profile.address}
                  onChange={(event) => this.handleChange(event, "address")}
                />
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
            <Form className="flex-between row-wrap">
              <Form.Group>
                <Form.Label variant="flat" className="label">
                  Island
                </Form.Label>
                <Form.Control
                  disabled="true"
                  plaintext
                  readOnly
                  defaultValue={this.props.islands}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label variant="flat" className="label">
                  City
                </Form.Label>
                <Form.Control
                  disabled="true"
                  plaintext
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
                  plaintext
                  readOnly
                  defaultValue={this.props.profile.zip}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="label">Phone Number</Form.Label>
                <Form.Control
                  disabled="true"
                  plaintext
                  readOnly
                  defaultValue={this.props.profile.phone}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="label">Email Address</Form.Label>
                <Form.Control
                  disabled="true"
                  plaintext
                  readOnly
                  defaultValue={this.props.profile.email}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="label">Website</Form.Label>
                <Form.Control
                  disabled="true"
                  plaintext
                  readOnly
                  defaultValue={this.props.profile.website}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="label">Address</Form.Label>
                <Form.Control
                  disabled="true"
                  plaintext
                  readOnly
                  defaultValue={this.props.profile.address}
                />
              </Form.Group>
            </Form>
          </div>
        )}

        {/**Here is Practice Info render */}
        {/* {this.state.clickPractice ? (
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
                  onChange={(event) => this.handleChange(event, "specialties")}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label variant="flat" className="label">
                  Insurances Taken
                </Form.Label>
                <Form.Control
                  defaultValue={this.props.profile.insurance}
                  onChange={(event) => this.handleChange(event, "insurance")}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="label">Supervision Status</Form.Label>
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
                  onChange={(event) => this.handleChange(event, "telehealth")}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="label">Client Focus</Form.Label>
                <Form.Control
                  defaultValue={this.props.profile.clientFocus}
                  onChange={(event) => this.handleChange(event, "clientFocus")}
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
                  defaultValue={this.props.profile.treatmentPreferences}
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
                  defaultValue={this.props.profile.specialties}
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
                  defaultValue={this.props.profile.insurance}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="label">Supervision Status</Form.Label>
                <Form.Control
                  disabled="true"
                  plaintext
                  readOnly
                  defaultValue={this.props.profile.supervisionStatus}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="label">Telehealth</Form.Label>
                <Form.Control
                  disabled="true"
                  plaintext
                  readOnly
                  defaultValue={this.props.profile.telehealth}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="label">Client Focus</Form.Label>
                <Form.Control
                  disabled="true"
                  plaintext
                  readOnly
                  defaultValue={this.props.profile.clientFocus}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="label">Session Format</Form.Label>
                <Form.Control
                  disabled="true"
                  plaintext
                  readOnly
                  defaultValue={this.props.profile.sessionFormat}
                />
              </Form.Group>
            </Form>
          </div>
        )} */}
      </> 
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
    user: reduxStore.user,
    profile: reduxStore.profile,
    languages: reduxStore.languages,
    islands: reduxStore.islands,
});

export default withRouter(connect(putReduxStateOnProps)(ProfileEdit));