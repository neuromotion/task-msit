import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {  validateParticipant } from "../firebase";
import { jsPsych } from "jspsych-react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";

function Login({onLogin, participant_id, study_id, validation}) {
  // State variables for login screen
  const dateTimestamp = Date.now();
  const curDate = new Date(dateTimestamp);
  const [participantId, setParticipant] = useState('');
  const [studyId, setStudy] = useState('');
  const [startDate] = useState(curDate.toString());
  const [timestamp] = useState(dateTimestamp.toString());

  useEffect(()=>{
    setParticipant(participant_id)
    setStudy(study_id)
  },[participant_id, study_id])


  // Checks if forms are filled in
  function validateForm() {
    return participantId.length > 0 && studyId.length > 0
  }

  // Function to log in participant
  function handleSubmit(e) {
    e.preventDefault();
    
    const logParticipant = async () => {

      let loggedIn = false
      // If firebase
      if (validation === 'firebase'){
        // Checks if participant exists in firestore
        loggedIn = await validateParticipant(
          participantId,
          studyId,
          startDate,
          timestamp
        );
      }
      // Else desktop
      else if (validation === 'desktop'){
          // Currently just placeholder
          loggedIn = true
      }

      // Update credentials
      if (loggedIn) {
        jsPsych.data.addProperties({
          participant_id: participantId,
          study_id: studyId,
          timestamp: timestamp,
          start_date: startDate,
        });   
      }
      onLogin(loggedIn);
    };
    logParticipant();
  }

  return (
    <div className="centered-h-v">
      <div className="width-50">
        <Form className="centered-h-v" onSubmit={handleSubmit}>
          <Form.Group className="width-100" size="lg" controlId="participantId">
            <Form.Label>ParticipantId</Form.Label>
            <Form.Control
              autoFocus
              readOnly = {participant_id!==''? true :false}
              type="participantId"
              value={participantId}
              onChange={(e) => setParticipant(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="width-100" size="lg" controlId="studyId">
            <Form.Label>StudyId</Form.Label>
            <Form.Control
              readOnly = {study_id!==''? true :false}
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
