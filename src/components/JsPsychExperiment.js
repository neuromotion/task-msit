import React from "react";
import { Experiment, jsPsych } from "jspsych-react";
import { tl } from "../timelines/main";
import { rt_categorize_html } from "../lib/rt-categorize-html";

function JsPsychExperiment({ dataUpdateFunction, dataFinishFunction }) {
  jsPsych.plugins["rt-categorize-html"] = rt_categorize_html();

  return (
    <div className="App">
      <Experiment
        settings={{
          timeline: tl,
          on_data_update: (data) => dataUpdateFunction(data),
          on_finish: (data) => dataFinishFunction(data),
        }}
      />
    </div>
  );
}
export default JsPsychExperiment;
