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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AdminRoute from "../AdminRoute/AdminRoute";

// Pages
import ContactPage from '../ContactPage/ContactPage';
import LoginPage from '../LoginPage/LoginPage';
import ProfileEdit from '../ProfileEdit/ProfileEdit';
import HomePage from '../HomePage/HomePage';
import RegisterPage from '../RegisterPage/RegisterPage';
import ProfileCreate from '../ProfileCreate/ProfileCreate'
import ContactInfo from '../ProfileCreate/ContactInfo/ContactInfo';
import PracticeInfo from '../ProfileCreate/PracticeInfo/PracticeInfo';
import ProfileView from '../ProfileView/ProfileView'
import AdminPage from '../AdminPage/AdminPage'


// CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'});
    this.props.dispatch({type: 'FETCH_LANGUAGES'});
    this.props.dispatch({type: 'FETCH_ISLANDS'});
    this.props.dispatch({type: 'FETCH_TREATMENT_APPROACHES'});
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

            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
           
            <Route exact path="/contact" component={ContactPage} />
            {/*This is a route anyone can see, no login necessary */}
            <Route exact path="/register" component={RegisterPage} />
            {/*This is a route anyone can see, no login necessary */}
            <Route exact path="/login" component={LoginPage} />
            {/*User only sees these routes if logged in*/}
            <ProtectedRoute exact path="/edit-profile" component={ProfileEdit} />

            {/* Admin View */}
            <AdminRoute exact path="/edit-profile/:id" component={ProfileEdit} />
            <Route exact path="/profile/:id" component={ProfileView} />
            <ProtectedRoute exact path="/create-profile" component={ProfileCreate} />
            <ProtectedRoute exact path="/contact-info" component={ContactInfo} />
            <ProtectedRoute exact path="/practice" component={PracticeInfo} />



            <AdminRoute exact path="/admin" component={AdminPage} />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );}
}

export default connect()(App);
