'use strict';

const local = typeof browser === 'undefined' ? chrome : browser;
const dataStorage = new DataStorage();
const numberHelper = new NumberHelper(dataStorage);

local.contextMenus.create({
  id: "tne-dial",
  title: local.i18n.getMessage("contextMenuItemSelectionDial") + " %s",
  contexts: ["selection"],
  onclick: (info, tab) => {
    process(info.selectionText);
  }
});

function process(number) {
  if (checkNumber(number) === false) {
    alert('This is not a telephone number');

    return;
  }

  dataStorage
    .load()
    .then(() => {
      if (isConfigured() === false) {
        alert('You must configure plugin before to use it');

        return;
      }

      var sanitized = numberHelper.sanitizeNumber(number);

      if (sanitized === null) {
        alert('Invalid number');

        return;
      }

      call(sanitized);
    });
  ;
}

function call(number) {
  const command = new Command();

  command
    .createCallCommand(number)
    .then((x) => {
      command.send(x);
    });
}

function isConfigured()
{
  if (
    dataStorage.get('username') === ''
      || dataStorage.get('host') === ''
      || dataStorage.get('port') === ''
      || dataStorage.get('securePort') === ''
  ) {
    return false;
  }

  return true;
}

function checkNumber(number) {
  if (number.match(/^\+|\d[\d\s-\.]+$/) === null) {
    return false;
  }

  return true;
}
