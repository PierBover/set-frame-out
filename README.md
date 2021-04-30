# setFrameout()

Like `setTimeout()` but with frames instead of milliseconds.

```
npm i set-frame-out
```

```
import {clearFrameout, setFrameout} from 'set-frame-out';

const id = setFrameout(() => {
	console.log('5 frames have passed!');
}, 5);

clearFrameout(id);
```