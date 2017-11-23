'use strict';

const dataStorage = new DataStorage();
const domParser = new DomParser(dataStorage);
const domWriter = new DomWriter(dataStorage);

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
