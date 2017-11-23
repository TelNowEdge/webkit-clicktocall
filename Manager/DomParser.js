'use strict';

function DomParser() {
  this.wantedTargets = ['a', 'abbr', 'acronym', 'address', 'b', 'bdo', 'big', 'blockquote', 'body', 'caption', 'center', 'cite', 'code', 'dd', 'del', 'div', 'dfn', 'dt', 'em', 'fieldset', 'font', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'i', 'ins', 'kdb', 'li', 'object', 'pre', 'p', 'q', 'samp', 'small', 'span', 'strike', 's', 'strong', 'sub', 'sup', 'td', 'th', 'tt', 'u', 'var'];

  this.xpathExpression = "//text()[(parent::" + this.wantedTargets.join(" or parent::") + ")]";

  this.xpathRes = null;

  this.dataStorage = new DataStorage();
  this.nodes = [];
}

DomParser.prototype = {
  parseDom: function parseDom() {
    this.xpathRes = document.evaluate(
      this.xpathExpression,
      document.body,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null
    );

    return this;
  },

  extractNodes: function extractNodes() {
    if (null === this.xpathRes) {
      throw new Error('xpath isn\'t initialized');
    }

    return this.dataStorage
      .load()
      .then(() => {
        const patterns = this.dataStorage.getPatterns();
        const regExp = new RegExp('(?:' + patterns.join(')|(?:') + ')', 'g');
        return process.call(this, regExp);
      });
  },

  getNodes: function getNodes() {
    return this.nodes;
  }
};

function process(regExp) {
  for (let i = 0; i < this.xpathRes.snapshotLength; i++) {
    const text = this.xpathRes.snapshotItem(i).textContent;
    const matches = text.match(regExp);

    if (null === matches) {
      continue;
    }

    this.nodes.push({
      node: this.xpathRes.snapshotItem(i),
      matches,
    });
  }

  return this;
}

if (typeof module !== 'undefined') {
  module.exports = DomParser;
}
