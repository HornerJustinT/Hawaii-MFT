// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Custom Components
import SearchResults from "../SearchResults/SearchResults";
import SearchSelect from '../SearchSelect/SearchSelect';


// React Boostrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

// CSS
import './SearchBar.css'

const criteria = [
  "specialty",
  "supervision_status",
  "insurance",
  "treatment_preferences",
  "languages",
  "ages_served",
  "client_focus",
  "session_format"
];

class SearchBar extends Component {
  state = {
    advanced: false,
    restart: true,
    therapists: [],
  };

  parseSearchData = () => {
    // Makes the data variable exist for later use
    let data = {}

    // This first for...of loop is looping through each
    // therapist in the system.
    for ( const therapist of this.state.therapists ) {

      // Now that we have the therapist we need to read each of
      // the values we said we would read. This loop loops through
      // the criteria listed at the top of the file and files them
      // nicely as well as increasing the count for that item.
      for ( const parse of criteria ) {

        // This line creates the key of data based on the string
        // without this line it would crash the whole website.
        data[parse] = data[parse] || {};
        // It does || because it doesnt want to replace it,
        // it only wants to make it if it doesnt already exist.

        // Checks if its an array or not.
        if ( Array.isArray ( therapist[parse] ) ) {

          // If it is an array it loops through the array and 
          // counts each one seperately.
          for( const item of therapist[parse] ) {
            // Loops through the array and adds one to each count
            // the || is to create the key if it doesnt already exist
            // and start it at 1
            data[parse][item] = data[parse][item] + 1 || 1;
          }
        } else {
          // If its not an array it simply counts the string itself.
          data[parse][therapist[parse]] =
            data[parse][therapist[parse]] + 1 || 1;
        }
      }
    }

    this.setState({
      data
    });
  }

  componentDidMount() {
    // Gets all members right away on loading
    this.props.dispatch({ type: "FETCH_MEMBERS" });
  }

  componentDidUpdate() {
    if (this.state.therapists !== this.props.members) {
      this.setState(
        {
          therapists: this.props.members,
        },
        function () {
          this.parseSearchData();
        }
      );
    }
  }

  switchChange = (event) => {
    this.setState({
      advanced: event.target.checked,
    });
  };

  render() {
    return (
      <>
        {/* NONE OF THIS IS FUNCTIONAL YET */}
        <Form style={{ width: "80%", margin: "20px auto" }}>
          {this.state.advanced ? (
            <div>
              <div className="flex-between row-wrap">
                <Form.Group controlId="Advanced-zip" className="advanced-input">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Name" />
                </Form.Group>
                <Form.Group controlId="Advanced-zip" className="advanced-input">
                  <Form.Label>City or Zip Code</Form.Label>
                  <Form.Control type="text" placeholder="City or Zip Code" />
                </Form.Group>
                <SearchSelect
                  name="Languages"
                  array={this.state.data.languages}
                />
                <SearchSelect
                  name="Specialization"
                  array={this.state.data.specialty}
                />
                <SearchSelect
                  name="Supervision Status"
                  array={this.state.data.supervision_status}
                />
                <SearchSelect
                  name="Insurance Taken"
                  array={this.state.data.insurance}
                />
                <SearchSelect
                  name="Treatment Approaches/Preferences"
                  array={this.state.data.treatment_preferences}
                />
                <div className="flex-between advanced-input">
                  <SearchSelect
                    name="Age Focus"
                    array={this.state.data.ages_served}
                  />
                  <SearchSelect
                    name="Demographic Focus"
                    array={this.state.data.client_focus}
                  />
                </div>
                <SearchSelect
                  name="Session Format(s)"
                  array={this.state.data.session_format}
                />
                <Form.Group
                  controlId="exampleForm.ControlSelect1"
                  className="advanced-input"
                >
                  <Form.Label>Telehealth</Form.Label>
                  <div>
                    <Form.Check inline label="Yes" id={`true`} type="radio" />
                    <Form.Check inline label="No" id={`false`} type="radio" />
                  </div>
                </Form.Group>
              </div>
              <Button
                variant="primary"
                type="submit"
                style={{ float: "right" }}
              >
                Submit
              </Button>
            </div>
          ) : (
            <Form.Group controlId="simple-search">
              <Form.Label>Find a Therapist</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="City or Zip Code"
                  aria-label="City or Zip Code"
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                  <Button variant="primary">Search</Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          )}
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Advanced Search"
            onChange={this.switchChange}
          />
        </Form>
        <SearchResults therapists={this.state.therapists} />
      </>
    );
  }
}

const mapStateToProps = ({ members }) => ({ members });
 
export default connect(mapStateToProps)(SearchBar);