"use strict";
/* jslint node: true */
/* global CCAPP: true */

var $ = require('jquery');
var Keyboard = require('keyboardjs');
var oneColor = require('onecolor');

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
    saturation: 100, // range: 0 - 100
    lightness: 50, // range: 0 - 100
    alpha: 1, // range: 0 - 1

    incrementHue: function(){
      this.hue = this.hue + 1;
      if (this.hue > 360) {
        this.hue = 0;
      }
    },
    decrementHue: function(){
      this.hue = this.hue - 1;
      if (this.hue < 0) {
        this.hue = 360;
      }
    },

    incrementSaturation: function(){
      this.saturation = this.saturation + 1;
      if (this.saturation > 100) {
        this.saturation = 0;
      }
    },
    decrementSaturation: function(){
      this.saturation = this.saturation - 1;
      if (this.saturation < 0) {
        this.saturation = 100;
      }
    },

    incrementLightness: function(){
      this.lightness = this.lightness + 1;
      if (this.hue > 100) {
        this.hue = 0;
      }
    },
    decrementLightness: function(){
      this.lightness = this.lightness - 1;
      if (this.hue < 0) {
        this.hue = 100;
      }
    },

    // example: 'hsla(120, 75%, 75%, 1)'
    toHSLAString: function(){
      return "hsla(" + this.hue + ", " + this.saturation + "%, " + this.lightness + "%, " + this.alpha + ")";
    },

    toHexString: function(){
      return oneColor(this.toHSLAString()).hex();
    },

    log: function(){
      console.log( this.toHSLAString() );
      console.log( this.toHexString() );
    },

    update: function(){
      var hsla = this.toHSLAString();
      var hex = this.toHexString();
      $('.current .color').css('background-color', hex );
      $('.current .info .hsla').text( hsla );
      $('.current .info .hex').text( hex );
    }

  };

  CCAPP.color.update();
}

// key event listeners
function setKeyListeners() {
  Keyboard.on('a', function(e) {
    CCAPP.color.incrementHue();
    CCAPP.color.update();
  });

  Keyboard.on('s', function(e) {
    CCAPP.color.incrementSaturation();
    CCAPP.color.update();
  });

  Keyboard.on('d', function(e) {
    CCAPP.color.incrementLightness();
    CCAPP.color.update();
  });

  Keyboard.on('z', function(e) {
    CCAPP.color.decrementHue();
    CCAPP.color.update();
  });

  Keyboard.on('x', function(e) {
    CCAPP.color.decrementSaturation();
    CCAPP.color.update();
  });

  Keyboard.on('c', function(e) {
    CCAPP.color.decrementLightness();
    CCAPP.color.update();
  });

  Keyboard.on('space', function(e) {
    console.log('you pressed space');
  });
}
