const assert = require('assert');
require('jsdom-global')();

document.body.innerHTML = "<p>  +33678787654</p><p>  0678787654</p><div>  06 78 78 76 54</div><div>  +33 6 78 78 76 54</div><div>  +33.6.78.78.76.54</div><div>  +33-6-78-78-76-54</div><div>  06.78.78.76.54</div><div>  06-78-78-76-54</div><strong>  +33 6 78 78 76 54</strong><div>  1-888-573-9992</div><div>  +1-888-573-9992</div><p>  Before something was writing  +33678787654</p><p>  Before something was writing   0678787654</p><div>  Before something was writing 06 78 78 76 54</div><div>  Before something was writing  +33 6 78 78 76 54</div><div>  Before something was writing +33.6.78.78.76.54</div><div>  Before something was writing   +33-6-78-78-76-54</div><div>  Before something was writing   06.78.78.76.54</div><div>  Before something was writing  06-78-78-76-54</div><strong>  Before something was writing   +33 6 78 78 76 54</strong><div>  Before something was writing   1-888-573-9992</div><div>  Before something was writing   +1-888-573-9992</div><p>  +33678787654 After something was writing</p><p>  0678787654 After something was writing</p><div>  06 78 78 76 54 After something was writing</div><div>  +33 6 78 78 76 54 After something was writing</div><div>  +33.6.78.78.76.54 After something was writing</div><div>  +33-6-78-78-76-54 After something was writing</div><div>  06.78.78.76.54 After something was writing</div><div>  06-78-78-76-54 After something was writing</div><strong>  +33 6 78 78 76 54 After something was writing</strong><div>  1-888-573-9992 After something was writing</div><div>  +1-888-573-9992 After something was writing</div><p>  Before something was writing  +33678787654 After something was writing</p><p>  Before something was writing  0678787654 After something was writing</p><div>  Before something was writing  06 78 78 76 54 After something was writing</div><div>  Before something was writing  +33 6 78 78 76 54 After something was writing</div><div>  Before something was writing  +33.6.78.78.76.54 After something was writing</div><div>  Before something was writing  +33-6-78-78-76-54 After something was writing</div><div>  Before something was writing  06.78.78.76.54 After something was writing</div><div>  Before something was writing  06-78-78-76-54 After something was writing</div><strong>  Before something was writing  +33 6 78 78 76 54 After something was writing</strong><div>  Before something was writing  1-888-573-9992 After something was writing</div><div>  Before something was writing  +1-888-573-9992 After something was writing</div>";

const DataStorage = require('../Manager/DataStorage');
const DomParser = require('../Manager/DomParser');
const DomWriter = require('../Manager/DomWriter');
const ClickToCall = require('../ClickToCall');

DataStorage.prototype.load = function () {
  return Promise.resolve();
};
DataStorage.prototype.save = function () {
  return this;
};

DomWriter.prototype.init = function () {
  this.htmlNodes = 0;
  this.textNodes = 0;
};

DomWriter.prototype.createHtmlNode = function () {
  this.htmlNodes = this.htmlNodes + 1;

  return this;
};

DomWriter.prototype.createTextNode = function () {
  this.textNodes = this.textNodes + 1;

  return this;
};

DomWriter.prototype.iterations = function () {
  return [this.htmlNodes, this.textNodes];
};

describe('DomParser', () => {
  const domParser = new DomParser(new DataStorage());

  describe('getNodes()', () => {
    it('Should be an array', () => {
      return domParser
        .parseDom()
        .extractNodes()
        .then(() => {
          assert.equal(true, Array.isArray(domParser.getNodes()));
        });
    });

    it('Should be array of object', () => {
      assert.equal('object', typeof domParser.getNodes().slice(1,1));
    });

    it('Should contains property node and matches', () => {
      const x = domParser.getNodes().slice(0,1).pop();
      assert.ok(x.node);
      assert.ok(x.matches);
    });

    it('Should be get 44 numbers', () => {
      assert.equal(44, domParser.getNodes().length);
    });
  });
});

describe('ClickToCall', () => {

  const dataStorage = new DataStorage();
  const domParser = new DomParser(dataStorage);
  const domWriter = new DomWriter();
  domWriter.init();

  const clickToCall = new ClickToCall(dataStorage, domParser, domWriter);

  describe('process()', () => {
    it('should be have 44 htmlNodes', () => {
      return domParser
        .parseDom()
        .extractNodes()
        .then(() => {
          clickToCall.process(domParser.getNodes());
          assert.equal(44, domWriter.iterations()[0]);
        });
    });

    it('should be have 66 textNodes', () => {
      assert.equal(66, domWriter.iterations()[1]);
    });
  });
});
