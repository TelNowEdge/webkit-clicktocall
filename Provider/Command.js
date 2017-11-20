'use strict';

function Command() {
  this.connection = new Connection();
  this.dataStorage = new DataStorage();
  this.authenticator = new Authenticator();
}

Command.prototype = {
  createCommand: function createCommand(command) {
    let promises = [];

    promises.push(
      initChallenge.call(this),
      initDataStorage.call(this)
    );

    return Promise.all(promises)
      .then((x) => {
        const uniqId = this.authenticator.getUniqId();

        const cmd = this.dataStorage.get('username')
                + '/'
                + x[0]
                + uniqId
                + '/'
                + command
        ;

        return this.authenticator
          .getHash(x[0], uniqId, cmd)
          .then((hash) => {
            return [
              'Auth',
              hash,
              cmd
            ].join('/');
          });
      });
  },

  send: function send(cmd) {
    this.connection
      .setCommand(cmd)
      .request()
    ;
  },

  createCallCommand: function createCallCommand(number) {
    return this.dataStorage
      .load()
      .then(() => {
        const command = '3pcc/Call/' + this.dataStorage.get('username') + '/' + number;

        return this.createCommand(command);
      });
  },
};

function initChallenge() {
  return this.connection
    .init()
    .then(() => this.connection.getChallenge())
  ;
}

function initDataStorage() {
  return this.dataStorage.load();
}
