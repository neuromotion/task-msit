import { envConfig } from './main';
import localConfig from "./config.json"
import path from "path"

const localConfigKeys = Object.keys(localConfig)

const checkConfig = (customConfig) => {
  for (let i = 0; i < localConfigKeys.length; i++) {
    const setting = localConfigKeys[i]
    if (!(setting in customConfig)) {
      return false
    }
  }
  return true
}

const getConfig = async (participantID, studyID) => {
  let experimentConfig = localConfig
  console.log("participant id:", participantID)
  if (envConfig.USE_ELECTRON ) {
    const app = window.require("electron").remote.app
    const renderer = window.require("electron").ipcRenderer;
    const fs = window.require("fs")
    try {
      const overrideConfig = path.join(
        app.getPath("desktop"),
        "msit-settings",
        `${participantID}-config.json`
      );
      console.log("Override config", overrideConfig)
      experimentConfig = JSON.parse(fs.readFileSync(overrideConfig), "utf8");
      if (!checkConfig(experimentConfig)) {
        throw new Error()
      }
    } catch (error) {
      console.warn("Using default config")
    }
    renderer.send("save-config", experimentConfig, participantID, studyID)
  } else {
    console.warn("Using default config")
  }
  return experimentConfig
}

export { getConfig }
