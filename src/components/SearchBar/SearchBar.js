// React Imports
import React, { Component } from 'react';

// Custom Components
import SearchResults from "../SearchResults/SearchResults";

// React Boostrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

// CSS
import './SearchBar.css'


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
              <div className="flex-evenly row-wrap">
                <Form.Group controlId="Advanced-zip" className="advanced-input">
                  <Form.Label>City or Zip Code</Form.Label>
                  <Form.Control type="text" placeholder="City or Zip Code" />
                </Form.Group>
                <Form.Group
                  controlId="exampleForm.ControlSelect1"
                  className="advanced-input"
                >
                  <Form.Label>Specialization</Form.Label>
                  <Form.Control as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  controlId="exampleForm.ControlSelect1"
                  className="advanced-input"
                >
                  <Form.Label>Supervision Status</Form.Label>
                  <Form.Control as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  controlId="exampleForm.ControlSelect1"
                  className="advanced-input"
                >
                  <Form.Label>Insurance Taken</Form.Label>
                  <Form.Control as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  controlId="exampleForm.ControlSelect1"
                  className="advanced-input"
                >
                  <Form.Label>Treatment Approaches/Preferences</Form.Label>
                  <Form.Control as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
                <div className="flex-between advanced-input">
                  <Form.Group
                    controlId="exampleForm.ControlSelect1"
                    className="advanced-input"
                  >
                    <Form.Label>Age Focus</Form.Label>
                    <Form.Control as="select">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group
                    controlId="exampleForm.ControlSelect1"
                    className="advanced-input"
                  >
                    <Form.Label>Demographic Focus</Form.Label>
                    <Form.Control as="select">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                  </Form.Group>
                </div>
                <Form.Group
                  controlId="exampleForm.ControlSelect1"
                  className="advanced-input"
                >
                  <Form.Label>Session Format(s)</Form.Label>
                  <Form.Control as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  controlId="exampleForm.ControlSelect1"
                  className="advanced-input"
                >
                  <Form.Label>Telehealth</Form.Label>
                  <div>
                    <Form.Check inline label="Yes" id={`true`} type="radio" />
                    <Form.Check inline label="No" id={`false`} type="radio" />
                  </div>
                </Form.Group>
              </div>
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