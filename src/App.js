import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Login from "./components/Login";
import { jsPsych } from "jspsych-react";
import { sleep } from "./lib/utils";
import { initParticipant, addToFirebase } from "./firebase";
import JsPsychExperiment from "./components/JsPsychExperiment";
import { MTURK, IS_ELECTRON, AT_HOME, FIREBASE, PROLIFIC } from "./config/main";
import { getTurkUniqueId } from "./lib/utils";

function App() {
  // Variables for time
  const dateTimestamp = Date.now();
  const curDate = new Date(dateTimestamp);
  const [startDate] = useState(curDate.toString());
  const [timestamp] = useState(dateTimestamp.toString());
  // Variables for login
  const [loggedIn, setLogin] = useState(false);
  const [ipcRenderer, setRenderer] = useState(false);
  const [psiturk, setPsiturk] = useState(false);
  const [envParticipantId, setEnvParticipantId] = useState("");
  const [envStudyId, setEnvStudyId] = useState("");
  const [currentMethod, setMethod] = useState("default");

  // Validation functions for desktop case and firebase
  const defaultValidation = async () => {
    return true;
  };
  const firebaseValidation = (participantId, studyId) => {
    return initParticipant(participantId, studyId, startDate, timestamp);
  };

  // Adding data functions for firebase, electron adn Mturk
  const defaultFunction = (data) => {};
  const firebaseUpdateFunction = (data) => {
    addToFirebase(data);
  };
  const desktopUpdateFunction = (data) => {
    ipcRenderer.send("data", data);
  };
  const psiturkUpdateFunction = (data) => {
    psiturk.recordTrialData(data);
  };

  // On finish functions for electron, Mturk
  const desktopFinishFunction = () => {
    ipcRenderer.send("end", "true");
  };
  const psiturkFinishFunction = () => {
    const completePsiturk = async () => {
      psiturk.saveData();
      await sleep(5000);
      psiturk.completeHIT();
    };
    completePsiturk();
  };

  // Function to add jspsych data on login
  const setLoggedIn = useCallback(
    (loggedIn, studyId, participantId) =>{
      jsPsych.data.addProperties({
        participant_id: participantId,
        study_id: studyId,
        timestamp: timestamp,
        start_date: startDate,
      });
      setLogin(loggedIn)
    },
    [startDate, timestamp],
  )

  // Login logic
  useEffect(() => {
    // For testing and debugging purposes
    console.log("MTURK? :" + MTURK);
    console.log("ELECTRON? :" + IS_ELECTRON);
    console.log("AT_HOME? :" + AT_HOME);
    console.log("FIREBASE? :" + FIREBASE);

    // If on desktop
    if (IS_ELECTRON) {
      const electron = window.require("electron");
      const renderer = electron.ipcRenderer;
      setRenderer(renderer);
      // If at home, fill in fields based on environment variables
      const credentials = renderer.sendSync("syncCredentials");
      if (credentials.envParticipantId !== null) {
        setEnvParticipantId(credentials.envParticipantId);
      }
      if (credentials.envStudyId !== null) {
        setEnvStudyId(credentials.envStudyId);
      }
      setMethod("desktop");
      // If online
    } else {
      // If MTURK
      if (MTURK) {
        /* eslint-disable */
        window.lodash = _.noConflict();
        const turkId = getTurkUniqueId();
        const dateTimestamp = Date.now();
        const curDate = new Date(dateTimestamp);
        setPsiturk(new PsiTurk(turkId, "/complete"));
        setMethod("mturk");
        setLoggedIn(true, "mturk", turkId)
        /* eslint-enable */
      }
      // If firebase
      else if (FIREBASE) {
        // If prolific - currectly placeholder
        if (PROLIFIC) {
        }
        // Otherwise - currently placeholder
        else {
        }
        setMethod("firebase");
      }
    }
  }, [setLoggedIn, startDate, timestamp]);

  return (
    <>
      {loggedIn ? (
        <JsPsychExperiment
          dataUpdateFunction={
            {
              desktop: desktopUpdateFunction,
              firebase: firebaseUpdateFunction,
              mturk: psiturkUpdateFunction,
              default: defaultFunction,
            }[currentMethod]
          }
          dataFinishFunction={
            {
              desktop: desktopFinishFunction,
              mturk: psiturkFinishFunction,
              firebase: defaultFunction,
              default: defaultFunction,
            }[currentMethod]
          }
        />
      ) : (
        <Login
          validationFunction={
            {
              desktop: defaultValidation,
              default: defaultValidation,
              firebase: firebaseValidation,
            }[currentMethod]
          }
          envParticipantId={envParticipantId}
          envStudyId={envStudyId}
          onLogin={setLoggedIn}
        />
      )}
    </>
  );
}

export default App;
