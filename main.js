'use strict';

const dataStorage = new DataStorage();
const domParser = new DomParser(dataStorage);
const numberHelper = new NumberHelper(dataStorage);
const domWriter = new DomWriter(dataStorage, numberHelper);

const clickToCall = new ClickToCall(dataStorage, domParser, domWriter);

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
