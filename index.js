const callbacks = [];
let currentFrame = 0;

function checkCallbacks () {
	currentFrame ++;

	let allNull = true;

	for (var i = 0; i < callbacks.length; i++) {
		if (!callbacks[i]) continue;

		if (callbacks[i].targetFrame === currentFrame) {
			callbacks[i].callback();
			callbacks[i] = null;
		} else {
			allNull = false;
		}
	}

	// If no pending callbacks reset everything
	if (allNull) {
		callbacks.splice(0, callbacks.length);
		currentFrame = 0;
	} else {
		window.requestAnimationFrame(checkCallbacks);
	}
}

export function setFrameout (callback, frames) {
	console.log(callbacks);

	callbacks.push({
		targetFrame: currentFrame + frames,
		callback
	});

	// Only do this on the first added callback
	if (currentFrame === 0) window.requestAnimationFrame(checkCallbacks);

	// return index for clearFrameout()
	return callbacks.length - 1;
}

export function clearFrameout (index) {
	if (callbacks[index]) callbacks[index] = null;
}