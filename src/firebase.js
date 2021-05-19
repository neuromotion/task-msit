import firebase from "firebase";
import 'firebase/firestore';

require("dotenv").config();

// Set collection name
const collectionName = "participant_responses";

// Firebase config
let config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId || "no-firebase",
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};


// Get a Firestore instance
var db = firebase.initializeApp(config).firestore();

// Use emulator if on localhost
if (window.location.hostname === "localhost") {
  db.useEmulator("localhost", 8080);
}

// Add patient data and trial data to db
const createPatient = (patientId, studyId, startDate, timestamp) => {
  // return promise with value true if patient and study id match, false otherwise
    return db.collection(collectionName)
    .doc(studyId)
    .collection('participants')
    .doc(patientId)
    .collection('data')
    .doc(timestamp)
    .set({start_time: startDate, app_version: window.navigator.appVersion, app_platform: window.navigator.platform, results: []})
    .then(()=>{
      console.log('success')
      return true
    })
    .catch((error) => {
      window.alert("You are not authorized to access the experiment")
      return false
    });
};

// Add inidividual trials to db
const addToFirebase = (data) => {
  console.log(data)
  const patientId = data.patient_id;
  const studyId = data.study_id;
  const timestamp = data.timestamp
  
  db.collection(collectionName)
    .doc(studyId)
    .collection('participants')
    .doc(patientId)
    .collection('data')
    .doc(timestamp)
    .update('results', firebase.firestore.FieldValue.arrayUnion(data))
};

// Export types that exists in Firestore
export {
  db,
  collectionName,
  createPatient,
  addToFirebase
};

export default firebase;