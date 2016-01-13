# semafor [![Build Status](https://travis-ci.org/Urucas/semafor.svg)](https://travis-ci.org/Urucas/semafor)
A simple success, fail logger

#Usage 
```bash
npm install --save semafor
```

**API**
```javascript
import semafor from 'semafor'
let log = semafor();
log.fail("This is an error");
log.warn("This is a warning");
log.ok("This is success");
log.log("This is sparta");
```

<img src="https://raw.githubusercontent.com/Urucas/semafor/master/screen.png" />
