"use strict";
/* jslint node: true */
/* global CCAPP: true */

var $ = require('jquery');
var Keyboard = require('keyboardjs');
var onecolor = require('onecolor');
var colorjoe = require('colorjoe');
var CCAPP = CCAPP || {}; // ColorComposer App

$(function() {
  initColor();
  setKeyListeners();
  setTouchListeners();
  setInputListeners();
  setColorPicker();
  CCAPP.color.update();
});

// current color HSL
function initColor() {

  CCAPP.color = {
    // NOTE: when HSL default is adjusted, update $current-bg-color sass
    hue: 208, // range: 0 - 360. 0 & 360 are the same
    saturation: 90, // range: 0 - 100
    lightness: 43, // range: 0 - 100
    alpha: 1, // range: 0 - 1

    do_not_update_picker: false,
    do_not_update_hex: false,
    do_not_update_rgb: false,

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
      if(!this.do_not_update_picker){
        CCAPP.picker.set( this.toHexString() );
      }
      if(!this.do_not_update_hex){
        $('.current .info .hex').val( this.toHexString() );
      }
      if(!this.do_not_update_rgb){
        $('.current .info .rgb').val( this.toRGBString() );
      }
      $('.current').css('background-color', this.toHexString() );
      $('.current .state.h .value').text( this.hue );
      $('.current .state.s .value').text( this.saturation );
      $('.current .state.l .value').text( this.lightness );

      this._update_text_colors();
      this._update_keys_at_limit();
    },

    _update_text_colors: function(){
      var too_dark      = 30,
          too_bright    = 80,
          $info_text    = $('.current .info'),
          $status_text  = $('.current .state');

      if (this.lightness < too_dark) {
        $info_text.removeClass('bright');
        $status_text.removeClass('bright');

        $info_text.addClass('dark');
        $status_text.addClass('dark');

      } else if (this.lightness > too_bright) {
        $info_text.removeClass('dark');
        $status_text.removeClass('dark');

        $info_text.addClass('bright');
        $status_text.addClass('bright');

      } else {
        $info_text.removeClass('bright');
        $status_text.removeClass('bright');

        $info_text.removeClass('dark');
        $status_text.removeClass('dark');
      }
    },

    _update_keys_at_limit: function(){
      var $a = $('i.a-key'),
      $s = $('i.s-key'),
      $d = $('i.d-key'),
      $f = $('i.f-key'),
      $z = $('i.z-key'),
      $x = $('i.x-key'),
      $c = $('i.c-key'),
      $v = $('i.v-key');

      // saturation (a/s 0..100 d/f)
      if (this.saturation === 0) {
        $a.addClass('disabled');
        $s.addClass('disabled');
        $d.removeClass('disabled');
        $f.removeClass('disabled');
      } else if (this.saturation === 100) {
        $a.removeClass('disabled');
        $s.removeClass('disabled');
        $d.addClass('disabled');
        $f.addClass('disabled');
      } else {
        $a.removeClass('disabled');
        $s.removeClass('disabled');
        $d.removeClass('disabled');
        $f.removeClass('disabled');
      }

      // lightness (z/x 0..100 c/v)
      if (this.lightness === 0) {
        $z.addClass('disabled');
        $x.addClass('disabled');
        $c.removeClass('disabled');
        $v.removeClass('disabled');
      } else if (this.lightness === 100) {
        $z.removeClass('disabled');
        $x.removeClass('disabled');
        $c.addClass('disabled');
        $v.addClass('disabled');
      } else {
        $z.removeClass('disabled');
        $x.removeClass('disabled');
        $c.removeClass('disabled');
        $v.removeClass('disabled');
      }
    }

  };
}

