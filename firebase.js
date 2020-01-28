import * as firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyCntZ0wgrRDapAOF91F7YfViUE_CueO4SI",
  authDomain: "school-university-c3f48.firebaseapp.com",
  databaseURL: "https://school-university-c3f48.firebaseio.com",
  projectId: "school-university-c3f48",
  storageBucket: "school-university-c3f48.appspot.com",
  messagingSenderId: "20335319081",
  appId: "1:20335319081:web:b6110d5d6c44e146076438",
  measurementId: "G-RRTHGNHG6V"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
