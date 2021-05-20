import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createPatient } from "../firebase";
import { jsPsych } from "jspsych-react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";

function Login({ipcRenderer, callBack}) {
  // State variables for login screen
  const dateTimestamp = Date.now();
  const curDate = new Date(dateTimestamp);
  const [patientId, setPatient] = useState("");
  const [studyId, setStudy] = useState("");
  const [startDate] = useState(curDate.toString());
  const [timestamp] = useState(dateTimestamp.toString());

  useEffect(()=>{
    // Loads environment patientId and studyId to autofill
    if (ipcRenderer){
      const envPatientId = ipcRenderer.sendSync('syncPatientId')
      const envStudyId = ipcRenderer.sendSync('syncStudyId')
      if (envPatientId!=null){
        setPatient(envPatientId)
      }
      if (envStudyId!=null){
        setStudy(envStudyId)
      }
    }
  },[ipcRenderer])


  // Checks if forms are filled in
  function validateForm() {
    return patientId.length > 0 && studyId.length > 0;
  }

  // Function to log in patient
  function handleSubmit(e) {
    e.preventDefault();
    const logPatient = async () => {
      // Checks if patient exists in firestore
      const loggedIn = await createPatient(
        patientId,
        studyId,
        startDate,
        timestamp
      );

      // If patient and study are registered
      if (loggedIn) {
        jsPsych.data.addProperties({
          patient_id: patientId,
          study_id: studyId,
          timestamp: timestamp,
          start_date: startDate,
        });
        callBack();
      }
    };
    logPatient();
  }

  return (
    <div className="centered-h-v">
      <div className="width-50">
        <Form className="centered-h-v" onSubmit={handleSubmit}>
          <Form.Group className="width-100" size="lg" controlId="patientId">
            <Form.Label>PatientId</Form.Label>
            <Form.Control
              autoFocus
              type="patientId"
              value={patientId}
              onChange={(e) => setPatient(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="width-100" size="lg" controlId="studyId">
            <Form.Label>StudyId</Form.Label>
            <Form.Control
              type="studyId"
              value={studyId}
              onChange={(e) => setStudy(e.target.value)}
            />
          </Form.Group>
          <Button
            style={{ width: "100%" }}
            block
            size="lg"
            type="submit"
            disabled={!validateForm()}
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
