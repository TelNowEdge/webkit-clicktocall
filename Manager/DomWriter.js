'use strict';

function DomWriter(dataStorage, numberHelper) {
  this.dataStorage = dataStorage;
  this.numberHelper = numberHelper;
}

DomWriter.prototype = {
  createHtmlNode: function createHtmlNode(html, element) {
    const sanitized = this.numberHelper.sanitizeNumber(html);
    const local = typeof browser === 'undefined' ? chrome : browser;

    if (sanitized === null) {
      return this.createTextNode(html, element);
    }

    const span = document.createElement('span');

    if (this.dataStorage.get('style') === 'new') {
      span.setAttribute('class', 'tne-match');
      span.addEventListener('dblclick', () => {
        callListener(sanitized);
      });
    } else {
      const img = document.createElement('img');
      img.setAttribute('src', local.extension.getURL("images/phone.png"));
      img.addEventListener('click', () => {
        callListener(sanitized);
      });

      span.appendChild(img);
    }

    span.insertAdjacentHTML('afterbegin', html);
    element.parentNode.insertBefore(span, element);

    return this;
  },

  createTextNode: function createTextNode(text, element) {
    element.parentNode.insertBefore(document.createTextNode(text), element);

    return this;
  },
};

function callListener(number) {
  const command = new Command();

  command
    .createCallCommand(number)
    .then((x) => {
      command.send(x);
    });
}

if (typeof module !== 'undefined') {
  module.exports = DomWriter;
}
