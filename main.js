'use strict';

function ClickToCall() {

}

ClickToCall.prototype = {
  constructor: ClickToCall,

  go: function go() {
    console.log('ok');
  },
};

var clickToCall = new ClickToCall();
clickToCall.go();
