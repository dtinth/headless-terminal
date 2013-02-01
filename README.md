
A headless terminal emulator forked from tty.js. For use in ttycast 0.1.x.

License is MIT.

Usage:

    var HeadlessTerminal = require('headless-terminal')
    var terminal = new HeadlessTerminal(80, 25)

    terminal.open()

    terminal.write('write some data and ansi code')
    console.log(terminal.displayBuffer.toString())


