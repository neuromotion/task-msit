import preamble from './preamble'
import experimentEnd from '../trials/experimentEnd'
import taskBlock from './taskBlock'

import { config } from '../config/main'

const primaryTimeline = [
        preamble,
        taskBlock(true),
        taskBlock(false),
        experimentEnd(3000)
        ]

const mturkTimeline = [
        preamble,
        experimentEnd(3000)
        ]

export const tl = (config.USE_MTURK) ? mturkTimeline : primaryTimeline
