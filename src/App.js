import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Login from "./components/Login";
import JsPsychExperiment from "./components/JsPsychExperiment";
import { MTURK, IS_ELECTRON } from "./config/main";
import { getTurkUniqueId } from "./lib/utils";
import LoginContext from "./contexts/LoginContext";

function App() {
  // Variables for login context
  const [loggedIn, setLogin] = useState(false);
  const login = () => setLogin(true);

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

  return (
    <LoginContext.Provider value={{ loggedIn, login }}>
      {loggedIn ? (
        <JsPsychExperiment ipcRenderer={ipcRenderer} psiturk={psiturk} />
      ) : (
        <Login ipcRenderer={ipcRenderer}/>
      )}
    </LoginContext.Provider>
  );
}

export default App;
