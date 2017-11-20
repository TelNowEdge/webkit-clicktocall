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

      Object.keys(res.tne).forEach((x) => {
        this.options[x] = res.tne[x];
      });
    });
}

function DataStorage() {
  this.options = {
    host: '',
    port: '',
    username: '',
    password: '',
    dialPrefix: '',
    natPrefix: '0',
    hashMethod: 'md5',
    style: 'old',
    patterns: "^[\\+\\d][\\(\\)\\d-\\.\\s]+",
    excludes: ""
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

  getPatterns: function getPatterns() {
    return this.options.patterns.split("\n");
  },

  getExcludes: function getExcludes() {
    return this.options.excludes.split("\n");
  },

  save: function save() {
    saveStorage.call(this);

    return this;
  },

  load: function load() {
    return loadStorage.call(this);
  }
};
