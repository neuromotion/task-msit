import { lang, AT_HOME } from '../config/main'
import { baseStimulus } from '../lib/markup/stimuli'

const screenOne = () => {
  var stimulus = baseStimulus(`
    <div class='instructions'>
    <h1>${lang.instructions.welcome}</h1>
    <p>${lang.instructions.p1}</p>
    <p>${lang.instructions.p2}</p>
    </div>
    `, true)
  return {
    type: 'html_keyboard_response',
    stimulus: stimulus,
    prompt:  lang.prompt.continue.press,
    response_ends_trial: true,
  }
}

const screenTwo = () => {
  var stimulus = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.p3}</p>
    <p>${lang.instructions.p4}</p>
    </div>
    `, true)

  return {
    type: 'html_keyboard_response',
    stimulus: stimulus,
    prompt:  lang.prompt.continue.press,
    response_ends_trial: true
  }
}

const screenThree = () => {
  var stimulus = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.p5}</p>
    <p>${lang.instructions.t100}</p>
    <p>${lang.instructions.press_one}</p>
    </div>
    `, true)
  return {
    type: 'html_keyboard_response',
    stimulus: stimulus,
    prompt:  lang.prompt.continue.press,
    response_ends_trial: true
  }
}

const screenFour = () => {
  var stimulus = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.if_see}</p>
    <p>${lang.instructions.t020}</p>
    <p>${lang.instructions.press_two}</p>
    </div>
    `, true)
  return {
    type: 'html_keyboard_response',
    stimulus: stimulus,
    prompt:  lang.prompt.continue.press,
    response_ends_trial: true
  }
}

const screenFive = () => {
  var stimulus = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.if_see}</p>
    <p>${lang.instructions.t003}</p>
    <p>${lang.instructions.press_three}</p>
    </div>
    `, true)
  return {
    type: 'html_keyboard_response',
    stimulus: stimulus,
    prompt:  lang.prompt.continue.press,
    response_ends_trial: true
  }
}

const screenSix = () => {
  var stimulus = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.if_see}</p>
    <p>${lang.instructions.t212}</p>
    <p>${lang.instructions.press_one}</p>
    </div>
    `, true)
  return {
    type: 'html_keyboard_response',
    stimulus: stimulus,
    prompt:  lang.prompt.continue.press,
    response_ends_trial: true
  }
}

const screenSeven = () => {
  var stimulus = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.if_see}</p>
    <p>${lang.instructions.t112}</p>
    <p>${lang.instructions.press_two}</p>
    </div>
    `, true)
  return {
    type: 'html_keyboard_response',
    stimulus: stimulus,
    prompt:  lang.prompt.continue.press,
    response_ends_trial: true
  }
}

const screenEight = () => {
  var stimulus = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.if_see}</p>
    <p>${lang.instructions.t322}</p>
    <p>${lang.instructions.press_three}</p>
    </div>
    `, true)
  return {
    type: 'html_keyboard_response',
    stimulus: stimulus,
    prompt:  lang.prompt.continue.press,
    response_ends_trial: true
  }
}

const screenNine = () => {
  var stimulus = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.if_see}</p>
    <p>${lang.instructions.t221}</p>
    <p>${lang.instructions.press_one}</p>
    </div>
    `, true)
  return {
    type: 'html_keyboard_response',
    stimulus: stimulus,
    prompt:  lang.prompt.continue.press,
    response_ends_trial: true
  }
}

const screenTen = () => {
  var stimulus = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.if_see}</p>
    <p>${lang.instructions.t211}</p>
    <p>${lang.instructions.press_two}</p>
    </div>
    `, true)
  return {
    type: 'html_keyboard_response',
    stimulus: stimulus,
    prompt:  lang.prompt.continue.press,
    response_ends_trial: true
  }
}

const screenEleven = () => {
  var stimulus = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.if_see}</p>
    <p>${lang.instructions.t232}</p>
    <p>${lang.instructions.press_three}</p>
    </div>
    `, true)
  return {
    type: 'html_keyboard_response',
    stimulus: stimulus,
    prompt:  lang.prompt.continue.press,
    response_ends_trial: true
  }
}

const screenTwelve = () => {
  var stimulus = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.p6}</p>
    <p>${lang.instructions.p7}</p>
    <p>${lang.instructions.p8}</p>
    </div>
    `, true)

  return {
    type: 'html_keyboard_response',
    stimulus: stimulus,
    prompt:  lang.prompt.continue.press,
    response_ends_trial: true
  }
}

const screenThirteen = () => {
  var stimulus = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.p9}</p>
    <p>${lang.instructions.p10}</p>
    <p>${lang.instructions.p11}</p>
    </div>
    `, true)

  return {
    type: 'html_keyboard_response',
    stimulus: stimulus,
    prompt:  lang.prompt.continue.press,
    response_ends_trial: true
  }
}

const screenFourteen = () => {
  var stimulus = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.p12}</p>
    <p>${lang.instructions.p13}</p>
    <p>${lang.instructions.p14}</p>
    <p>${lang.instructions.p15}</p>
    </div>
    `, true)

  return {
    type: 'html_keyboard_response',
    stimulus: stimulus,
    prompt:  lang.prompt.continue.press,
    response_ends_trial: true
  }
}

const screenFifteen = () => {

  var stimulus = baseStimulus(`
    <div class='instructions'>
    <p>${lang.instructions.practice_trials}</p>
    </div>
    `, true)

  return {
    type: 'html_keyboard_response',
    stimulus: stimulus,
    prompt:  lang.prompt.continue.start_practice,
    response_ends_trial: true
  }
}

const instructions = () => {
  let tl = [
    screenOne(),
    screenTwo(),
    screenThree(),
    screenFour(),
    screenFive(),
    screenSix(),
    screenSeven(),
    screenEight(),
    screenNine(),
    screenTen(),
    screenEleven(),
    screenTwelve(),
    screenThirteen(),
    screenFourteen(),
    screenFifteen(),
  ]

  if (AT_HOME) tl.splice(13,1)

  return {
    type: 'html_keyboard_response',
    timeline: tl
  }
}

export default instructions
