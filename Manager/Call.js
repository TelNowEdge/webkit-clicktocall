'use strict';

function Call() {
  this.challenge = null;
}

Call.prototype = {
  send: function send() {

  }
};

function initConnection() {
  const connection = new Connection();

  const res = connection.init()
    .then(() => {
      connection.getChallenge();
    });

  this.challenge = res;
}
