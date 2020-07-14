import firebase from "firebase/app";
import "firebase/storage";
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: "splendid-parsec-277719.firebaseapp.com",
    databaseURL: "https://splendid-parsec-277719.firebaseio.com",
    projectId: "splendid-parsec-277719",
    storageBucket: "splendid-parsec-277719.appspot.com",
    messagingSenderId: "609857750007",
    appId: "1:609857750007:web:d2766a74ceb954e1d024f2",
    measurementId: "G-VD8354KV2C"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
