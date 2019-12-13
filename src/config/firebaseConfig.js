import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDF0tLwzI5g4OytyPWmM0e5bxxR9GGk55o",
    authDomain: "wireframe-55f2d.firebaseapp.com",
    databaseURL: "https://wireframe-55f2d.firebaseio.com",
    projectId: "wireframe-55f2d",
    storageBucket: "wireframe-55f2d.appspot.com",
    messagingSenderId: "582540599155",
    appId: "1:582540599155:web:5b7f932b540ef7b0deaf06",
    measurementId: "G-Z7LE366SJE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;