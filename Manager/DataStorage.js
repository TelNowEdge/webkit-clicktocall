'use strict';

function saveStorage() {
  const local = typeof browser === 'undefined' ? chrome : browser;

  local.storage.local.set({ tne: this.options });
}

function loadStorage() {
  const local = typeof browser === 'undefined' ? chrome : browser;

  return new Promise((resolve) => {
    local.storage.local
      .get('tne', (res) => {
        if (typeof res.tne === 'undefined') {
          resolve();
          return;
        }

        Object.keys(res.tne).forEach((x) => {
          this.options[x] = res.tne[x];
        });

        resolve();
      });
  });
}

function DataStorage() {
  this.options = {
    host: '',
    port: '1984',
    securePort: '2347',
    username: '',
    password: '',
    dialPrefix: '',
    natPrefix: '0',
    hashMethod: 'md5',
    style: 'old',
    patterns: "[\\+\\d][\\(\\)\\d-\\.\\s]{7,20}\\d",
    internalPatterns: "",
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
    const res =  this.options.patterns.split("\n");

    return res.filter((x) => {
      return x !== '';
    });
  },

  getInternalPatterns: function getInternalPatterns() {
    const res =  this.options.internalPatterns.split("\n");

    return res.filter((x) => {
      return x !== '';
    });
  },

  getExcludes: function getExcludes() {
    const res = this.options.excludes.split("\n");

    return res.filter((x) => {
      return x !== '';
    });
  },

  save: function save() {
    saveStorage.call(this);

    return this;
  },

  load: function load() {
    return loadStorage.call(this);
  }
};

if (typeof module !== 'undefined') {
  module.exports = DataStorage;
}
