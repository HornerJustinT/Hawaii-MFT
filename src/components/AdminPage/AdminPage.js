// React Imports
import React, { Component } from 'react';

// React Bootstrap
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import './AdminPage.css'


class AdminPage extends Component {
    
    render() { 
        return (
          <>
            <div className="container search-bar">
              <InputGroup>
                <FormControl
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />

                <DropdownButton
                  as={InputGroup.Append}
                  variant="outline-secondary"
                  title="Search By"
                  id="input-group-dropdown-2"
                >
                  <Dropdown.Item>ID</Dropdown.Item>
                  <Dropdown.Item>License Number</Dropdown.Item>
                  <Dropdown.Item>Name</Dropdown.Item>
                </DropdownButton>
              </InputGroup>
            </div>
          </>
        );
    }
}
 
export default AdminPage;