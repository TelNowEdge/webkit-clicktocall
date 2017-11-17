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
    port: null,
    username: '',
    password: '',
    dialPrefix: null,
    intPrefix: null,
    natPrefix: '00',
    style: 'old',
    patterns: "(?:0|\\+)\\d{8,}\n(?:\\d{2}\\s){4}\\d{2}",
    excludes: "http://telnowedge.com\nhttp://google.fr"
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
