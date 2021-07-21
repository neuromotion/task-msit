import { lang, envConfig } from '../config/main'
import { baseStimulus } from '../lib/markup/stimuli'

const screenOne = baseStimulus(`
    <div class='instructions'>
    <h1>${lang.instructions.welcome}</h1>
    <p>${lang.instructions.p1}</p>
    <p>${lang.instructions.p2}</p>
    </div>
    `, true)

const screenTwo = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.p3}</p>
    <p>${lang.instructions.p4}</p>
    </div>
    `, true)

const screenThree = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.p5}</p>
    <p>${lang.instructions.t100}</p>
    <p>${lang.instructions.press_one}</p>
    </div>
    `, true)

const screenFour = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.if_see}</p>
    <p>${lang.instructions.t020}</p>
    <p>${lang.instructions.press_two}</p>
    </div>
    `, true)

const screenFive = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.if_see}</p>
    <p>${lang.instructions.t003}</p>
    <p>${lang.instructions.press_three}</p>
    </div>
    `, true)

const screenSix = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.if_see}</p>
    <p>${lang.instructions.t212}</p>
    <p>${lang.instructions.press_one}</p>
    </div>
    `, true)

const screenSeven = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.if_see}</p>
    <p>${lang.instructions.t112}</p>
    <p>${lang.instructions.press_two}</p>
    </div>
    `, true)

const screenEight = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.if_see}</p>
    <p>${lang.instructions.t322}</p>
    <p>${lang.instructions.press_three}</p>
    </div>
    `, true)

const screenNine =  baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.if_see}</p>
    <p>${lang.instructions.t221}</p>
    <p>${lang.instructions.press_one}</p>
    </div>
    `, true)

const screenTen =  baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.if_see}</p>
    <p>${lang.instructions.t211}</p>
    <p>${lang.instructions.press_two}</p>
    </div>
    `, true)

const screenEleven = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.if_see}</p>
    <p>${lang.instructions.t232}</p>
    <p>${lang.instructions.press_three}</p>
    </div>
    `, true)

const screenTwelve = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.p6}</p>
    <p>${lang.instructions.p7}</p>
    <p>${lang.instructions.p8}</p>
    </div>
    `, true)

const screenThirteen = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.p9}</p>
    <p>${lang.instructions.p10}</p>
    <p>${lang.instructions.p11}</p>
    </div>
    `, true)

const screenFourteen = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.p12}</p>
    <p>${lang.instructions.p13}</p>
    <p>${lang.instructions.p14}</p>
    <p>${lang.instructions.p15}</p>
    </div>
    `, true)

const screenFifteen = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.practice_trials}</p>
    </div>
    `, true)

const instructions = () => {
  let tl = [
    screenOne,
    screenTwo,
    screenThree,
    screenFour,
    screenFive,
    screenSix,
    screenSeven,
    screenEight,
    screenNine,
    screenTen,
    screenEleven,
    screenTwelve,
    screenThirteen,
    screenFourteen,
    screenFifteen,
  ]

  if (envConfig.USE_ELECTRON && !envConfig.USE_EEG) tl.splice(13,1)

  return {
    type: 'instructions',
    pages: tl,
    show_clickable_nav: true

  }
}

export default instructions
