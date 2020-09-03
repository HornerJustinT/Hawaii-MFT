// React Imports
import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import ReactTooltip from "react-tooltip";

// Components
import RegistrationModal from '../RegistrationModal/RegistrationModal';
import StudentRegistrationModal from '../StudentRegistrationModal/StudentRegistrationModal';

// Libraries
import FileSaver from "file-saver";

// React Bootstrap
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// CSS
import './AdminPage.css'
import "../App/App.css";


class AdminPage extends Component {
  // therapists is an array of therapists to loop through later

  // Criteria is all the possible search options the server allows.
  // They start as null and as filters are added they become strings.
  // This allows for the adding and removing filters seen later.
  state = {
    therapists: [],
    showDisabled: false,
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
  resetProfile = (id) => {
    this.props.dispatch({ type: "PROFILE_RESET" });
    this.props.history.push(`/admin-edit-profile/${id}`);
  };

  resetStudentProfile = (id) => {
    this.props.dispatch({ type: "PROFILE_RESET" });
    this.props.history.push(`/admin-edit-profile-student/${id}`);
  };
  // When the page loads
  componentDidMount() {
    // Grab a complete list of members.
    this.props.dispatch({ type: "FETCH_MEMBERS_ADVANCED", payload: "" });
  }

  // Parses the state and makes the url query then sends the search
  searchTherapists = () => {
    // Starts with an empty query string
    let query = "";

    if (this.state.showDisabled) {
      query += "admin=true";
    }

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
            query += `zip=${element}`;
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
    this.setState(
      {
        criteria: {
          ...this.state.criteria,
          [Mainkey]: null,
        },
      },
      () => {
        this.searchTherapists();
      }
    );
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
    this.searchTherapists();
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

  switchChange = (event) => {
    this.setState(
      {
        showDisabled: event.target.checked,
      },
      () => {
        this.searchTherapists();
      }
    );
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
      <div className="main">
        <ReactTooltip />
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
          <div className="flex-between align-center">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Show Disabled Accounts"
              className=""
              onChange={this.switchChange}
            />

            <div>
              <Button
                variant="success"
                onClick={this.addFilter}
                className="btnFilter"
                data-tip="This button adds filters to filter the members listed below. To search with these filters click the search button"
              >
                Add Filter
              </Button>

              <Button
                variant="primary"
                onClick={this.searchTherapists}
                className="btnFilter"
                data-tip="This button searchs the members table with the filters currently present"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
        <div className="container">
            <Table striped bordered hover variant="" className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>License #</th>
                <th>Email Address</th>
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
                    {!therapist.student ?
                    <td>{therapist.license_number}</td>
                    :
                    <td><i>Student Member</i></td>
                    }
                    {!therapist.student ? (
                      <td>{therapist.email}</td>
                    ) : (
                      <td>{therapist.emailpersonal}</td>
                    )}
                    <td style={{ textAlign: "right" }}>
                    {therapist.student ? 
                      <Button
                        variant="primary"
                        onClick={() => this.resetStudentProfile(therapist.id)}
                        data-tip="This button will direct you to the edit profile page for this member"
                      >
                        View
                      </Button>                    
                    :
                      <Button
                        variant="primary"
                        onClick={() => this.resetProfile(therapist.id)}
                        data-tip="This button will direct you to the edit profile page for this member"
                      >
                        View
                      </Button>
                    }
                    </td>
                    <ReactTooltip />
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className="download flex-between">
            <ReactTooltip />
            {/* {this.state.csv && ( */}
              <Button
                variant="success"
                data-tip="This buton will download all of the member info of the members on this page into an csv file."
                onClick={this.downloadClick}
                download
              >
                Click to download
                <ReactTooltip />
              </Button>
            {/* )} */}

            <RegistrationModal />
            <StudentRegistrationModal />
          </div>
        </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ members }) => ({ members });

export default withRouter(connect(mapStateToProps)(AdminPage));