headless-terminal
=================

A VT100 terminal emulator based on [`vt.js`](https://github.com/spolu/vt.js).

Usage
-----

First, we create a terminal emulator:

```javascript
var HeadlessTerminal = require('headless-terminal')
var terminal = new HeadlessTerminal(80, 25)
```

Then we can write stuff onto it, using the `write()` method:

```javascript
terminal.write('write some data and ansi code')
```

We can access the [screen-buffer](https://github.com/dtinth/screen-buffer) using:

```javascript
terminal.displayBuffer.toString()
```


History
-------

Um, why not just use `vt.js`?

Actually,
this project was originally a fork of `term.js` from `tty.js`.
However,
the `term.js` code is heavily attached to the DOM.
headless-terminal was a headless variant of it,
by mocking the DOM and adapt it to a [screen-buffer](https://github.com/dtinth/screen-buffer).

Still,
the code is complex and I don't want to keep updating this when upstream `term.js` changes;
so I planned on depending on a better terminal emulation module.

Then I found [`vt.js`](https://github.com/spolu/vt.js/)
which works very well for me, and the module is simple enough.
So I updated this library to use `vt.js`.



License
-------

MIT



