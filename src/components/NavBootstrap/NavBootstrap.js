// React Imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';

// Redux
import { connect } from 'react-redux';

// Components
import LogOutButton from '../LogOutButton/LogOutButton';

// Styling
import "./NavBootstrap.css";
import logo from '../../Images/HIAMFTlogo-white.png';
import "../App/App.css";


// React-Bootstrap
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from 'react-bootstrap/Nav'

class NavBar extends Component{

  handleClick = () => {
    this.props.dispatch({ type: "PROFILE_RESET" });
    this.props.history.push(`/edit-profile`);
  }

  render(){
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Navbar.Brand>
                <a href="#">
                  <img src={logo} style={{ width: 100, marginTop: -7 }} />
                </a>
              </Navbar.Brand>
              <Navbar.Brand href="#home" className="title">
                Hawaiian Islands Association for Marriage & Family Therapy
                Directory
              </Navbar.Brand>
            </Nav>

            <Nav>
              {/* If the user is NOT logged show the Login and Register links; otherwise, show nothing.*/}
              <NavDropdown
                className="menu"
                title="Menu"
                id="collasible-nav-dropdown"
              >
                {/* Show the link to the SearchBar at /home whether or not user is logged in */}
                <NavDropdown.Item href="#home">
                  Search Directory
                </NavDropdown.Item>

                {/* If user is logged in, show the link to the My Profile page, Contact page, and the Logout button */}
                {/* If user is logged out, show the link to the Contact page and Login. */}
                {this.props.user.id ? (
                  <>
                    <NavDropdown.Item onClick={this.handleClick}>
                      My Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#contact">
                      Contact Us
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <LogOutButton />
                  </>
                ) : (
                  <>
                    <NavDropdown.Item href="#contact">
                      Contact Us
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#login">Login</NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>

            <Nav className="login">
              {!this.props.user.id && (
                <>
                  <Nav.Link href="#login">Login</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}



const mapStateToProps = state => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(NavBar));
