# setFrameout()

Like `setTimeout()` but with frames instead of milliseconds.

This uses `window.requestAnimationFrame()` so it only works in the browser.

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