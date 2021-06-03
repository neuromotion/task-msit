import experimentStart from "../trials/experimentStart";
import startCode from "../trials/startCode";
import instructions from "../trials/instructions";
import holdUpMarker from "../trials/holdUpMarker";
import { USE_EVENT_MARKER, VIDEO, VOLUME } from "../config/main";
import adjustVolume from "../trials/adjustVolume";
import camera from "../trials/camera";


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
