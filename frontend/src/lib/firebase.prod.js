import Firebase from "firebase/app";
import "firebase/storage";
// import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAT_aRgj-IJ7Repbzoc4SMIAHqWvmHSZes",
  authDomain: "major-project-812bd.firebaseapp.com",
  projectId: "major-project-812bd",
  storageBucket: "major-project-812bd.appspot.com",
  messagingSenderId: "583386789533",
  appId: "1:583386789533:web:4928e68d9a77b5579ec674"
};

const firebase = Firebase.initializeApp(config);

export { firebase };
