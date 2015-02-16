"use strict";
/* jslint node: true */
/* global CCAPP: true */

var $ = require('jquery');
var Keyboard = require('keyboardjs');

global.window = global;
var CCAPP = global.CCAPP || {}; // ColorComposer App

$(function() {
  initColor();
  setKeyListeners();
});

// current color HSL
function initColor() {

  CCAPP.color = {
    hue: 0, // range: 0 - 360
    saturation: 0, // range: 0 - 100
    lightness: 0, // range: 0 - 100

    incrementHue: function(){
      this.hue = this.hue + 1;
    },
    decrementHue: function(){
      this.hue = this.hue - 1;
    },

    incrementSaturation: function(){
      this.saturation = this.saturation + 1;
    },
    decrementSaturation: function(){
      this.saturation = this.saturation - 1;
    },

    incrementLightness: function(){
      this.lightness = this.lightness + 1;
    },
    decrementLightness: function(){
      this.lightness = this.lightness - 1;
    },

    log: function(){
      // TODO: set bg-color of .current .color
      $('.current .info').text("H: " + this.hue + ", S: " + this.saturation + ", L: " + this.lightness );
      console.log("H: " + this.hue + ", S: " + this.saturation + ", L: " + this.lightness );
    }

  };

  CCAPP.color.log();
}

// key event listeners
function setKeyListeners() {
  Keyboard.on('a', function(e) {
    CCAPP.color.incrementHue();
    CCAPP.color.log();
  });

  Keyboard.on('s', function(e) {
    CCAPP.color.incrementSaturation();
    CCAPP.color.log();
  });

  Keyboard.on('d', function(e) {
    CCAPP.color.incrementLightness();
    CCAPP.color.log();
  });

  Keyboard.on('z', function(e) {
    CCAPP.color.decrementHue();
    CCAPP.color.log();
  });

  Keyboard.on('x', function(e) {
    CCAPP.color.decrementSaturation();
    CCAPP.color.log();
  });

  Keyboard.on('c', function(e) {
    CCAPP.color.decrementLightness();
    CCAPP.color.log();
  });

  Keyboard.on('space', function(e) {
    console.log('you pressed space');
  });
}
