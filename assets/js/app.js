"use strict";
/*jslint node: true */

var $ = require('jquery');
var Keyboard = require('keyboardjs');

$(function() {

  Keyboard.on('a', function(e) {
    console.log('you pressed a');
  });

  Keyboard.on('s', function(e) {
    console.log('you pressed s');
  });

  Keyboard.on('d', function(e) {
    console.log('you pressed d');
  });

  Keyboard.on('z', function(e) {
    console.log('you pressed z');
  });

  Keyboard.on('x', function(e) {
    console.log('you pressed x');
  });

  Keyboard.on('c', function(e) {
    console.log('you pressed c');
  });

  Keyboard.on('space', function(e) {
    console.log('you pressed space');
  });

});
