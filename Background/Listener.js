'use strict';

function Listener(local) {
  this.local = local;
  this.connection = new Connection();
  this.register();
}

Listener.prototype = {
  register: function register() {
    this.local.runtime.onMessage.addListener(({query, command}, sender, callback) => {
      if (query === 'getChallenge') {
        this
          .getChallenge()
          .then((x) => {
            callback(x);
          });
      }

      if (query === 'sendCommand') {
        this
          .sendCommand(command)
          .then((x) => {
            callback(x);
          });
      }

      return true;
    });
  },

  getChallenge: function getChallenge() {
    return new Promise((resolve, reject) => {
      this
        .connection
        .init()
        .then(() => {
          this
            .connection
            .request('3pcc/GetChallenge')
            .then((response) => {
              resolve({
                success: true,
                challenge: JSON.parse(response).challenge,
              });
            }, (error) => {
              if (error.status === 0) {
                alert("[TelNowEdge click to call]\nVerify your host");

                throw new Error(error);
              }

              alert("[TelNowEdge click to call]\nPlease contact your administrator to install the root certificat");

              throw new Error(error);
            });
        });
    });
  },

  sendCommand: function sendCommand(command) {
    return new Promise((resolve, reject) => {
      this
        .connection
        .init()
        .then(() => {
          this
            .connection
            .request(command)
            .then((response) => {
              const json = JSON.parse(response);

              if (json.status === 'ERROR') {
                alert("[TelNowEdge click to call]\nCall failed on IPBX");

                reject();
              }

              resolve({
                success: true,
                message: json,
              });

            }, (error) => {
              alert("[TelNowEdge click to call]\nUnknow error");

              throw new Error(error);
            });
        });
    });
  }
}
