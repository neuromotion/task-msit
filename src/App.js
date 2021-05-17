import React from 'react'
import { Experiment, jsPsych } from 'jspsych-react'
import { Redirect, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { tl } from './timelines/main'
import { MTURK, FIREBASE } from './config/main'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { getTurkUniqueId, sleep } from './lib/utils'
import { rt_categorize_html } from './lib/rt-categorize-html'
import { addToFirebase, createPatient} from "./firebase.js";
import Login from './login'



var LOGGEDIN = false
const isElectron = !MTURK
let ipcRenderer = false;
let psiturk = false
if (isElectron) {
  const electron = window.require('electron');
  ipcRenderer  = electron.ipcRenderer;
} else {
  /* eslint-disable */
  window.lodash = _.noConflict()
  psiturk = new PsiTurk(getTurkUniqueId(), '/complete')
  /* eslint-enable */
}



class ExpStart extends React.Component {
  render() {
    console.log("Outside Turk:", jsPsych.turk.turkInfo().outsideTurk)
    console.log("Turk:", MTURK)
    jsPsych.plugins['rt-categorize-html'] = rt_categorize_html();
    
    return (
      <div className="App">
        <Experiment settings={{
          timeline: tl,
          on_data_update: (data) => {
            //firebase 
            if(FIREBASE){
              if (data.trial_index === 1) {
  
                createPatient(data.patient_id, data.study_id);
                //addToFirebase(data)
              }
              if (data.trial_index > 1) {
                addToFirebase(data);
              }
            }
            else if ( ipcRenderer ) {
              ipcRenderer.send('data', data)
            }
            else if (psiturk) {
                psiturk.recordTrialData(data)
            }
          },
          on_finish: (data) => {
            
            if ( ipcRenderer ) {
              ipcRenderer.send('end', 'true')
            }
            else if (psiturk) {
              const completePsiturk = async () => {
                psiturk.saveData()
                await sleep(5000)
                psiturk.completeHIT()
              }
              completePsiturk()
            }
          },
        }}
        />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
          <Route exact path="/">
            {LOGGEDIN ? <Redirect to="/experiment" /> : <Login/>}
          </Route>
            <Route path='/experiment' component={ExpStart} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App
