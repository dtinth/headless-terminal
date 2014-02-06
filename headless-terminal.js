
var vt = require('vt')
  , ScreenBuffer = require('screen-buffer')
  , EventEmitter = require('events').EventEmitter
  , inherits = require('util').inherits

// ## HeadlessTerminal(cols, rows)
//
// A headless terminal is a terminal with an internal screen buffer.
// Don't forget to open() the terminal!
// 
// When the display is changed, the `change` event is emitted
// with the display buffer as an argument.
//
function HeadlessTerminal(cols, rows) {
  EventEmitter.call(this)
  this.termBuffer = new vt.TermBuffer(cols, rows)
  this.termBuffer.setMode('crlf', true)
  this.termWriter = new vt.TermWriter(this.termBuffer)
  this.displayBuffer = new ScreenBuffer()
}

inherits(HeadlessTerminal, EventEmitter)

HeadlessTerminal.prototype.open = function() {
  /* nuffink, leaving it here for */
}

HeadlessTerminal.prototype.write = function(whatever) {
  this.termWriter.write(whatever)
  var screen = this.displayBuffer
    , buffer = this.termBuffer
    , height = buffer.height
  screen.setRows(height)
  for (var i = 0; i < height; i ++) {
    var line = buffer.getLine(i)
    screen.update(i, this._convertLine(line))
  }
  screen.cursorX = buffer.cursor.x
  screen.cursorY = buffer.cursor.y
  this.emit('change', this.displayBuffer, 0, height - 1)
}

HeadlessTerminal.prototype._convertLine = function(line) {
  var chars = [ ]
    , str = line.str
    , attr = line.attr
    , length = str.length
  chars.length = length
  for (var i = 0; i < length; i ++) {
    chars[i] = [this._convertAttribute(attr[i]), str.charAt(i)]
  }
  return chars
}

HeadlessTerminal.prototype._convertAttribute = function(attr) {
  var fg = attr.fg == null ? 257 : attr.fg
    , bg = attr.bg == null ? 256 : attr.bg
    , inverse = attr.inverse ? 1 : 0
    , underline = attr.underline ? 1 : 0
    , bold = attr.bold ? 1 : 0
  return (inverse << 20) | (underline << 19) | (bold << 18) | (fg << 9) | bg
}

// expose
HeadlessTerminal.ScreenBuffer = ScreenBuffer
HeadlessTerminal.patcher = require('./buffer-patcher')

module.exports = HeadlessTerminal

