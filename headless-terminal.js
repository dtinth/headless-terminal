
var inherits = require('util').inherits
var vt = require('vt.js')
var EventEmitter = require('events').EventEmitter
var ScreenBuffer = require('screen-buffer')

/**
 * A headless terminal is a terminal with an internal screen buffer.
 * Don't forget to open() the terminal!
 * 
 * When the display is changed, the `change` event is emitted
 * with the display buffer as an argument.
 */
function HeadlessTerminal(cols, rows, refresher) {
  this.pty = new EventEmitter()
  this.pty.write = function() { }
  this.displayBuffer = new ScreenBuffer()
  this.vt = vt.term({ pty: this.pty, cols: cols, rows: rows })
  this.vt.on('refresh', function() { this.refresh.apply(this, arguments) }.bind(this))
}

inherits(HeadlessTerminal, EventEmitter)

// expose
HeadlessTerminal.ScreenBuffer = ScreenBuffer
HeadlessTerminal.prototype.open = function() {
  // only here for compatibility
}

HeadlessTerminal.prototype.write = function(data) {
  this.pty.emit('data', data)
}

HeadlessTerminal.prototype.refresh = function(dirty, slice, cursor) {

  var start = dirty[0], end = dirty[1]

  // update the display buffer
  for (var i = 0; i < slice.length; i ++) {
    this.displayBuffer.update(start + i, slice[i])
  }
  this.displayBuffer.cursorX = cursor.x
  this.displayBuffer.cursorY = cursor.y

  // emit the change event
  this.emit('change', this.displayBuffer, start, end)

}

module.exports = HeadlessTerminal

