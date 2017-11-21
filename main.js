'use strict';

function ClickToCall() {
  this.domParser = new DomParser();
  this.domWriter = new DomWriter();
  this.dataStorage = new DataStorage();
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
      x.node.textContent = '';

      x.matches.forEach((m) => {
        placement.push({
          start: nodeText.indexOf(m),
          length: m.length
        });
      });

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

const clickToCall = new ClickToCall();

clickToCall
  .checkUrl()
  .then(() => {
    clickToCall
      .getNodes()
      .then((nodes) => {
        clickToCall.process(nodes);
      });
  })
;
