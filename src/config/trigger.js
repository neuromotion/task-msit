// Event trigger settings - used in both the react app (renderer) and the electron app (main)
const manufacturer = 'Teensyduino'
const vendorId = '16c0'
const productId = '0487'

const eventCodes = {
	left: 1,
	middle: 2,
	right: 3,
	fixation: 5,
	non_fixation: 6,
	open_task: 11
}

// this is module.exports isntead of just exports as it is also imported into the electron app
module.exports = {
	manufacturer,
	vendorId,
	productId,
	eventCodes
}
