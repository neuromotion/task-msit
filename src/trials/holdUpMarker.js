import { lang } from '../config/main'
import { photodiodeGhostBox } from '../lib/markup/photodiode'
import { baseStimulus } from '../lib/markup/stimuli'

const holdUpMarker = () => {
  let stimulus = baseStimulus(`<div>
    <h2 id='usb-alert'></h2>
    <br><h5>${lang.prompt.focus}</h5>
  </div>`, true) + photodiodeGhostBox()

   return {
    type: 'html_button_response',
    stimulus: stimulus,
    choices: [lang.prompt.continue.button]
  }
}

export default holdUpMarker
