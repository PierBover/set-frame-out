const callbacks = [];
let currentFrame = 0;

function checkCallbacks () {
	currentFrame ++;

	let allNull = true;

	for (var i = 0; i < callbacks.length; i++) {
		if (callbacks[i] === null) continue;

		if (callbacks[i].targetFrame === currentFrame) {
			callbacks[i]();
			callbacks[i] = null;
		} else {
			allNull = false;
		}
	}

	// If no pending callbacks reset everything
	if (allNull) reset();
	else window.requestAnimationFrame(checkCallbacks);
}

function reset () {
	callbacks = [];
	currentFrame = 0;
}

export function setFrameout (callback, frames) {
	const length = callbacks.push({
		targetFrame: currentFrame + frames,
		callback
	});

	// Only do this on the first added callback
	if (length === 1) window.requestAnimationFrame(checkCallbacks);

	// return index for clearFrameout()
	return length - 1;
}

export function clearFrameout (index) {
	callbacks[index] = null;
}