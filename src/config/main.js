// config/main.js
// This is the main configuration file where universal and default settings should be placed.
// These settins can then be imported anywhere in the app as they are exported at the botom of the file.

import { jsPsych } from 'jspsych-react'
import _ from 'lodash'
import { eventCodes } from './trigger'
import requireContext from 'require-context.macro'
import * as d3 from 'd3'

// mapping of letters to key codes
const keys = {
	"A": 65,
	"B": 66,
	"C": 67,
	"F": 70,
	"J": 74,
	"space": 32
}

// is this mechanical turk?
const MTURK = (!jsPsych.turk.turkInfo().outsideTurk)
const AT_HOME = (process.env.REACT_APP_AT_HOME === 'true')

// get language file
const lang = require('../language/en_us.json')
if (process.env.MTURK) { // if this is mturk, merge in the mturk specific language
  const mlang = require('../language/en_us.mturk.json')
	_.merge(lang, mlang)
}

const trainingBlockSequence = d3.csv("csv/pc+s_msit_eeg_training_trials.csv").then(function(data) {
	const interference_trials = data.filter(function (trial) {
		return trial.Condition !== 0;
	});
	const interference_stimuli = interference_trials.map(function (trial) {
		return {
			Stimulus: trial.Stimuli,
			Correct: trial.Correct
		}
	});
  return interference_stimuli
});

const mainBlockSequence = d3.csv("csv/pc+s_msit_eeg_trial_sequence1.csv").then(function(data) {
	const interference_trials = data.filter(function (trial) {
		return trial.Condition !== 0;
	});
	const interference_stimuli = interference_trials.map(function (trial) {
		return {
			Stimulus: trial.Stimuli,
			Correct: trial.Correct
		}
	});
  return interference_stimuli
});

export {
	keys,
	trainingBlockSequence,
	mainBlockSequence,
	lang,
	eventCodes,
	MTURK,
	AT_HOME
}
