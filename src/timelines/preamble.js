import experimentStart from "../trials/experimentStart";
import startCode from "../trials/startCode";
import instructions from "../trials/instructions";
import holdUpMarker from "../trials/holdUpMarker";
import { USE_EVENT_MARKER, VIDEO, VOLUME } from "../config/main";
import adjustVolume from "../trials/adjustVolume";
import camera from "../trials/camera";


let tl = [experimentStart()];
if (VOLUME) {
  tl.push(adjustVolume());
} 
if (USE_EVENT_MARKER) {
  tl.push(holdUpMarker());
  tl.push(startCode());
}
tl.push(instructions());
if (VIDEO) {
  tl.push(camera());
}

const preamble = {
  type: "html_keyboard_response",
  stimulus: "",
  timeline: tl,
};

export default preamble;
