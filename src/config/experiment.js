import { envConfig } from './main';
import {firestoreConfig} from "../firebase"
import localConfig from "./config.json"
import path from "path"

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
      const newConfig = JSON.parse(fs.readFileSync(overrideConfig), "utf8")
      experimentConfig = {...experimentConfig, ...newConfig}
    } catch (error) {
      console.warn("Using default config")
    }
    renderer.send("save-config", experimentConfig, participantID, studyID)
  }  else if (envConfig.USE_FIREBASE) {
    const newConfig = await firestoreConfig(studyID, participantID);
    if (newConfig) {
      experimentConfig = newConfig;
    } else {
      console.warn("No default config found in Firestore. Resorting to local config.")
    }
  }
  else {
    console.warn("Using default config")
  }
  return experimentConfig
}

export { getConfig }
