// React Imports
import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';


// Redux
import {connect} from 'react-redux';

// Global Components
import NavBootstrap from "../NavBootstrap/NavBootstrap";
import Footer from '../Footer/Footer';

// Middleware
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

// Pages
import ContactPage from '../ContactPage/ContactPage';
import UserPage from '../UserPage/UserPage';
import LoginPage from '../LoginPage/LoginPage';
import ProfileEdit from '../ProfileEdit/ProfileEdit';
import ProfileCreate from '../ProfileCreate/ProfileCreate';
import HomePage from '../HomePage/HomePage';
import RegisterPage from '../RegisterPage/RegisterPage';

// CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          {/* Rendering NavBar component*/}
          <NavBootstrap />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" component={HomePage} />

            {/* Visiting localhost:3000/home will show the home page.
            This is a route anyone can see, no login necessary */}
            <Route exact path="/home" component={HomePage} />

            {/* Visiting localhost:3000/contact will show the contact page.
            This is a route anyone can see, no login necessary */}
            <Route exact path="/contact" component={ContactPage} />
            {/*This is a route anyone can see, no login necessary */}
            <Route exact path="/register" component={RegisterPage} />
            {/*This is a route anyone can see, no login necessary */}
            <Route exact path="/login" component={LoginPage} />
            {/*User only sees these routes if logged in*/}
            <ProtectedRoute exact path="/edit-profile" component={ProfileEdit} />
            <ProtectedRoute exact path="/create-profile" component={ProfileCreate} />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );}
}

export default connect()(App);
