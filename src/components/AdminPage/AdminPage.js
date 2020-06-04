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
  state = {
    input: "",
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

  componentDidMount() {
    this.props.dispatch({ type: "FETCH_MEMBERS_ADVANCED", payload: "" });
  }

  searchTherapists = () => {
    let query = "";
    for (const key in this.state.criteria) {
      if (this.state.criteria.hasOwnProperty(key)) {
        const element = this.state.criteria[key];
        if (element) {
          if (query !== "") {
            query += "&";
          }
          if (key === "island_city_zip") {
            query += "zip" + "=" + element;
          } else {
            query += key + "=" + element.replace(" ", "+");
          }
        }
      }
    }

    console.log(query);

    this.props.dispatch({
      type: "FETCH_MEMBERS_ADVANCED",
      payload: query,
    });
  };

  onSearchChange = (event, Mainkey) => {
    this.setState({
      criteria: {
        ...this.state.criteria,
        [Mainkey]: event.target.value,
      },
    });
  };

  onSelectChange = (event, Mainkey) => {
    this.setState({
      criteria: {
        ...this.state.criteria,
        [event.target.value]: this.state.criteria[Mainkey],
        [Mainkey]: null,
      },
    });
  };

  deleteFilter = (Mainkey) => {
    this.setState({
      criteria: {
        ...this.state.criteria,
        [Mainkey]: null,
      },
    });
  };

  addFilter = () => {
    for (const key in this.state.criteria) {
      if (this.state.criteria.hasOwnProperty(key)) {
        const element = this.state.criteria[key];
        if (element === null) {
          this.setState({
            criteria: {
              ...this.state.criteria,
              [key]: "",
            },
          });
          break;
        }
      }
    }
  };

  objectToCsv = (data) => {
    if (data[0]) {
      const csvRows = [];

      const headers = Object.keys(data[0]);
      csvRows.push(headers.join(","));

      for (const row of data) {
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
                          this.props.history.push(`/profile/${therapist.id}`)
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