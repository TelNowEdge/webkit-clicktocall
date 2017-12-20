'use strict';

function NumberHelper(dataStorage) {
  this.dataStorage = dataStorage;
}

NumberHelper.prototype = {
  sanitizeNumber: function sanitizeNumber(number) {
    const parsed = libphonenumber.parse(number);

    if (Object.keys(parsed).length !== 0) {
      return '+' + libphonenumber.getPhoneCode(parsed.country) + parsed.phone;
    }

    const natPrefix = this.dataStorage.get('natPrefix');
    const dialPrefix = this.dataStorage.get('dialPrefix');


    let sanitized = number.replace(/[^\+\d]+/g, '');

    // Internal numbers
    const internalPatterns = this.dataStorage.getInternalPatterns();
    const internalRegExp = new RegExp('(?:^' + internalPatterns.join('$)|(?:^') + '$)');

    if (sanitized.match(internalRegExp)) {
      return sanitized;
    }

    // French number
    const regExp = new RegExp("^" + natPrefix + "[1-9]\\d{8}$");
    if (sanitized.match(regExp)) {
      return dialPrefix + sanitized;
    }

    // US yellow page number ( 1-888-573-9922 )
    if (number.match(/^\d-\d{3}-\d{3}-\d{4}$/)) {
      return '+' + sanitized;
    }

    return null;
  }
};

if (typeof module !== 'undefined') {
  module.exports = NumberHelper;
}
