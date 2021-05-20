import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Login from "./components/Login";
import JsPsychExperiment from "./components/JsPsychExperiment";
import { MTURK, IS_ELECTRON, AT_HOME, FIREBASE, PROLIFIC } from "./config/main";
import { getTurkUniqueId } from "./lib/utils";

function App() {
  // Variables for login
  const [loggedIn, setLogin] = useState(false);
  const [ipcRenderer, setRenderer] = useState(false);
  const [psiturk, setPsiturk] = useState(false);
  const [participantId, setParticipant] = useState('')
  const [studyId, setStudy] = useState('')
  const [validationMethod, setValidation] = useState('')

  // Login logic
  useEffect(() => {
    // For testing and debugging purposes
    console.log('MTURK? :' + MTURK)
    console.log('ELECTRON? :' + IS_ELECTRON)
    console.log('AT_HOME? :' + AT_HOME)
    console.log('FIREBASE? :' + FIREBASE)

    // If on desktop
    if (IS_ELECTRON) {
      const electron = window.require("electron");
      const renderer = electron.ipcRenderer
      setRenderer(renderer);
      // If at home, fill in fields based on environment variables
      if (AT_HOME) {
        const credentials = renderer.sendSync('syncCredentials')
        if (credentials[0]!= null){
          setParticipant(credentials[0])
        }
        if (credentials[1]!= null){
          setStudy(credentials[1])
        }
      }
      // If in clinic - currently placeholder
      else{
        
      }
      setValidation('desktop')
    // If online
    } else {
      // If MTURK
      if (MTURK) {
        /* eslint-disable */
        window.lodash = _.noConflict();
        setPsiturk(new PsiTurk(getTurkUniqueId(), "/complete"));
        setLogin(true)
        /* eslint-enable */
      }
      // If firebase
      else if (FIREBASE){
        // If prolific - currectly placeholder
        if (PROLIFIC) {

        }
        // Otherwise - currently placeholder
        else{

        }
        setValidation('firebase')
      }
    }
    
  },[]);

  return (
    <>
      {loggedIn ? (
        <JsPsychExperiment ipcRenderer={ipcRenderer} psiturk={psiturk} />
      ) : (
        <Login validation = {validationMethod} participant_id = {participantId} study_id = {studyId} onLogin = {setLogin}/>
      )}
    </>
  );
}

export default App;
