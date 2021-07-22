import { lang, envConfig } from '../config/main'
import { photodiodeGhostBox } from '../lib/markup/photodiode'
import { baseStimulus } from '../lib/markup/stimuli'

const experimentEnd = (duration) => {
  let stimulus = baseStimulus(`<h1>${lang.task.end}</h1>`, true) + photodiodeGhostBox()

   return {
    type: 'html_keyboard_response',
    stimulus: stimulus,
    trial_duration: duration,
    on_load: () => {
      if (envConfig.USE_CAMERA) {
        console.log('finished')
        window.cameraCapture.stop()
        window.screenCapture.stop()
      }
    }
  }
}

export default experimentEnd
