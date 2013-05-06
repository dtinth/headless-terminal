headless-terminal
=================
A headless terminal emulator forked from [tty.js](https://github.com/chjj/tty.js/).

The terminal emulator used in tty.js depends on the DOM, thus cannot be used directly in server.

This package solves the problem by implementing a minimal dummy DOM API before including terminal.js.
__This package clutters the global scope__ with few dummy APIs.

License is MIT.


Usage
-----

It works just like term.js. Just look at the example below.

You can access what's displayed on the screen by accessing the `displayBuffer` property. It is a [screen-buffer](https://github.com/dtinth/screen-buffer).

It also emits the __`change`__ event when the terminal is changed.


Example
-------

    var HeadlessTerminal = require('headless-terminal')
    var terminal = new HeadlessTerminal(80, 25)

    terminal.open()

    terminal.write('write some data and ansi code')
    console.log(terminal.displayBuffer.toString())

