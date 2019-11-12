import experimentStart from '../trials/experimentStart'
import startCode from '../trials/startCode'
import userId from '../trials/userId'
import instructions from '../trials/instructions'
import holdUpMarker from '../trials/holdUpMarker'
import { AT_HOME } from '../config/main'

console.log('at_home', AT_HOME)
console.log('env at home', process.env.REACT_APP_AT_HOME)
const preamble = {
  type: 'html_keyboard_response',
  stimulus: '',
  timeline: (AT_HOME) ?
    [experimentStart(), userId(), instructions()] :
    [experimentStart(), userId(), holdUpMarker(), startCode(), instructions()]
}

export default preamble
