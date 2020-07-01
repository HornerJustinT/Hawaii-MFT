//This component is imported into render of Search Bar component
 
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
    // Prevents reload of the page
    event.preventDefault()

    // Sets the base query
    let query = '';

    // Sets the criteria to possibly search
    const queryCriteria = [...criteria, 'name', 'zip', 'telehealth']

    // This loops through the criteria and creates the search query based on
    // what the values of the criteria are in the state.
    for (let criteria of queryCriteria) {
      // if there is a value to the criteria too it to the query
      if (this.state[criteria]) {
        // This adds an & at the end of the query string if one is needed
        if (query !== '') {
          query += '&'
        }

        // if there hit require telehealth.
        // If it is set to false it simply just won't filter by it at all
        // having it checked requires it but unchecked ignores the filter
        if (criteria === 'telehealth') {
          // telehealth is boolean so it cant have the replacing the others need.
          query += criteria + "=" + this.state[criteria]
        } else {
          // This replaces the criteria and its value with something 
          // useable in the url query.
          query += criteria + "=" + this.state[criteria].replace(" ", "+");
        }
      }
    }
    
    
    // Dispatches to redux which then sends the query to the server
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

  // Changes the specific state of the item in the adv search
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
    // Sets the therapists and updates the data when it recieves the data
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
    console.log(this.state.advanced);
    this.setState({
      advanced: event.target.checked,
    },()=>{
      if(this.state.advanced === false){// If the advanced search is turned off it resets the search.
        this.props.dispatch({type:"FETCH_MEMBERS"})
      }
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
                  aria-label="Island, City or Zip Code"
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
          {this.state.data && (
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Advanced Search"
              className="switch"
              onChange={this.switchChange}
            />
          )}
        </Form>
        <SearchResults therapists={this.state.therapists} />
      </>
    );
  }
}

const mapStateToProps = ({ members }) => ({ members });
 
export default connect(mapStateToProps)(SearchBar);