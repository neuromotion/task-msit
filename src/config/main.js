// config/main.js
// This is the main configuration file where universal and default settings should be placed.
// These settins can then be imported anywhere in the app as they are exported at the botom of the file.

import { jsPsych } from 'jspsych-react'
import _ from 'lodash'
import { eventCodes } from './trigger'


require("dotenv").config();

// mapping of letters to key codes
const keys = {
	"A": 65,
	"B": 66,
	"C": 67,
	"F": 70,
	"J": 74,
	"space": 32
}

// audio codes
const audioCodes = {
	frequency: 100*(eventCodes.open_task - 9),
	type: 'sine'
}

// is this mechanical turk?
const MTURK = (!jsPsych.turk.turkInfo().outsideTurk)
const AT_HOME = (process.env.REACT_APP_AT_HOME === 'true')
const VIDEO =  (process.env.REACT_APP_VIDEO === 'true')
const ONLINE = (process.env.REACT_APP_ONLINE=== 'true')

// is this firebase?
const FIREBASE = (process.env.REACT_APP_FIREBASE === 'true')

let IS_ELECTRON = !ONLINE;

try {
	window.require("electron");
  } catch {
	IS_ELECTRON = false;
  }


// get language file
const lang = require('../language/en_us.json')
if (process.env.MTURK) { // if this is mturk, merge in the mturk specific language
  const mlang = require('../language/en_us.mturk.json')
	_.merge(lang, mlang)
}

const taskName = "MSIT"

export {
	keys,
	lang,
	eventCodes,
	MTURK,
	AT_HOME,
	IS_ELECTRON,
	VIDEO,
	FIREBASE,
	audioCodes,
	taskName

}
