// import trials
import fixation from '../trials/fixation'
import showCondition from '../trials/showCondition'
import taskEnd from '../trials/taskEnd'
import { baseStimulus } from '../lib/markup/stimuli'
import { pdSpotEncode, photodiodeGhostBox } from '../lib/markup/photodiode'
import { eventCodes } from '../config/main'

const taskTrial = (trial) => {
  // initialize trial details
  const code = eventCodes.non_fixation;
  var stimulus = baseStimulus(`
    <div class='instructions'>
    <h1>${trial.Stimulus}</h1>
    </div>
    `, true) + photodiodeGhostBox()
  const msit_Trial = {
    type: 'html_keyboard_response',
    trial_duration: 1250,
    on_load: () => pdSpotEncode(code),
    stimulus: stimulus,
    response_ends_trial: true,
    on_finish: (data) => {
      //pdSpotEncode(code)
      //data.code = code
      console.log(data)
    }
  }
  // timeline
  let timeline = [
    // show condition
    fixation(2000),
    msit_Trial
    //taskEnd(trialDetails, 500)
  ]

    return {
      type: 'html_keyboard_response',
      stimulus: '',
  		timeline: timeline
  	}
}

export default taskTrial
