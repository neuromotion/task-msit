import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Login from "./components/Login";
import JsPsychExperiment from "./components/JsPsychExperiment";
import { MTURK, IS_ELECTRON } from "./config/main";
import { getTurkUniqueId } from "./lib/utils";

function App() {
  // Variables for login
  const [loggedIn, setLogin] = useState(false);
  const [ipcRenderer, setRenderer] = useState(false);
  const [psiturk, setPsiturk] = useState(false);

  // All Mturk and other login logic will go here
  useEffect(() => {
    if (IS_ELECTRON) {
      const electron = window.require("electron");
      setRenderer(electron.ipcRenderer);
    } else if (MTURK) {
      /* eslint-disable */
      window.lodash = _.noConflict();
      setPsiturk(new PsiTurk(getTurkUniqueId(), "/complete"));
      /* eslint-enable */
    }
  }, []);

  // Callback function for when login
  const handleCallBack = () => {
    setLogin(true)
  }

  return (
    <>
      {loggedIn ? (
        <JsPsychExperiment ipcRenderer={ipcRenderer} psiturk={psiturk} />
      ) : (
        <Login ipcRenderer={ipcRenderer} callBack = {handleCallBack}/>
      )}
    </>
  );
}

export default App;
