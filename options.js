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

function saveOptions(e) {
  e.preventDefault();

  const options = dataStorage.getAll();

  Object.keys(options).forEach((x) => {
    dataStorage.set(x, document.querySelector('#' + formPrefix + x).value);
  });

  dataStorage.save();

  const modal = document.getElementById('modal-save-done');
  modal.style.opacity = '1';
  modal.style.visibility = 'visible';

  setTimeout(() => {
    modal.style.opacity = '0';
    modal.style.visibility = 'hidden';
  }, 3000);
}

document.addEventListener('DOMContentLoaded', populateFields);
document.querySelector("form").addEventListener("submit", saveOptions);
