'use strict';

function Command() {
  this.dataStorage = new DataStorage();
  this.authenticator = new Authenticator();
}

Command.prototype = {
  createCommand: function createCommand(challenge, command) {
    const uniqId = this.authenticator.getUniqId();

    const cmd = this.dataStorage.get('username')
            + '/'
            + challenge
            + uniqId
            + '/'
            + command
    ;

    return this.authenticator
      .getHash(challenge, uniqId, cmd)
      .then((hash) => {
        return [
          'Auth',
          hash,
          cmd
        ].join('/');
      });
  },

  createCallCommand: function createCallCommand(challenge, number) {
    return this.dataStorage
      .load()
      .then(() => {
        const command = '3pcc/Call/' + this.dataStorage.get('username') + '/' + number;

        return this.createCommand(challenge, command);
      });
  },
};
