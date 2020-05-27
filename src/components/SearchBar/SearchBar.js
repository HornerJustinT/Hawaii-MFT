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
    state: "MN",
    specialization: "Coffee",
    supervision: "Supervisor",
    insurance: "Unicycle",
    treatment: "Hypno",
    age_focus: "Child",
    demo_focus: "Women",
    format: "Juggling",
    telehealth: true,
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
    state: "WI",
    specialization: "Trinkets",
    supervision: "Not a Supervisor",
    insurance: "Unicorn",
    treatment: "Electro",
    age_focus: "Baby",
    demo_focus: "Men",
    format: "Juggling",
    telehealth: true,
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
    state: "NY",
    specialization: "Coffee",
    supervision: "Supervisor",
    insurance: "Babies",
    treatment: "Potions",
    age_focus: "Adult",
    demo_focus: "All",
    format: "Fire Circle",
    telehealth: false,
  },
];

class SearchBar extends Component {
  state = {
    advanced: false
  };

  setStateFromParser = (index, string) => {
        this.setState({
          check: 'hello',
        });
  }

  // This function effectively parses the results and
  // changes the stats above to reflect the answers possible
  // This will set each object to reflect the options in
  // that category as well as how many there are.
  parseResults = () => {
    let parseArray = [
      "state",
      "specialization",
      "supervision",
      "insurance",
      "treatment",
      "age_focus",
      "demo_focus",
      "format",
      "telehealth",
    ];

    for (const index of therapists) {
        for (const string of parseArray) {
            this.setStateFromParser(index, string);
        }
    }

    console.log(this.state)
  }

  componentDidMount() {
      this.parseResults()
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
              <Form.Group controlId="Advanced-zip">
                <Form.Label>Advanced Therapist Search</Form.Label>
                <Form.Control type="text" placeholder="City or Zip Code" />
              </Form.Group>
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
        <SearchResults therapists={therapists} />
      </>
    );
  }
}
 
export default SearchBar;