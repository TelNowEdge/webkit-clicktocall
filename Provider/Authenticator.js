'use strict';

function Authenticator() {
  this.dataStorage = new DataStorage();
}

Authenticator.prototype = {
  getUniqId: function getUniqId() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  },

  getHash: function getHash(challenge, uniqId, command) {
    return this.dataStorage
      .load()
      .then(() => {
        const hashMethod = this.dataStorage.get('hashMethod');
        if (hashMethod === 'md5') {
          return md5(
            this.dataStorage.get('username')
              + ':'
              + challenge
              + uniqId
              + ':/'
              + command
              + ':'
              + this.dataStorage.get('password')
          );
        }

        if (hashMethod === 'sha256') {
          return sha256(
            this.dataStorage.get('username')
              + ':'
              + challenge
              + uniqId
              + ':/'
              + command
              + ':'
              + this.dataStorage.get('password')
          );
        }
      });
  },
};

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};
