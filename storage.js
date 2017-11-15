'use strict';

function saveStorage() {
  browser.storage.sync.set({ tne: this.options });
}

function loadStorage() {
  return browser.storage.sync
    .get('tne')
    .then((res) => {
      if (typeof res.tne === 'undefined') {
        return;
      }

      this.options = res.tne;
    });
}

function DataStorage() {
  this.options = {
    host: '',
    port: null,
    username: '',
    password: '',
    dialPrefix: null,
    intPrefix: null,
    natPrefix: '00'
  };
}

DataStorage.prototype = {
  set: function set(key, val) {
    this.options[key] = val;

    return this;
  },

  get: function get(key) {
    return this.options[key];
  },

  getAll: function getAll() {
    return this.options;
  },

  save: function save() {
    saveStorage.call(this);

    return this;
  },

  load: function load() {
    return loadStorage.call(this);
  }
};
