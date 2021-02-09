import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "hiamftdirectory-287502.firebaseapp.com",
  databaseURL: "https://hiamftdirectory-287502.firebaseio.com",
  projectId: "hiamftdirectory-287502",
  storageBucket: "hiamftdirectory-287502.appspot.com",
  messagingSenderId: "288525710799",
  appId: "1:288525710799:web:79627c7e08cc2c3f234eba",
  measurementId: "G-3MJC9GZ268"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };