import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import members from './membersReducer';
import profile from './profileReducer';
import user from './userReducer';
import languages from './fetchlanguages';
import islands from './IslandReducer';
import specialtys from './specialityReducer';
import insuranceTaken from './insuranceTakenReducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  members, //will have all members 
  profile, //will have specific user profile details
  user, // will have an id and username if someone is logged in
  languages,// will have all the language options when creating a profile
  islands, //will have all the islands names on ready 
  specialtys, //will have all the info about the practice for the members
  insuranceTaken //will have all insurance types used 
});

export default rootReducer;
