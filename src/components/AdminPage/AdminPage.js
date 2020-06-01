// React Imports
import React, { Component } from 'react';
import { connect } from "react-redux";

// React Bootstrap
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

// CSS
import './AdminPage.css'


class AdminPage extends Component {
  state = {
    input: ''
  }
  
  componentDidMount() {
    this.props.dispatch({ type: "ADMIN_FETCH_MEMBERS" });
  }

  onDropdownClick = (type) => {
    this.props.dispatch({ type: "ADMIN_FETCH_MEMBERS", payload: {type, search: this.state.input} });
  }

  onSelectChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  render() { 
    return (
      <>
        <div className="container search-bar">
          <InputGroup>
            <FormControl
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
              onChange={this.onSelectChange}
            />
            {/* This is the dropdown that selects the type of search they want to do */}
            <DropdownButton
              as={InputGroup.Append}
              variant="outline-secondary"
              title="Search By"
              id="input-group-dropdown-2"
            >
              <Dropdown.Item onClick={() => this.onDropdownClick("id")}>
                ID
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.onDropdownClick("name")}>
                Name
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.onDropdownClick("license")}>
                License Number
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.onDropdownClick("type")}>
                License Type
              </Dropdown.Item>
            </DropdownButton>
          </InputGroup>
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
                    <td>{therapist.title}</td>
                    <td style={{ textAlign: "right" }}>
                      <Button variant="danger">View</Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ members }) => ({ members });

export default connect(mapStateToProps)(AdminPage);