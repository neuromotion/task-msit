import fixation from '../trials/fixation'
import interference from '../trials/interference'
import accuracy from '../trials/accuracy'
import trainingBlock from '../config/pcps_msit_eeg_train_sequence.json'
import mainBlock from '../config/pcps_msit_eeg_trial_sequence.json'

const taskBlock = (training, experimentConfig) => {
	const block = training ? trainingBlock : mainBlock;
	const num_trials = training ? block.length : 96;
	let timeline = block.flatMap( (trial) => {
		if (trial.Trial % 2 === 1) {
			return fixation(trial)
		}
		else {
			if (trial.Trial % 96 === 0) {
				return [interference(trial, experimentConfig), accuracy(training, num_trials, trial.Trial, experimentConfig)]
			}
			else {
				return interference(trial, experimentConfig)
			}
		}
	});
	return {
		type: 'html_keyboard_response',
	  stimulus: '',
		timeline: timeline,
		loop_function: (data) => {
			return training && data.values()[data.values().length - 1].percent_correct < experimentConfig.accuracy_cutoff;
		}
	}
}

export default taskBlock
