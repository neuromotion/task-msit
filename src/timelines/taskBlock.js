import fixation from '../trials/fixation'
import interference from '../trials/interference'
import accuracy from '../trials/accuracy'
import trainingBlock from '../config/pcps_msit_eeg_train_sequence.json'
import mainBlock from '../config/pcps_msit_eeg_trial_sequence.json'
import { removeCursor } from '../lib/utils'

const taskBlock = (training) => {
	removeCursor('root')
	const block = training ? trainingBlock : mainBlock;
	const num_trials = training ? block.length : 96;
	let timeline = block.map( (trial) => {
		if (trial.Trial % 2 === 1) {
			return fixation(trial.Duration*1000)
		}
		else {
			if (trial.Trial % 96 === 0) {
				return { timeline: [interference(trial), accuracy(training, num_trials, trial.Trial)]}
			}
			else {
				return interference(trial)
			}
		}
	});
	return {
		type: 'html_keyboard_response',
	  stimulus: '',
		timeline: timeline,
		loop_function: (data) => {
			if (training && data.values()[data.values().length-1].percent_correct < 80) {
				return true
			} else {
				return false
			}
		}
	}
}

export default taskBlock
