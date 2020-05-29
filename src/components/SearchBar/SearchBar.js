// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Custom Components
import SearchResults from "../SearchResults/SearchResults";

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
    languages: {},
    specialty: {},
    supervision_status: {},
    insurance: {},
    treatment_preferences: {},
    ages_served: {},
    client_focus: {},
    session_format: {}
  };

  // This function is recursive as is the other one
  // for the same reason. Without this recursive nature
  // the function would overwrite its state over and over.
  itemLoopFunction = (array, index, parse) => {
    // Checks that theres anything left in the array
    // if not it ends the function and doesnt call it again.
    if (array[index]){
      const item = array[index];

      // "this.state[parse][item] + 1 || 1" adds one to the state
      // if any of those exist already. If its the first of that kind
      // it creates that property and then makes it 1.
      this.setState(
        {
          restart: false,
          [parse]: {
            ...this.state[parse],
            [item]:
              this.state[parse][item] + 1 || 1,
          },
        }, function() {
          // Calls the function again but for the next item in the array
          this.itemLoopFunction(array, index + 1, parse);
        }
      );
    }
  }

  // Parses the data of the members and sorts them nicely.
  // This function is ugly and has a lot of recusion but
  // it allows for a lot of state management that hopefully will
  // finish before the user gets to using the advanced search

  // That being said this function is a nightmare of recursion
  // and looping that only gets worse the more users there are.
  // I plan to break it down further as much as I can but
  // this honestly might need a complete overhaul. 
  parseSearchData = (index, criteriaItem) => {
    // This function runs on recusion and keeping track of
    // its own values. Basically a make-shift for loop
    // thats looping through 2 loops at the same time.

    // index is the index in the therapists array and 
    // criteriaItem is the index of the criteria array
    
    // This if statement basically checks if the recursion can end.
    // If there is nothing at the therapists index the function stops.
    if (this.state.therapists[index]) {
      const therapist = this.state.therapists[index];
      const parse = criteria[criteriaItem];

      // This checks that we havent reached the end of the criteria
      // if this fails it calls the function again with a higher index
      // and it resets the criteria index to 0
      if (parse) {
        
        // Checks if the value we are reading is an array.
        // really its just checking if its the supervisor one
        // but if we decide to add more search/parse options
        // this simplifies it for almost no cost.  
        if (Array.isArray(therapist[parse])) {

          // This loops through the array thats inside of
          // the therapist object at the specified criteria
          this.itemLoopFunction(therapist[parse], 0, parse);

        } else {

          // setState is an async function and doesnt happen instantly
          // because of this we need something to slow it down
          // so it doesnt overwrite itself constantly. However, 
          // generally slowing down something is a bad thing so
          // we have to slow it down as little as possible while
          // keeping it slow enough to work. That is why we set
          // restart to false here. That way later we can set it
          // to true and time when that ends to move on.

          // "this.state[parse][therapist[parse]] + 1 || 1" adds
          // 1 to the count if theres been any before, if not it just
          // creates it and makes it 1.
          this.setState(
            {
              restart: false,
              [parse]: {
                ...this.state[parse],
                [therapist[parse]]:
                  this.state[parse][therapist[parse]] + 1 || 1,
              },
            }
          );
        }

        // This calls the function again and progresses it to
        // the next criteria on the list.
        this.parseSearchData(index, criteriaItem + 1);
      } else {

        // This setState call is different and only useful as
        // a slowdown method. It sets the state of restart to true
        // then once its done it calls the function at the end. which
        // 

        this.setState({
          restart: true,
        }, function () {
          // this function restarts the count increasing the index but resetting the
          // credential to 0. This effectively restarts the function on 
          // the next member.
          this.parseSearchData(index + 1, 0);
        })
      }
    }
  };

  componentDidMount() {
    // Gets all members right away on loading
    this.props.dispatch({ type: 'FETCH_MEMBERS' })
  }

  componentDidUpdate() {
    if (this.state.therapists !== this.props.members) {
      this.setState({
        therapists: this.props.members
      }, function() {
          this.parseSearchData( 0, 0 );
      })
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
      {/* NONE OF THIS IS FUNCTION YET */}
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
                <Form.Group
                  controlId="exampleForm.ControlSelect1"
                  className="advanced-input"
                >
                  <Form.Label>Languages</Form.Label>
                  <Form.Control as="select">
                    {Object.keys(this.state.languages).map((key) => (
                      // Displays the option and the amount of that option
                      // there are. Should be useful for the user.
                      <option value={key}>
                        {key} ({this.state.languages[key]})
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  controlId="exampleForm.ControlSelect1"
                  className="advanced-input"
                >
                  <Form.Label>Specialization</Form.Label>
                  <Form.Control as="select">
                    {Object.keys(this.state.specialty).map((key) => (
                      // Displays the option and the amount of that option
                      // there are. Should be useful for the user.
                      <option value={key}>
                        {key} ({this.state.specialty[key]})
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  controlId="exampleForm.ControlSelect1"
                  className="advanced-input"
                >
                  <Form.Label>Supervision Status</Form.Label>
                  <Form.Control as="select">
                    {Object.keys(this.state.supervision_status).map((key) => (
                      <option>
                        {key} ({this.state.supervision_status[key]})
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  controlId="exampleForm.ControlSelect1"
                  className="advanced-input"
                >
                  <Form.Label>Insurance Taken</Form.Label>
                  <Form.Control as="select">
                    {Object.keys(this.state.insurance).map((key) => (
                      <option>
                        {key} ({this.state.insurance[key]})
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  controlId="exampleForm.ControlSelect1"
                  className="advanced-input"
                >
                  <Form.Label>Treatment Approaches/Preferences</Form.Label>
                  <Form.Control as="select">
                    {Object.keys(this.state.treatment_preferences).map((key) => (
                      <option>
                        {key} ({this.state.treatment_preferences[key]})
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <div className="flex-between advanced-input">
                  <Form.Group
                    controlId="exampleForm.ControlSelect1"
                    className="advanced-input"
                  >
                    <Form.Label>Age Focus</Form.Label>
                    <Form.Control as="select">
                      {Object.keys(this.state.ages_served).map((key) => (
                        <option>
                          {key} ({this.state.ages_served[key]})
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group
                    controlId="exampleForm.ControlSelect1"
                    className="advanced-input"
                  >
                    <Form.Label>Demographic Focus</Form.Label>
                    <Form.Control as="select">
                      {Object.keys(this.state.client_focus).map((key) => (
                        <option>
                          {key} ({this.state.client_focus[key]})
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>
                <Form.Group
                  controlId="exampleForm.ControlSelect1"
                  className="advanced-input"
                >
                  <Form.Label>Session Format(s)</Form.Label>
                  <Form.Control as="select">
                    {Object.keys(this.state.session_format).map((key) => (
                      <option>
                        {key} ({this.state.session_format[key]})
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
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