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
        this.securePort = this.dataStorage.get('securePort');
      });
  },

  request: function request(command) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', getUrl.call(this, command), true);
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
};

function getUrl(command) {
  let protocol = location.protocol;

  if (protocol.match(/^https?/) === null) {
    protocol = 'https:';
  }

  const port = protocol === 'http:' ? this.port : this.securePort;

  return protocol + '//' + this.host + ':' + port + '/' + command;
}
