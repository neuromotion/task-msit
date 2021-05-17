import firebase from "firebase/app";
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
const createPatient = (patientId, studyId) => {
  // return promise with value true if patient and study id match, false otherwise
  return db.collection(collectionName)
    .doc(studyId)
    .set({ study_id: studyId })
  .then(() => {
    return db.collection(collectionName)
    .doc(studyId)
    .collection('participants')
    .doc(patientId).set({participant_id: patientId})
    .then(()=>{
      console.log('success')
      return true
    })
    .catch((error) => {
      window.alert("Fields don't match")
      return false
    });
  })
  .catch((error) => {
      window.alert("Fields don't match")
      return false
  });
};

/*
const addToEnd = (patientId, studyId, data) =>{
  //const patientId = data.patient_id;
  //const studyId = data.study_id;
  db.collection(collectionName)
    .doc(studyId)
    .collection('participants')
    .doc(patientId)
    .set({data:data},{merge:true})
}
*/

// Add inidividual trials to db
const addToFirebase = (data) => {
  console.log(data)
  const patientId = data.patient_id;
  const studyId = data.study_id;
  var nowDate = new Date(); 
  var date = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate()+'3';
  
  db.collection(collectionName)
    .doc(studyId)
    .collection('participants')
    .doc(patientId)
    .collection(date)
    .doc(`trial_${data.trial_index}`)
    .set(data);
};

// Export types that exists in Firestore
export {
  db,
  collectionName,
  createPatient,
  addToFirebase
};

export default firebase;