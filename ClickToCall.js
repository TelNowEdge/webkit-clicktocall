'use strict';

function ClickToCall(dataStorage, domParser, domWriter) {
  this.dataStorage = dataStorage;
  this.domParser = domParser;
  this.domWriter = domWriter;
}

ClickToCall.prototype = {
  getNodes: function getNodes() {
    return this.domParser
      .parseDom()
      .extractNodes()
      .then(() => {
        return this.domParser.getNodes();
      })
    ;
  },

  process: function process(nodes) {
    nodes.forEach((x) => {
      const placement = [];
      const nodeText = x.node.textContent;
      const length = nodeText.length;

      x.matches.forEach((m) => {
        if (lookupFullMatch(nodeText, m) === false) {
          return;
        }

        placement.push({
          start: nodeText.indexOf(m),
          length: m.length
        });
      });

      if (placement.length === 0) {
        return;
      }

      x.node.textContent = '';

      placement.forEach((z, i) => {
        if (z.start === 0) {
          this.domWriter.createHtmlNode(nodeText.substr(0, z.length), x.node);

          return;
        }

        if (i === 0) {
          this.domWriter
            .createTextNode(nodeText.substr(0, z.start), x.node)
            .createHtmlNode(nodeText.substr(z.start, z.length), x.node)
          ;

          return;
        }

        this.domWriter
          .createTextNode(
            nodeText.substr(
              placement[i - 1].start + placement[i - 1].length,
              z.start - (placement[i - 1].start + placement[i - 1].length)
            ), x.node)
          .createHtmlNode(nodeText.substr(z.start, z.length), x.node)
        ;
      });

      const lastItem = placement.slice(-1).pop();
      if ((lastItem.start + lastItem.length) === length) {
        return;
      }

      this.domWriter.createTextNode(
        nodeText.substr(-1 * (length - (lastItem.start + lastItem.length))),
        x.node
      );
    });
  },

  checkUrl: function checkUrl() {
    return new Promise((resolve, reject) => {
      this.dataStorage
        .load()
        .then(() => {
          if (
            this.dataStorage.get('username') === ''
              || this.dataStorage.get('host') === ''
              || this.dataStorage.get('port') === ''
              || this.dataStorage.get('securePort') === ''
          ) {
            reject();
          }

          const excludes = this.dataStorage.getExcludes();

          excludes.forEach((x) => {
            if (x === '') {
              return;
            }

            const regExp = new RegExp(x);
            if (document.URL.match(regExp)) {
              reject();
            }
          });

          resolve();
        });
    });
  },
};

function lookupFullMatch(nodeText, match) {
  const start = nodeText.indexOf(match);

  if (start !== 0) {
    if (nodeText[start-1].match(/\d/)) {
      return false;
    }
  }

  if ((start + match.length) < nodeText.length) {
    if (nodeText[start + match.length].match(/\d/)) {
      return false;
    }
  }

  return true;
}

if (typeof module !== 'undefined') {
  module.exports = ClickToCall;
}