// keyboard key event listeners
function setKeyListeners() {

  var bigChange = 10,
    smallChange = 1;

  // Hue

    Keyboard.on('q', function() {
      if(abortKeyEvent()) { return; }
      resetDoNotUpdates();
      CCAPP.color.decrementHue(bigChange);
      CCAPP.color.update();
      $('i.q-key').addClass('active');
    }, function() {
      $('i.q-key').removeClass('active');
    });

    Keyboard.on('w', function() {
      if(abortKeyEvent()) { return; }
      resetDoNotUpdates();
      CCAPP.color.decrementHue(smallChange);
      CCAPP.color.update();
      $('i.w-key').addClass('active');
    }, function() {
      $('i.w-key').removeClass('active');
    });

    Keyboard.on('e', function() {
      if(abortKeyEvent()) { return; }
      resetDoNotUpdates();
      CCAPP.color.incrementHue(smallChange);
      CCAPP.color.update();
      $('i.e-key').addClass('active');
    }, function() {
      $('i.e-key').removeClass('active');
    });

    Keyboard.on('r', function() {
      if(abortKeyEvent()) { return; }
      resetDoNotUpdates();
      CCAPP.color.incrementHue(bigChange);
      CCAPP.color.update();
      $('i.r-key').addClass('active');
    }, function() {
      $('i.r-key').removeClass('active');
    });

  // Saturation

    Keyboard.on('a', function() {
      if(abortKeyEvent()) { return; }
      resetDoNotUpdates();
      CCAPP.color.decrementSaturation(bigChange);
      CCAPP.color.update();
      $('i.a-key').addClass('active');
    }, function() {
      $('i.a-key').removeClass('active');
    });

    Keyboard.on('s', function() {
      if(abortKeyEvent()) { return; }
      resetDoNotUpdates();
      CCAPP.color.decrementSaturation(smallChange);
      CCAPP.color.update();
      $('i.s-key').addClass('active');
    }, function() {
      $('i.s-key').removeClass('active');
    });

    Keyboard.on('d', function() {
      if(abortKeyEvent()) { return; }
      resetDoNotUpdates();
      CCAPP.color.incrementSaturation(smallChange);
      CCAPP.color.update();
      $('i.d-key').addClass('active');
    }, function() {
      $('i.d-key').removeClass('active');
    });

    Keyboard.on('f', function() {
      if(abortKeyEvent()) { return; }
      resetDoNotUpdates();
      CCAPP.color.incrementSaturation(bigChange);
      CCAPP.color.update();
      $('i.f-key').addClass('active');
    }, function() {
      $('i.f-key').removeClass('active');
    });

  // Lightness

    Keyboard.on('z', function() {
      if(abortKeyEvent()) { return; }
      resetDoNotUpdates();
      CCAPP.color.decrementLightness(bigChange);
      CCAPP.color.update();
      $('i.z-key').addClass('active');
    }, function() {
      $('i.z-key').removeClass('active');
    });

    Keyboard.on('x', function() {
      if(abortKeyEvent()) { return; }
      resetDoNotUpdates();
      CCAPP.color.decrementLightness(smallChange);
      CCAPP.color.update();
      $('i.x-key').addClass('active');
    }, function() {
      $('i.x-key').removeClass('active');
    });

    Keyboard.on('c', function() {
      if(abortKeyEvent()) { return; }
      resetDoNotUpdates();
      CCAPP.color.incrementLightness(smallChange);
      CCAPP.color.update();
      $('i.c-key').addClass('active');
    }, function() {
      $('i.c-key').removeClass('active');
    });

    Keyboard.on('v', function() {
      if(abortKeyEvent()) { return; }
      resetDoNotUpdates();
      CCAPP.color.incrementLightness(bigChange);
      CCAPP.color.update();
      $('i.v-key').addClass('active');
    }, function() {
      $('i.v-key').removeClass('active');
    });
}

function abortKeyEvent(){
  if ( $("input").is(":focus") ) {
    return true;
  } else {
    return false;
  }
}

function resetDoNotUpdates() {
  CCAPP.color.do_not_update_picker = false;
  CCAPP.color.do_not_update_hex = false;
  CCAPP.color.do_not_update_rgb = false;
}

// touch/click event listeners

