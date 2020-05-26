// // React Imports
// import React from 'react';
// import { Link } from 'react-router-dom';

// // Redux
// import { connect } from 'react-redux';

// // Components
// import LogOutButton from '../LogOutButton/LogOutButton';

// // Styling
// import './Nav.css';

// // // React-Bootstrap
// // import Navbar from "react-bootstrap/Navbar";
// // import NavDropdown from "react-bootstrap/NavDropdown";
// // import Form from "react-bootstrap/Form";
// // import FormControl from "react-bootstrap/FormControl";
// // import Button from "react-bootstrap/Button";

// const Nav = (props) => (
//   <div className="nav">
//     <Link to="/home">
//       <h2 className="nav-title">Hawaii MFT</h2>
//     </Link>
//     <div className="nav-right">
//       <Link className="nav-link" to="/home">
//         {/* Show this link if they are logged in or not,
//         but call this link 'Home' if they are logged in,
//         and call this link 'Login / Register' if they are not */}

//         {props.user ? "Home" : "Login / Register"}
//       </Link>

//       {/* Show the link to the info page and the logout button if the user is logged in */}

//       {props.user && (
//         <>
//           <Link className="nav-link" to="/info">
//             Info Page
//           </Link>
//           <LogOutButton className="nav-link" />
//         </>
//       )}
//       {/* Always show this link since the about page is not protected */}
//       <Link className="nav-link" to="/about">
//         About
//       </Link>
//     </div>
//   // </div>
// );

// // Instead of taking everything from state, we just want the user
// // object to determine if they are logged in
// // if they are logged in, we show them a few more links 
// // if you wanted you could write this code like this:
// // const mapStateToProps = ({ user }) => ({ user });

// const mapStateToProps = state => ({
//   user: state.user,
// });

// export default connect(mapStateToProps)(Nav);
