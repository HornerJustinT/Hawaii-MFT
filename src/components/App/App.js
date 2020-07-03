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
import Footer from "../Footer/Footer";
import NavBootstrap from "../NavBootstrap/NavBootstrap";


// Middleware
import AdminRoute from "../AdminRoute/AdminRoute";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";


// Pages
import AdminPage from "../AdminPage/AdminPage";
import ContactInfo from "../ProfileCreate/ContactInfo/ContactInfo";
import ContactPage from '../ContactPage/ContactPage';
import HomePage from "../HomePage/HomePage";
import LoginPage from '../LoginPage/LoginPage';
import PracticeInfo from "../ProfileCreate/PracticeInfo/PracticeInfo";
import ProfileCreate from "../ProfileCreate/ProfileCreate";
import studentProfile from "../ProfileCreate/studentProfile/studentProfile";
import ProfileEdit from '../ProfileEdit/ProfileEdit';
import ProfileView from "../ProfileView/ProfileView";
import RegisterPage from '../RegisterPage/RegisterPage';
import ProfileEditStudent from '../ProfileEdit/ProfileEditStudent';
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import NewPassword from "../NewPassword/NewPassword";


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
            <Route exact path="/register/:id" component={RegisterPage} />
            {/*This is a route anyone can see, no login necessary */}
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/passwordreset/:key" component={NewPassword} />
            {/*This is a route anyone can see, no login necessary */}
            <ProtectedRoute exact path="/create-profile" component={ProfileCreate} />

            {/*User only sees these routes if logged in*/}
            <ProtectedRoute exact path="/edit-profile" component={ProfileEdit} />
            <ProtectedRoute exact path="/edit-student" component={ProfileEditStudent} />

            <ProtectedRoute exact path="/contact-info" component={ContactInfo} />
            <ProtectedRoute exact path="/practice" component={PracticeInfo} />
            <ProtectedRoute exact path="/student" component={studentProfile} />

            {/* Admin View */}
            <AdminRoute exact path="/admin-edit-profile/:id" component={ProfileEdit} />
            <Route exact path="/profile/:id" component={ProfileView} />
       




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
