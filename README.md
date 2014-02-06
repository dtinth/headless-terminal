# new HeadlessTerminal(cols, rows)

A headless terminal is a terminal with an internal screen buffer.
Don't forget to open() the terminal!

When the display is changed, the `change` event is emitted
with the display buffer as an argument.

## Usage

```javascript
var HeadlessTerminal = require('headless-terminal')
var terminal = new HeadlessTerminal(80, 25)
terminal.write('write some data and ansi code')
console.log(terminal.displayBuffer.toString())
```

## API

HeadlessTerminal inherits EventEmitter.

### write(whatever)

Writes some thing to the terminal.
After that, a change event will be emitted.

## Static Members

### HeadlessTerminal.ScreenBuffer

The ScreenBuffer class.

## License

MIT

