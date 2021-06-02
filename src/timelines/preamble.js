import experimentStart from "../trials/experimentStart";
import startCode from "../trials/startCode";
import instructions from "../trials/instructions";
import holdUpMarker from "../trials/holdUpMarker";
import { AT_HOME, USE_EVENT_MARKER, VIDEO, VOLUME } from "../config/main";
import adjustVolume from "../trials/adjustVolume";
import camera from "../trials/camera";

console.log("at_home", AT_HOME);
console.log("env at home", process.env.REACT_APP_AT_HOME);

let tl = [experimentStart()];
if (VIDEO) {
  tl.push(instructions());
  tl.push(camera());
} else {
  if (VOLUME) tl.push(adjustVolume());
  if (USE_EVENT_MARKER) {
    tl.push(holdUpMarker());
    tl.push(startCode());
  }
  tl.push(instructions());
}

const preamble = {
  type: "html_keyboard_response",
  stimulus: "",
  timeline: tl,
};

export default preamble;
