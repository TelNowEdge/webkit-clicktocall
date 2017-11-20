'use strict';

function Connection() {
  this.host = null;
  this.port = null;
  this.command = null;

  this.dataStorage = new DataStorage();
}

Connection.prototype = {
  init: function init() {
    return this.dataStorage
      .load()
      .then(() => {
        this.host = this.dataStorage.get('host');
        this.port = this.dataStorage.get('port');
      });
  },

  request: function request() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', getUrl.call(this), true);
      xhr.onreadystatechange = function(event) {
        if (this.readyState === XMLHttpRequest.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          }

          reject({
            status: this.status,
            response: this.response
          });
        }
      };

      xhr.send(null);
    });
  },

  setCommand: function setCommand(cmd) {
    this.command = cmd;

    return this;
  },

  getChallenge: function getChallenge() {
    this.command = '3pcc/GetChallenge';

    return this.request()
      .then(
        (response) => {
          return JSON.parse(response).challenge;
        },
        (error) => {
          throw new Error(error);
        }
      );
  },
};

function getUrl() {
  return 'http://' + this.host + ':' + this.port + '/' + this.command;
}
