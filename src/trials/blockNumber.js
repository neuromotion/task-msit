import { lang } from '../config/main'
import { getBlockNumber } from '../lib/utils'
import { baseStimulus } from '../lib/markup/stimuli'

const numBlocks = () => {
    return {
      type: 'survey_text',
      questions: [{ prompt: baseStimulus(`<h1>${lang.block_number.set}</h1>`, true), value: 8}],
      on_finish: (data) => {
        getBlockNumber(data)
      }
    }
}

export default numBlocks