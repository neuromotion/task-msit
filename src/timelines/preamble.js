import experimentStart from '../trials/experimentStart'
import startCode from '../trials/startCode'
import userId from '../trials/userId'
import numBlocks from '../trials/blockNumber'
import instructions from '../trials/instructions'
import holdUpMarker from '../trials/holdUpMarker'
import { AT_HOME, VIDEO, MTURK } from '../config/main'
import adjustVolume from '../trials/adjustVolume'
import camera from '../trials/camera'

console.log('at_home', AT_HOME)
console.log('env at home', process.env.REACT_APP_AT_HOME)

let tl
if (AT_HOME && !VIDEO) {
  tl = [experimentStart(), userId(), instructions()]
}
else if (AT_HOME && VIDEO) {
  tl = [experimentStart(), userId(), instructions(), camera()]
}
else if (!MTURK) {
  tl = [experimentStart(), userId(), numBlocks(), adjustVolume(), holdUpMarker(), startCode(), instructions()]
}
else {
  tl = [experimentStart(), userId(), adjustVolume(), holdUpMarker(), startCode(), instructions()]
}
const preamble = {
  type: 'html_keyboard_response',
  stimulus: '',
  timeline: tl
}

export default preamble
