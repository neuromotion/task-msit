import preamble from './preamble'
import experimentEnd from '../trials/experimentEnd'
import taskBlock from './taskBlock'

import { MTURK } from '../config/main'

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

export const tl = (MTURK) ? mturkTimeline : primaryTimeline
