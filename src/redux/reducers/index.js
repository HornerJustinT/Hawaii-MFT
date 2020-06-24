import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import members from './membersReducer';
import profile from './profileReducer';
import user from './userReducer';
import languages from './fetchLanguages';
import islands from './IslandReducer';
import specialtys from './specialityReducer';
import insuranceTaken from './insuranceTakenReducer';
import license from './fetchLicenseType';
import treatmentPreferences from './treatmentReducer';
import demographics from './clientFocusReducer';
import ageGroups from './ageGroupsReducer';
import registrationKeyValidation from './registrationKeyValidationReducer';
import sessionFormats from './sessionFormatReducer';
import createProfile from './profileCreateReducer';
import contactAddress from './contactAddressReducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  ageGroups, //will have all the age group served
  contactAddress, //will have zipCode and City for members table
  createProfile, // will have some of the inputs for members table from createProfile page
  demographics, //will have all the client focus demographics
  errors, // contains registrationMessage and loginMessage
  insuranceTaken, //will have all insurance types used
  islands, //will have all the islands names on ready
  languages, // will have all the language options when creating a profile
  license, //will have all the licesne types members have
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  members, //will have all members
  profile, //will have specific user profile details
  registrationKeyValidation, //will have results from registration table 
  sessionFormats, // will have all the session formats
  specialtys, //will have all the info about the practice for the members
  treatmentPreferences, // will have all the treament approaches
  user, // will have an id and username if someone is logged in
});

export default rootReducer;
