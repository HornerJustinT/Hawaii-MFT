// React Imports
import React, { Component } from 'react';

// Custom Components
import SearchResults from "../SearchResults/SearchResults";

// React Boostrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

const therapists = [
  {
    id: 1,
    first_name: "Jane",
    last_name: "Rain",
    island: "O'ahu",
    city: "Kailua",
    phoneNumber: "808-123-4567",
    type: "Counselor",
    titles: ["MA", "ATR", "LPCC", "LAMFT"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit.",
    email: "jane@familytherapy.com",
    website: "familytherapy.com",
  },
  {
    id: 2,
    first_name: "Joe",
    last_name: "Nagasaka",
    island: "Maui",
    city: "Kahului",
    phoneNumber: "808-123-4567",
    type: "Clinical Social Work/Therapist",
    titles: ["MSW", "LAMFT"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit.",
    email: "joe@openarms.com",
    website: "openarms.com",
  },
  {
    id: 3,
    first_name: "Tepairu",
    last_name: "Miller",
    island: "Kauai",
    city: "Lihue",
    phoneNumber: "808-123-4567",
    type: "Phychologist",
    titles: ["PhD", "LP", "LAMFT"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit.",
    email: "jill@relationalground.com",
    website: "relationalground.com",
  },
];

class SearchBar extends Component {
    state = {
        advanced: false
    }

    switchChange = (event) => {
        this.setState({
            advanced: event.target.checked
        })
    }
    
    render() { 
        return (
          <>
            <Form style={{ width: "80%", margin: "20px auto" }}>
              {this.state.advanced ? (
                <div>
                  <Form.Group controlId="Advanced-zip">
                    <Form.Label>Advanced Therapist Search</Form.Label>
                    <Form.Control type="text" placeholder="City or Zip Code" />
                  </Form.Group>
                  <Button variant="primary" type="submit" style={{float:"right"}}>
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
            <SearchResults therapists={therapists} />
          </>
        );
    }
}
 
export default SearchBar;