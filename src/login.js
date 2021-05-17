import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createPatient } from "./firebase";
import { useHistory } from "react-router-dom";
import { jsPsych } from "jspsych-react";

function Login() {
  const [patientId, setPatient] = useState("");
  const [studyId, setStudy] = useState("");
  const history = useHistory();

  function validateForm() {
    return patientId.length > 0 && studyId.length > 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const logPatient = async () => {
      const loggedIn = await createPatient(patientId, studyId);

      if (loggedIn) {
        jsPsych.data.addProperties({
          patient_id: patientId,
          timestamp: Date.now(),
        });
        jsPsych.data.addProperties({
          study_id: studyId,
          timestamp: Date.now(),
        });
        history.push("/experiment");
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
        <Button style={{width: "100%"}} block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
      </div>
    </div>
  );
}

export default Login;
