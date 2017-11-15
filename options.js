'use strict';

const dataStorage = new DataStorage();
const formPrefix = 'tne_';

function populateFields() {
  dataStorage.load().then(() => {
    const options = dataStorage.getAll();

    Object.keys(options).forEach((x) => {
      document.querySelector('#' + formPrefix + x).value = options[x];
    });
  });
}

function saveOptions() {
  const options = dataStorage.getAll();

  Object.keys(options).forEach((x) => {
    dataStorage.set(x, document.querySelector('#' + formPrefix + x).value);
  });

  dataStorage.save();
}

document.addEventListener('DOMContentLoaded', populateFields);
document.querySelector("form").addEventListener("submit", saveOptions);
