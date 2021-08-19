import { lang, envConfig } from '../config/main'
import { photodiodeGhostBox } from '../lib/markup/photodiode'
import { baseStimulus } from '../lib/markup/stimuli'
import { jsPsych } from 'jspsych-react'

const accuracy = (training, num_trials, num_complete, experimentConfig) => {
   return {
    type: 'html_keyboard_response',
    stimulus: '',
    data: {percent_correct: 0},
    on_finish: () => {
      if (envConfig.USE_PHOTODIODE){
        const j_data = jsPsych.data.get().last(1).values()[0]
        if (!training && num_complete>=j_data.num_blocks*96) {
          jsPsych.endCurrentTimeline()
      }
      }
    },
    on_start: (trial) => {
      const data = jsPsych.data.get().last(num_trials).values()
      const num_correct = data.reduce((accumulator, item) => {
        if (typeof item.correct === 'undefined') {
          return accumulator
        }
        else {
          if (item.correct) {
            return accumulator + 1
          }
          else {
            return accumulator
          }
        }
      }, 0)
      trial.data.percent_correct = 100*2*num_correct/data.length;
      trial.stimulus = baseStimulus(`<h1>${Math.floor(trial.data.percent_correct).toString()+'%'}</h1>`, true) + photodiodeGhostBox();
      if (training) {
        if (trial.data.percent_correct < experimentConfig.accuracy_cutoff) {
          trial.prompt = lang.prompt.continue.training_failed_accuracy + experimentConfig.accuracy_cutoff + lang.prompt.continue.training_failed_continue
        }
        else {
          trial.prompt = lang.prompt.continue.training_success
        }
      } else {
        const j_data = jsPsych.data.get().last(1).values()[0]
        if (envConfig.USE_PHOTODIODE){
          trial.prompt = lang.prompt.continue.block + (num_complete/96).toString() + lang.prompt.continue.of + j_data.num_blocks + lang.prompt.continue.next_block
        }
        else {
          trial.prompt = lang.prompt.continue.block + (num_complete/96).toString() + lang.prompt.continue.of + '8' + lang.prompt.continue.next_block
        }
      }
    },
    prompt: 'temp'
  }
}

export default accuracy
