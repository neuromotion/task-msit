import fixation from '../trials/fixation'
import interference from '../trials/interference'
import accuracy from '../trials/accuracy'
import { jsPsych } from 'jspsych-react'

const endBlock = (training,num_trials,trial) => {
	return {
		type: 'html_keyboard_response',
    timeline: [interference(trial), accuracy(training, num_trials, trial.Trial)],
	  stimulus: '',
    on_finish: (data) => {
      console.log(num_trials)
      const j_data = jsPsych.data.get().last(1).values()[0]
      console.log(j_data)
      console.log(j_data.num_blocks*96)
      if (num_trials>=j_data.num_blocks*96) {
        console.log("end")
        jsPsych.endCurrentTimeline()
      }
    }
	}
}

export default endBlock
