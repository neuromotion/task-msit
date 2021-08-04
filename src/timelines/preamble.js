import experimentStart from "../trials/experimentStart";
import startCode from "../trials/startCode";
import instructions from "../trials/instructions";
import holdUpMarker from "../trials/holdUpMarker";
import { envConfig } from "../config/main";
import adjustVolume from "../trials/adjustVolume";
import camera from "../trials/camera";
import numBlocks from '../trials/blockNumber'

let tl = [experimentStart()];
if (envConfig.USE_VOLUME) {
  tl.push(adjustVolume());
}
if (envConfig.USE_PHOTODIODE) {
  tl.push(numBlocks())
}
if (envConfig.USE_EEG) {
  tl.push(holdUpMarker());
  tl.push(startCode());
}
tl.push(instructions());
if (envConfig.USE_CAMERA) {
  tl.push(camera());
}

const preamble = {
  type: "html_keyboard_response",
  stimulus: "",
  timeline: tl,
};

export default preamble;
