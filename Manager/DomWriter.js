'use strict';

function DomWriter(dataStorage, numberHelper) {
  this.local = typeof browser === 'undefined' ? chrome : browser;
  this.dataStorage = dataStorage;
  this.numberHelper = numberHelper;
}

DomWriter.prototype = {
  createHtmlNode: function createHtmlNode(html, element) {
    const sanitized = this.numberHelper.sanitizeNumber(html);

    if (sanitized === null) {
      return this.createTextNode(html, element);
    }

    const span = document.createElement('span');

    if (this.dataStorage.get('style') === 'new') {
      span.setAttribute('class', 'tne-match');
      span.addEventListener('dblclick', () => {
        callListener.call(this, sanitized);
      });
    } else {
      const img = document.createElement('img');
      img.setAttribute('src', this.local.extension.getURL("images/phone.png"));
      img.addEventListener('click', () => {
        callListener.call(this, sanitized);
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

  new Promise((resolve, reject) => {
    this.local.runtime.sendMessage(
      {query: "getChallenge"},
      resolve
    );
  }).then(({challenge}) => {
    command
      .createCallCommand(challenge, number)
      .then((command) => {
        this.local.runtime.sendMessage(
          {query: 'sendCommand', command},
          (x) => {}
        );
      });
  }, (err) => {
    throw new Error(err);
  });
}

if (typeof module !== 'undefined') {
  module.exports = DomWriter;
}
