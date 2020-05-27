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
import HomePage from '../HomePage/HomePage';
import RegisterPage from '../RegisterPage/RegisterPage';
import InfoPage from '../InfoPage/InfoPage';
import ProfileCreate from '../ProfileCreate/ProfileCreate'
import ContactInfo from '../ProfileCreate/ContactInfo/ContactInfo';
import PracticeInfo from '../ProfileCreate/PracticeInfo/PracticeInfo';
import uploadImage from '../ProfileCreate/UploadImage/UploadImage';


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

            <ProtectedRoute exact path="/contact" component={ContactInfo} />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute exact path="/home" component={UserPage} />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
           
            <Route exact path="/contact" component={ContactPage} />
            {/*This is a route anyone can see, no login necessary */}
            <Route exact path="/register" component={RegisterPage} />
            {/*This is a route anyone can see, no login necessary */}
            <Route exact path="/login" component={LoginPage} />
            {/*User only sees these routes if logged in*/}
            <ProtectedRoute exact path="/edit-profile" component={ProfileEdit} />
            <ProtectedRoute exact path="/create-profile" component={ProfileCreate} />
            <ProtectedRoute exact path="/practice" component={PracticeInfo} />
            <ProtectedRoute exact path="/uploadImage" component={uploadImage} />
            <ProtectedRoute exact path="/info" component={InfoPage} />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );}
}

export default connect()(App);
