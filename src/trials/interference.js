import interferenceTrial  from '../lib/markup/trial'
import { pdSpotEncode, photodiodeGhostBox } from '../lib/markup/photodiode'
import { eventCodes, lang } from '../config/main'
import { jsPsych } from 'jspsych-react'

const interference = (trial) => {

  const code = eventCodes.non_fixation;
  var stimulus = interferenceTrial(trial.Stimuli, false) + photodiodeGhostBox()
  return {
    type: 'rt-categorize-html',
    trial_duration: 1250,
    on_load: () => pdSpotEncode(code),
    key_answer: 48+trial.Correct,
    show_stim_with_feedback: false,
    feedback_duration: 2000,
    timeout_message: interferenceTrial(lang.prompt.too_slow, true) + photodiodeGhostBox(),
    stimulus: stimulus,
    response_ends_trial: true,
    on_finish: (data) => {
      if (data.key_press !== null) {
        data.correct = trial.Correct === data.key_press - 48;
      }
      else {
        data.correct = false;
      }
      data.code = data.key_press - 48
    }
  }
}

export default interference
