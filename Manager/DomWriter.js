'use strict';

function DomWriter() {
  this.dataStorage = new DataStorage();
  this.dataStorage.load();
}

DomWriter.prototype = {
  createHtmlNode: function createHtmlNode(html, element) {
    const sanitized = sanitizeNumber.call(this, html);

    if (sanitized === null) {
      return this.createTextNode(html, element);
    }

    const span = document.createElement('span');

    if (this.dataStorage.get('style') === 'new') {
      span.setAttribute('style', 'border-bottom: 2px dotted #333; cursor: pointer;');
      span.addEventListener('dblclick', () => {
        callListener(sanitized);
      });
    } else {
      const img = document.createElement('img');
      img.setAttribute('src', browser.extension.getURL("images/phone.png"));
      img.addEventListener('click', () => {
        callListener(sanitized);
      });

      span.appendChild(img);
    }

    span.insertAdjacentHTML('afterbegin', sanitized);
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

function sanitizeNumber(number) {
  const parsed = libphonenumber.parse(number);

  if (Object.keys(parsed).length !== 0) {
    return '+' + libphonenumber.getPhoneCode(parsed.country) + parsed.phone;
  }

  const natPrefix = this.dataStorage.get('natPrefix');
  const dialPrefix = this.dataStorage.get('dialPrefix');

  let sanitized = number.replace(/[^+\d]+/g, '');

  // French number
  const regExp = new RegExp("^" + natPrefix + "[1-9]\\d{8}");
  if (sanitized.match(regExp)) {
    return dialPrefix + sanitized;
  }

  // US yellow page number ( 1-888-573-9922 )
  if (number.match(/^\d-\d{3}-\d{3}-\d{4}$/)) {
    return '+' + sanitized;
  }

  return null;
}
