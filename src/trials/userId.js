import { lang, MTURK } from '../config/main'
import { getUserId, getTrialId, getTurkUniqueId } from '../lib/utils'
import { baseStimulus } from '../lib/markup/stimuli'




const userId = () => {
  if (MTURK) {
    return {
      type: 'html_keyboard_response',
      stimulus: baseStimulus(`<h1>${lang.userid.set}</h1>`, true),
      response_ends_trial: false,
      trial_duration: 800,
      on_finish: (data) => {
        const uniqueId = getTurkUniqueId()
        console.log(uniqueId)
      }
    }
  }
  else {
    const ipcRenderer = window.require('electron').ipcRenderer;
    const envPatientId = ipcRenderer.sendSync('syncPatientId')
    const envTrialId = ipcRenderer.sendSync('syncPatientId')

    return {
      type: 'survey_text',
      questions: [{ prompt: baseStimulus(`<h1>${lang.userid.set}</h1>`, true), value: envPatientId===null?lang.userid.patientID: envPatientId},
      {prompt: '', value: envTrialId===null?lang.userid.trialID: envTrialId}],
      on_finish: (data) => {
        getUserId(data)
        getTrialId(data)
      }
      
    }
  }
}

export default userId
