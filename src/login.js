import React, { useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {createPatient} from './firebase'
import { useHistory } from 'react-router-dom';
import { jsPsych } from 'jspsych-react'

 function Login() {
    const dateTimestamp = Date.now()
    const curDate = new Date(dateTimestamp)
    const [patientId, setPatient] = useState("");
    const [studyId, setStudy] = useState("")
    const [startDate, setDate] = useState(curDate.toString())
    const [timestamp, setTimestamp] = useState(dateTimestamp.toString())
    const history = useHistory();

    function validateForm() {
        return patientId.length > 0 && studyId.length > 0;
      }

    function handleSubmit(e) {
        e.preventDefault();
        const logPatient = async() =>{
            const loggedIn = await createPatient(patientId, studyId, startDate, timestamp)
            
            if(loggedIn){
                jsPsych.data.addProperties({patient_id: patientId, study_id: studyId, timestamp: timestamp, start_date: startDate})
                history.push('/experiment')
            }
            
        }
        logPatient()
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

    export default Login