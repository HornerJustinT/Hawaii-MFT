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
    restart: true,
    therapists: [],
  };

  advancedSearchSubmit = (event) => {
    event.preventDefault()
    let query = '';
    const queryCriteria = [...criteria, 'name', 'zip', 'telehealth']

    for (let criteria of queryCriteria) {
      if (this.state[criteria]) {
        if (query !== '') {
          query += '&'
        }
        if (criteria === 'telehealth') {
          query += criteria + "=" + this.state[criteria]
        } else {
          query += criteria + "=" + this.state[criteria].replace(" ", "+");
        }
      }
    }

    console.log(query)

    this.props.dispatch({
      type: "FETCH_MEMBERS_ADVANCED",
      payload: query,
    });
  }

  onSearchChange = (event) => {
    this.setState({
      basic_search: event.target.value,
    });
  };

  onSearchChangeAdv = (event, type) => {
    this.setState({
      [type]: event.target.value,
    });
  };

  onSearchClicked = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: "FETCH_MEMBERS",
      payload: this.state.basic_search,
    });
  };

  onTelehealthChange = (event) => {
    this.setState({
      telehealth: event.target.checked,
    });
  };

  parseSearchData = () => {
    // Makes the data variable exist for later use
    let data = {};

    // This first for...of loop is looping through each
    // therapist in the system.
    for (const therapist of this.state.therapists) {
      // Now that we have the therapist we need to read each of
      // the values we said we would read. This loop loops through
      // the criteria listed at the top of the file and files them
      // nicely as well as increasing the count for that item.
      for (const parse of criteria) {
        // This line creates the key of data based on the string
        // without this line it would crash the whole website.
        data[parse] = data[parse] || {};
        // It does || because it doesnt want to replace it,
        // it only wants to make it if it doesnt already exist.

        // Checks if its an array or not.
        if (Array.isArray(therapist[parse])) {
          // If it is an array it loops through the array and
          // counts each one seperately.
          for (const item of therapist[parse]) {
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
      data,
    });
  };

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
        <Form style={{ width: "80%", margin: "20px auto" }}>
          {this.state.advanced ? (
            <div>
              <div className="flex-between row-wrap">
                <Form.Group controlId="Advanced-zip" className="advanced-input">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    onChange={(event) => this.onSearchChangeAdv(event, "name")}
                  />
                </Form.Group>
                <Form.Group controlId="Advanced-zip" className="advanced-input">
                  <Form.Label>Island, City or Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City or Zip Code"
                    onChange={(event) => this.onSearchChangeAdv(event, "zip")}
                  />
                </Form.Group>
                <SearchSelect
                  name="Languages"
                  array={this.state.data.languages}
                  onChange={(event) =>
                    this.onSearchChangeAdv(event, "languages")
                  }
                  value={this.state.languages || null}
                />
                <SearchSelect
                  name="Specialization"
                  array={this.state.data.specialty}
                  onChange={(event) =>
                    this.onSearchChangeAdv(event, "specialty")
                  }
                  value={this.state.specialty || null}
                />
                <SearchSelect
                  name="Supervision Status"
                  array={this.state.data.supervision_status}
                  onChange={(event) =>
                    this.onSearchChangeAdv(event, "supervision_status")
                  }
                  value={this.state.supervision_status || null}
                />
                <SearchSelect
                  name="Insurance Taken"
                  array={this.state.data.insurance}
                  onChange={(event) =>
                    this.onSearchChangeAdv(event, "insurance")
                  }
                  value={this.state.insurance || null}
                />
                <SearchSelect
                  name="Treatment Approaches/Preferences"
                  array={this.state.data.treatment_preferences}
                  onChange={(event) =>
                    this.onSearchChangeAdv(event, "treatment_preferences")
                  }
                  value={this.state.treatment_preferences || null}
                />
                <div className="flex-between advanced-input">
                  <SearchSelect
                    name="Age Focus"
                    array={this.state.data.ages_served}
                    onChange={(event) =>
                      this.onSearchChangeAdv(event, "ages_served")
                    }
                    value={this.state.ages_served || null}
                  />
                  <SearchSelect
                    name="Demographic Focus"
                    array={this.state.data.client_focus}
                    onChange={(event) =>
                      this.onSearchChangeAdv(event, "client_focus")
                    }
                    value={this.state.client_focus || null}
                  />
                </div>
                <SearchSelect
                  name="Session Format(s)"
                  array={this.state.data.session_format}
                  onChange={(event) =>
                    this.onSearchChangeAdv(event, "session_format")
                  }
                  value={this.state.session_format || null}
                />
                <Form.Check
                  type="switch"
                  id="telehealth"
                  label="Provides Telehealth"
                  className="switch"
                  onChange={this.onTelehealthChange}
                  value={this.state.telehealth || false}
                />
              </div>
              <Button
                variant="primary"
                type="submit"
                style={{ float: "right" }}
                onClick={this.advancedSearchSubmit}
              >
                Search
              </Button>
            </div>
          ) : (
            <Form.Group
              controlId="simple-search"
              onSubmit={this.onSearchClicked}
            >
              <Form.Label>Find a Therapist</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Island, City or Zip Code"
                  aria-label="City or Zip Code"
                  aria-describedby="basic-addon2"
                  onChange={this.onSearchChange}
                />
                <InputGroup.Append>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={this.onSearchClicked}
                  >
                    Search
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          )}
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Advanced Search"
            className="switch"
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