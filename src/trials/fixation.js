import { eventCodes } from '../config/main'
import { pdSpotEncode, photodiodeGhostBox } from '../lib/markup/photodiode'
import { fixationHTML } from '../lib/markup/fixation'
import { jsPsych } from 'jspsych-react'
import { jitter, removeCursor } from '../lib/utils'

const fixation = (trial) => {
  let stimulus = fixationHTML + photodiodeGhostBox()

  const code = eventCodes.fixation;
const duration = jitter(3000,1000);
// trial.Duration will not be used for our purposes.
  return {
    type: 'html_keyboard_response',
    choices: jsPsych.NO_KEYS,
    stimulus: stimulus,
    response_ends_trial: false,
//    trial_duration: trial.Duration*1000,
    trial_duration: duration,
    on_load: () => {
      removeCursor('experiment')
      pdSpotEncode(code)
    },
    on_finish: (data) => data.code = code
  }
}

export default fixation
