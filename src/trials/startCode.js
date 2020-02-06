import { eventCodes, lang, xcorrAudio } from '../config/main'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'
import { baseStimulus } from '../lib/markup/stimuli'

const startCode = () => {
  let stimulus = baseStimulus(`<h1>${lang.prompt.setting_up}</h1>`, true) + photodiodeGhostBox()

   return {
    type: 'html_keyboard_response',
    stimulus: stimulus,
    trial_duration: 2000,
    on_load: () => {
      pdSpotEncode(eventCodes.open_task)
      let audio = new Audio(xcorrAudio);
      audio.play();
    }
  }
}

export default startCode
