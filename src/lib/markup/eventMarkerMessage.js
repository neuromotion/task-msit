import { config, lang } from '../../config/main'

const eventMarkerMessage = async () => {
	if (!config.USE_MTURK) {
		return `<span style="color: green;">${lang.eventMarker.found}</span>`
	}
	else {
		return `<span style="color: red;">${lang.eventMarker.not_found}</span>`
	}
}

export default eventMarkerMessage
