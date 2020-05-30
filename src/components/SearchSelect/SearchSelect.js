import React, { Component } from 'react';

import Form from "react-bootstrap/Form";

class SearchSelect extends Component {
    render() { 
        return (
          <Form.Group
            controlId="exampleForm.ControlSelect1"
            className="advanced-input"
          >
            <Form.Label>{this.props.name}</Form.Label>
            <Form.Control as="select">
              <option value={null}>Choose One</option>
              {Object.keys(this.props.array).map((key) => (
                // Displays the option and the amount of that option
                // there are. Should be useful for the user.
                <>
                  {this.props.array[key] > 0 &&
                    <option value={key}>
                        {key} ({this.props.array[key]})
                    </option>
                  }
                </>
              ))}
            </Form.Control>
          </Form.Group>
        );
    }
}
 
export default SearchSelect;