import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { jsPsych } from "jspsych-react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";

function Login({ onLogin, envParticipantId, envStudyId, validationFunction }) {
  // State variables for login screen
  const dateTimestamp = Date.now();
  const curDate = new Date(dateTimestamp);
  const [startDate] = useState(curDate.toString());
  const [timestamp] = useState(dateTimestamp.toString());
  const [participantId, setParticipant] = useState("");
  const [studyId, setStudy] = useState("");

  useEffect(() => {
    // Update based on environment variables
    setParticipant(envParticipantId);
    setStudy(envStudyId);
  }, [envParticipantId, envStudyId]);

  // Checks if forms are filled in
  function validateForm() {
    return participantId.length > 0 && studyId.length > 0;
  }

  // Function to log in participant
  function handleSubmit(e) {
    e.preventDefault();
    // Validates fields
    validationFunction(participantId, studyId, startDate, timestamp)
    // Logs in depending on result from promise
    .then((loggedIn) => {
      if (loggedIn) {
        jsPsych.data.addProperties({
          participant_id: participantId,
          study_id: studyId,
          timestamp: timestamp,
          start_date: startDate,
        });
        onLogin(true);
      }
    });
  }

  return (
    <div className="centered-h-v">
      <div className="width-50">
        <Form className="centered-h-v" onSubmit={handleSubmit}>
          <Form.Group className="width-100" size="lg" controlId="participantId">
            <Form.Label>ParticipantId</Form.Label>
            <Form.Control
              autoFocus
              readOnly={envParticipantId !== "" ? true : false}
              type="participantId"
              value={participantId}
              onChange={(e) => setParticipant(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="width-100" size="lg" controlId="studyId">
            <Form.Label>StudyId</Form.Label>
            <Form.Control
              readOnly={envStudyId !== "" ? true : false}
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
