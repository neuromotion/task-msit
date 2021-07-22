import preamble from "./preamble"
import experimentEnd from "../trials/experimentEnd"
import taskBlock from "./taskBlock"
import { envConfig } from "../config/main"

const tl = (experimentConfig) => {
  const timeline = [preamble]
  if (!envConfig.USE_MTURK) {
    timeline.push(taskBlock(true, experimentConfig), taskBlock(false, experimentConfig))
  }
  timeline.push(experimentEnd(3000))
  return timeline
}

export { tl }
