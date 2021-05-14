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
const createPatient = (data) => {
  const patientId = data.patient_id
  const studyId = data.study_id;
  db.collection(collectionName)
    .doc(studyId)
    .set({ study_id: studyId, date_created: new Date() })
  .then(() => {
    db.collection(collectionName)
    .doc(studyId)
    .collection('patients')
    .doc(patientId).set({patient_id: patientId, study_id: studyId, date_created: new Date()})
    .then(()=>{
      console.log('success')
    })
    .catch((error) => {
      window.alert("Fields don't match")
    });
  })
  .catch((error) => {
      window.alert("Fields don't match")
  });
};

// Add inidividual trials to db
const addToFirebase = (data) => {
  console.log(data)
  const patientId = data.patient_id;
  const studyId = data.study_id;
  
  db.collection(collectionName)
    .doc(studyId)
    .collection('patients')
    .doc(patientId)
    .collection('data')
    .doc(`trial_${data.trial_index}`)
    .set(data);
};

// Export types that exists in Firestore
export {
  db,
  collectionName,
  createPatient,
  addToFirebase,
};

export default firebase;