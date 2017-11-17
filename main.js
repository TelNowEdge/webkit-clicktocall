'use strict';

function ClickToCall() {
  this.domParser = new DomParser();
  this.domWriter = new DomWriter();
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
};




// console.log('dsadas');

// browser.storage.local.get('extensions.adblockplus.currentVersion')
//   .then((res) => {
//     console.log(res.value);
//   });
// exit;
var clickToCall = new ClickToCall();
clickToCall
  .getNodes()
  .then((nodes) => {
    clickToCall.process(nodes);
  })
;
