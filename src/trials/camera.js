import { lang, taskName, AT_HOME } from '../config/main'
import { photodiodeGhostBox } from '../lib/markup/photodiode'
import { baseStimulus } from '../lib/markup/stimuli'
import { jsPsych } from 'jspsych-react'

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

function saveBlob(blob, media, patientId) {
  let reader = new FileReader()
  let fileName =`pid_${patientId}_${media}_${Date.now()}.webm`
  reader.onload = function() {
      if (reader.readyState === 2) {
          var buffer = new Buffer(reader.result)
          ipcRenderer.send('save_video', fileName, buffer)
          console.log(`Saving ${JSON.stringify({ fileName, size: blob.size })}`)
      }
  }
  reader.readAsArrayBuffer(blob)
}

const camera = () => {
  document.title = taskName
  let markup = `
  <div class="d-flex flex-column align-items-center">
  <p>${lang.instructions.camera}</p>
  <video id="camera" width="640" height="480" autoplay></video>
  </div>
  `
  let stimulus = baseStimulus(markup, true) +
                 photodiodeGhostBox()

  return {
    type: 'html_button_response',
    stimulus: stimulus,
    choices: [ lang.prompt.continue.button],
    response_ends_trial: true,
    on_load: () => {
      // Grab elements, create settings, etc.
      // Elements for taking the snapshot
      const patientId = jsPsych.data.get().values()[0].patient_id

      let camera = document.getElementById('camera');


      const handleEvents = function(stream, recorder) {
        console.log(stream)
        if (recorder === "cameraCapture") {
          camera.srcObject = stream;
        }
      
        
        const options = {mimeType: 'video/webm'};
        const recordedChunks = [];
        window[recorder] = new MediaRecorder(stream, options);
    
        window[recorder].addEventListener('dataavailable', function(e) {
          if (e.data.size > 0) {
            recordedChunks.push(e.data);
          }
        });
    
        window[recorder].addEventListener('stop', function() {
          const blob = new Blob(recordedChunks)
          saveBlob(blob, recorder, patientId)
        });
    
      };
    
      navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => handleEvents(stream, 'cameraCapture'));

      const { desktopCapturer } = window.require('electron')

      desktopCapturer.getSources({ types: ['window'] }).then(async sources => {
        for (const source of sources) {
          if (source.name === taskName) {
            navigator.mediaDevices.getUserMedia({
              video: {
                mandatory: {
                  chromeMediaSource: 'desktop',
                  chromeMediaSourceId: source.id
                }
              }
            }).then(stream => {
              handleEvents(stream, 'screenCapture')
            })
            .catch(error => console.log(error))
          } 
        }
      })
    
    },
    on_finish: () => {
      if (AT_HOME) {
        window.cameraCapture.start()
        window.screenCapture.start()
      }
    }
  }
}

export default camera
