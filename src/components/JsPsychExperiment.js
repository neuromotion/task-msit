
import React from 'react'
import { Experiment, jsPsych } from 'jspsych-react'
import { tl } from '../timelines/main'
import { FIREBASE} from '../config/main'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { sleep } from '../lib/utils'
import { rt_categorize_html } from '../lib/rt-categorize-html'
import { addToFirebase } from "../firebase.js";



function JsPsychExperiment({ ipcRenderer, psiturk }) {
    
    console.log("Outside Turk:", jsPsych.turk.turkInfo().outsideTurk)
    jsPsych.plugins['rt-categorize-html'] = rt_categorize_html();
      
      return (
        <div className="App">
          <Experiment settings={{
            timeline: tl,
            on_data_update: (data) => {
              console.log(data)
              // firebase case
              if(FIREBASE){
                addToFirebase(data);
              }
              // Electron case
              else if ( ipcRenderer ) {
                ipcRenderer.send('data', data)
              }
              // Mturk case
              else if (psiturk) {
                  psiturk.recordTrialData(data)
              }
            },
            on_finish: (data) => {
              // Electron case
              if ( ipcRenderer ) {
                ipcRenderer.send('end', 'true')
              }
              // Mturk case
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
export default JsPsychExperiment
  