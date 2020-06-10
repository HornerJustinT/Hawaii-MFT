// React Imports
import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";

// Libraries
import FileSaver from "file-saver";

// React Bootstrap
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

// CSS
import './AdminPage.css'


class AdminPage extends Component {

  // therapists is an array of therapists to loop through later

  // Criteria is all the possible search options the server allows.
  // They start as null and as filters are added they become strings.
  // This allows for the adding and removing filters seen later.
  state = {
    therapists: [],
    criteria: {
      name: null,
      id: null,
      specialty: null,
      insurance: null,
      languages: null,
      ages_served: null,
      client_focus: null,
      license_type: null,
      session_format: null,
      license_number: null,
      island_city_zip: null,
      supervision_status: null,
      treatment_preferences: null,
    },
  };
  resetProfile = (id) =>{
    this.props.dispatch({type:"PROFILE_RESET"}) 
    this.props.history.push(`/edit-profile/${id}`)
  }
  // When the page loads
  componentDidMount() {
    // Grab a complete list of members.
    this.props.dispatch({ type: "FETCH_MEMBERS_ADVANCED", payload: "" });
  }

  // Parses the state and makes the url query then sends the search
  searchTherapists = () => {
    // Starts with an empty query string
    let query = "";

    // Loops through the possible search criteria in state
    for (const key in this.state.criteria) {

      // Makes sure the property actually exists (NEEDED)
      if (this.state.criteria.hasOwnProperty(key)) {
        const element = this.state.criteria[key];

        // Checks if the criteria has information to search
        if (element) {
          // If not the first item in the query
          if (query !== "") {
            query += "&";
          }

          // island_city_zip is named zip server side so this renames it
          if (key === "island_city_zip") {
            query += "zip" + "=" + element;
          } else {
            // Adds the key and value to the query in a url query
            // useable fashion.
            query += key + "=" + element.replace(" ", "+");
          }
        }
      }
    }

    // Sends the dispatch
    this.props.dispatch({
      type: "FETCH_MEMBERS_ADVANCED",
      payload: query,
    });
  };

  // Sets the state of the specific search criteria
  onSearchChange = (event, Mainkey) => {
    this.setState({
      criteria: {
        ...this.state.criteria,
        [Mainkey]: event.target.value,
      },
    });
  };

  // Replaces the criteria values as needed. 
  // First it sets the new value to the same as the old one
  // then it sets the old one to null.
  onSelectChange = (event, Mainkey) => {
    this.setState({
      criteria: {
        ...this.state.criteria,
        [event.target.value]: this.state.criteria[Mainkey],
        [Mainkey]: null,
      },
    });
  };

  // Sets the criteria to null essentially removing it
  deleteFilter = (Mainkey) => {
    this.setState({
      criteria: {
        ...this.state.criteria,
        [Mainkey]: null,
      },
    });
  };

  // Shows another bar on the page
  addFilter = () => {
    // Loops through the criteria in the state
    for (const key in this.state.criteria) {
      if (this.state.criteria.hasOwnProperty(key)) {
        const element = this.state.criteria[key];
        // If the element doesn't have a value yet
        // give it an empty string as a value.
        if (element === null) {
          this.setState({
            criteria: {
              ...this.state.criteria,
              [key]: "",
            },
          });

          // Ends the for loop once the bar has been added.
          break;
        }
      }
    }
  };


  // Converts an array of objects to CSV and makes it ready for download
  objectToCsv = (data) => {
    // Ensures any data exists to parse
    if (data[0]) {
      // Starts with an empty array
      const csvRows = [];

      // The keys of the objects are used as the headers for the CSV
      const headers = Object.keys(data[0]);
      csvRows.push(headers.join(","));

      // Loops through the rows in the array
      for (const row of data) {
        // maps through the header to know the values to
        // parse the rest of the objects with.
        const values = headers.map((header) => {
          const escaped = ("" + row[header]).replace(/"/g, '\\"');
          return `"${escaped}"`;
        });
        csvRows.push(values.join(","));
      }

      return csvRows.join(`\n`);
    }
  };

  downloadClick = () => {
    const blob = new Blob([this.state.csv], { type: "text/csv" });
    FileSaver.saveAs(blob, "workbook.csv");
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.members !== this.state.therapists) {
      this.setState({
        therapists: this.props.members,
        csv: this.objectToCsv(this.props.members),
      });
    }
  }

  render() {
    return (
      <>
        <div className="container search-bar">
          {Object.keys(this.state.criteria).map((Mainkey) => (
            <>
              {this.state.criteria[Mainkey] !== null && (
                <InputGroup style={{ margin: "10px 0px" }}>
                  <FormControl
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    onChange={(event) => this.onSearchChange(event, Mainkey)}
                    value={this.state.criteria[Mainkey]}
                  />
                  <InputGroup.Append>
                    <FormControl
                      as="select"
                      value={Mainkey}
                      onChange={(event) => this.onSelectChange(event, Mainkey)}
                    >
                      <option value={Mainkey}>
                        {(Mainkey.charAt(0).toUpperCase() + Mainkey.slice(1))
                          .split("_")
                          .join(" ")}
                      </option>
                      {Object.keys(this.state.criteria).map((key) => (
                        <>
                          {this.state.criteria[key] === null && (
                            <option value={key}>
                              {(key.charAt(0).toUpperCase() + key.slice(1))
                                .split("_")
                                .join(" ")}
                            </option>
                          )}
                        </>
                      ))}
                    </FormControl>
                  </InputGroup.Append>
                  <InputGroup.Append>
                    <Button
                      variant="outline-danger"
                      onClick={() => this.deleteFilter(Mainkey)}
                    >
                      DELETE
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              )}
            </>
          ))}
          <div className="flex-between">
            <Button variant="primary" onClick={this.addFilter}>
              Add Filter
            </Button>

            <Button variant="primary" onClick={this.searchTherapists}>
              Search
            </Button>
          </div>
        </div>
        <div className="container">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>License #</th>
                <th>License</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.members[0] &&
                this.props.members.map((therapist) => (
                  <tr>
                    <td>{therapist.id}</td>
                    <td>
                      {therapist.first_name} {therapist.last_name}
                    </td>
                    <td>{therapist.license_number}</td>
                    <td>{therapist.license_title}</td>
                    <td style={{ textAlign: "right" }}>
                      <Button
                        variant="danger"
                        onClick={() =>
                          this.resetProfile(therapist.id)
                        
                        }
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className="download">
            {this.state.csv && (
              <Button onClick={this.downloadClick} download>
                Click to download
              </Button>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ members }) => ({ members });

export default withRouter(connect(mapStateToProps)(AdminPage));