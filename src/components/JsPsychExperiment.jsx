import React, { useEffect, useState } from "react"
import { Experiment, jsPsych } from "jspsych-react";
import { tl } from "../timelines/main";
import { rt_categorize_html } from "../lib/rt-categorize-html";
import { getConfig } from "../config/experiment"

function JsPsychExperiment({ dataUpdateFunction, dataFinishFunction, participantID, studyID }) {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    getConfig(participantID, studyID).then((experimentConfig) => {
      const newTimeline = tl(experimentConfig)
      setTimeline(newTimeline)
    })
      .catch(error => console.error(error))
    // eslint-disable-next-line
  }, [])

  jsPsych.plugins["rt-categorize-html"] = rt_categorize_html();

  if (timeline.length === 0) {
    return (
      <div className="App height-100">
        <div className="centered-h-v">Loading task</div>
      </div>
    )
  } else {
    return (
      <div className="App">
        <Experiment
          settings={{
            timeline: timeline,
            on_data_update: (data) => dataUpdateFunction(data),
            on_finish: (data) => dataFinishFunction(data),
          }}
        />
      </div>
    );
  }
}
export default JsPsychExperiment;
