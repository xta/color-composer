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
    hue: 240, // range: 0 - 360. 0 & 360 are the same (red)
    saturation: 100, // range: 0 - 100
    lightness: 50, // range: 0 - 100
    alpha: 1, // range: 0 - 1

    incrementHue: function(change){
      this.hue = this.hue + change;
      if (this.hue >= 360) {
        this.hue = this.hue - 360;
      }
    },
    decrementHue: function(change){
      this.hue = this.hue - change;
      if (this.hue < 0) {
        this.hue = this.hue + 360;
      }
    },

    incrementSaturation: function(change){
      this.saturation = this.saturation + change;
      if (this.saturation > 100) {
        this.saturation = 100;
      }
    },
    decrementSaturation: function(change){
      this.saturation = this.saturation - change;
      if (this.saturation < 0) {
        this.saturation = 0;
      }
    },

    incrementLightness: function(change){
      this.lightness = this.lightness + change;
      if (this.lightness > 100) {
        this.lightness = 100;
      }
    },
    decrementLightness: function(change){
      this.lightness = this.lightness - change;
      if (this.lightness < 0) {
        this.lightness = 0;
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

  var bigChange = 10,
    smallChange = 1;

  // Hue

    Keyboard.on('q', function(e) {
      CCAPP.color.decrementHue(bigChange);
      CCAPP.color.update();
    });

    Keyboard.on('w', function(e) {
      CCAPP.color.decrementHue(smallChange);
      CCAPP.color.update();
    });

    Keyboard.on('e', function(e) {
      CCAPP.color.incrementHue(smallChange);
      CCAPP.color.update();
    });

    Keyboard.on('r', function(e) {
      CCAPP.color.incrementHue(bigChange);
      CCAPP.color.update();
    });

  // Saturation

    Keyboard.on('a', function(e) {
      CCAPP.color.decrementSaturation(bigChange);
      CCAPP.color.update();
    });

    Keyboard.on('s', function(e) {
      CCAPP.color.decrementSaturation(smallChange);
      CCAPP.color.update();
    });

    Keyboard.on('d', function(e) {
      CCAPP.color.incrementSaturation(smallChange);
      CCAPP.color.update();
    });

    Keyboard.on('f', function(e) {
      CCAPP.color.incrementSaturation(bigChange);
      CCAPP.color.update();
    });

  // Lightness

    Keyboard.on('z', function(e) {
      CCAPP.color.decrementLightness(bigChange);
      CCAPP.color.update();
    });

    Keyboard.on('x', function(e) {
      CCAPP.color.decrementLightness(smallChange);
      CCAPP.color.update();
    });

    Keyboard.on('c', function(e) {
      CCAPP.color.incrementLightness(smallChange);
      CCAPP.color.update();
    });

    Keyboard.on('v', function(e) {
      CCAPP.color.incrementLightness(bigChange);
      CCAPP.color.update();
    });
}
