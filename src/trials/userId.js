import { lang, MTURK } from '../config/main'
import { getTurkUniqueId } from '../lib/utils'
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
}

export default userId
