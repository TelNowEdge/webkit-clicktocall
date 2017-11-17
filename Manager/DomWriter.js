'use strict';

function DomWriter() {
  this.dataStorage = new DataStorage();
  this.dataStorage.load();
}

DomWriter.prototype = {
  createHtmlNode: function createHtmlNode(html, element) {
    const span = document.createElement('span');

    if (this.dataStorage.get('style') === 'new') {
      span.setAttribute('style', 'border-bottom: 2px dotted #333;');
      span.addEventListener('click', () => {
        console.log('ok');
      });
    } else {
      const img = document.createElement('img');
      img.setAttribute('src', '');
      img.addEventListener('click', () => {
        console.log('dsadas');
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