function setTouchListeners() {

  // TODO: DRY these change vars with constants
  var bigChange = 10,
    smallChange = 1;

  // Hue

    $('i.q-key').on('click', function() {
      resetDoNotUpdates();
      CCAPP.color.decrementHue(bigChange);
      CCAPP.color.update();
    });

    $('i.w-key').on('click', function(){
      resetDoNotUpdates();
      CCAPP.color.decrementHue(smallChange);
      CCAPP.color.update();
    });

    $('i.e-key').on('click', function(){
      resetDoNotUpdates();
      CCAPP.color.incrementHue(smallChange);
      CCAPP.color.update();
    });

    $('i.r-key').on('click', function(){
      resetDoNotUpdates();
      CCAPP.color.incrementHue(bigChange);
      CCAPP.color.update();
    });

  // Saturation

    $('i.a-key').on('click', function(){
      resetDoNotUpdates();
      CCAPP.color.decrementSaturation(bigChange);
      CCAPP.color.update();
    });

    $('i.s-key').on('click', function(){
      resetDoNotUpdates();
      CCAPP.color.decrementSaturation(smallChange);
      CCAPP.color.update();
    });

    $('i.d-key').on('click', function(){
      resetDoNotUpdates();
      CCAPP.color.incrementSaturation(smallChange);
      CCAPP.color.update();
    });

    $('i.f-key').on('click', function(){
      resetDoNotUpdates();
      CCAPP.color.incrementSaturation(bigChange);
      CCAPP.color.update();
    });

  // Lightness

    $('i.z-key').on('click', function(){
      resetDoNotUpdates();
      CCAPP.color.decrementLightness(bigChange);
      CCAPP.color.update();
    });

    $('i.x-key').on('click', function(){
      resetDoNotUpdates();
      CCAPP.color.decrementLightness(smallChange);
      CCAPP.color.update();
    });

    $('i.c-key').on('click', function(){
      resetDoNotUpdates();
      CCAPP.color.incrementLightness(smallChange);
      CCAPP.color.update();
    });

    $('i.v-key').on('click', function(){
      resetDoNotUpdates();
      CCAPP.color.incrementLightness(bigChange);
      CCAPP.color.update();
    });
}

// input field event listeners

function setInputListeners(){
  $('input.hex').on('input', function(e) {
    CCAPP.color.do_not_update_picker = false;
    CCAPP.color.do_not_update_hex = true;
    CCAPP.color.do_not_update_rgb = false;

    updateColorHSL(e.currentTarget.value);
  });

  $('input.rgb').on('input', function(e) {
    CCAPP.color.do_not_update_picker = false;
    CCAPP.color.do_not_update_hex = false;
    CCAPP.color.do_not_update_rgb = true;

    updateColorHSL(e.currentTarget.value);
  });
}

// expects onecolor object as input
function updateColorHSL(input_value) {
  var color = onecolor(input_value); // parse & validate input
  var inputColor, hue, saturation, lightness;

  if (color) {
    inputColor  = color.hsl();
    hue         = Math.round(inputColor.hue()*360);
    saturation  = Math.round(inputColor.saturation()*100);
    lightness   = Math.round(inputColor.lightness()*100);

    CCAPP.color.hue         = hue;
    CCAPP.color.saturation  = saturation;
    CCAPP.color.lightness   = lightness;

    CCAPP.color.update();
  }
}

// color picker event listeners

function setColorPicker() {
  var joe = colorjoe.rgb('picker');
  CCAPP.picker = CCAPP.picker || joe;

  CCAPP.picker.on('change', function(c) {
    var pickedColor = c.hsl(),
        hue         = Math.round(pickedColor.hue()*360),
        saturation  = Math.round(pickedColor.saturation()*100),
        lightness   = Math.round(pickedColor.lightness()*100);

    CCAPP.color.hue         = hue;
    CCAPP.color.saturation  = saturation;
    CCAPP.color.lightness   = lightness;
    CCAPP.color.update();
  });

  $('#picker').on('click', function() {
    CCAPP.color.do_not_update_picker = true;
    CCAPP.color.do_not_update_hex = false;
    CCAPP.color.do_not_update_rgb = false;
  });
}
