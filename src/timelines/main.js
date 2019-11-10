import buildCountdown from '../trials/countdown'
import preamble from './preamble'
import experimentEnd from '../trials/experimentEnd'
import taskBlock from './taskBlock'
import userId from '../trials/userId'
import { trainingBlockSequence, mainBlockSequence } from '../config/main'

import { MTURK, lang } from '../config/main'

import startCode from '../trials/startCode'

const primaryTimeline = [
        preamble,
        taskBlock(trainingBlockSequence, mainBlockSequence),
        experimentEnd(5000)
        ]

const mturkTimeline = [
        preamble,
        experimentEnd(3000)
        ]

export const tl = (MTURK) ? mturkTimeline : primaryTimeline
