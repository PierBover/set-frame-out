const callbacks = [];

let currentFrame = 0;
let requestId;
let callbackIndex = 0;

function checkCallbacks () {
	currentFrame ++;

	for (var i = 0; i < callbacks.length; i++) {
		if (!callbacks[i]) continue;

		if (callbacks[i].targetFrame === currentFrame) {
			callbacks[i].callback();
			callbacks[i] = null;
		}
	}

	const allNull = callbacks.every((callback) => callback === null);

	// If no pending callbacks reset everything

	if (allNull) {
		callbacks.length = 0;
		currentFrame = 0;
	} else {
		requestId = window.requestAnimationFrame(checkCallbacks);
	}
}

export function setFrameout (callback, frames) {

	if (!callback) throw 'You must pass a callback';
	if (typeof callback !== 'function') throw 'Callback must be a function';
	if (!Number.isInteger(frames)) throw 'The number of frames must be an integer';
	if (frames <= 0) throw 'The number of frames must be 1 or bigger';

	// clear pending requests
	window.cancelAnimationFrame(requestId);

	// create a new callbackIndex
	callbackIndex ++;

	callbacks.push({
		targetFrame: currentFrame + frames,
		callback,
		index: callbackIndex
	});

	requestId = window.requestAnimationFrame(checkCallbacks);

	// return index for clearFrameout()
	return callbackIndex;
}

export function clearFrameout (index) {
	const arrayIndex = callbacks.findIndex((item) => item && item.index === index);
	if (arrayIndex >= 0) callbacks[arrayIndex] = null;
}