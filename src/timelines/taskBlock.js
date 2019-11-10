import taskTrial from './taskTrial'

const taskBlock = (trainingBlockSequence, mainBlockSequence) => {
	let training_timeline = trainingBlockSequence.then(function(data) {
		return data.map( (trial) => taskTrial(trial))
	});
	let main_timeline = mainBlockSequence.then(function(data) {
		return data.map( (trial) => taskTrial(trial))
	});
	return {
		type: 'html_keyboard_response',
	  stimulus: '',
		on_load: () => console.log(training_timeline),
		timeline: training_timeline
	}
}

export default taskBlock
