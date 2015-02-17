"use strict";
/* jslint node: true */
/* global CCAPP: true */

var $ = require('jquery');
var Keyboard = require('keyboardjs');
var onecolor = require('onecolor');
var colorjoe = require('colorjoe');

global.window = global;
var CCAPP = global.CCAPP || {}; // ColorComposer App

$(function() {
  initColor();
  setKeyListeners();
  setColorPicker();
  CCAPP.color.update();
});

// current color HSL
function initColor() {

  CCAPP.color = {
    hue: 208, // range: 0 - 360. 0 & 360 are the same
    saturation: 100, // range: 0 - 100
    lightness: 43, // range: 0 - 100
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
      return onecolor(this.toHSLAString()).hex();
    },

    toRGBString: function(){
      return onecolor(this.toHSLAString()).css();
    },

    log: function(){
      console.log( this.toHSLAString() );
      console.log( this.toHexString() );
    },

    update: function(){
      var hex = this.toHexString();
      $('.current .color').css('background-color', hex );
      $('.current .info .hex').text( hex );
      $('.current .info .rgb').text( this.toRGBString() );

      $('.current .status .h .value').text( this.hue );
      $('.current .status .s .value').text( this.saturation );
      $('.current .status .l .value').text( this.lightness );

      CCAPP.picker.set( hex );
    }

  };
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

function setColorPicker() {
  var joe = colorjoe.rgb('picker');
  CCAPP.picker = CCAPP.picker || joe;

  CCAPP.picker.on('change', function(c) {
    // TODO: implement update of pagewide states when picker is changed
  });
}
