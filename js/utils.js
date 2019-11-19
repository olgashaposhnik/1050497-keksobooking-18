'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300; // ms

  var getIntegerValue = function (value, param) {
    return Math.floor((parseInt(value, 10) + param / 2));
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    getIntegerValue: getIntegerValue,
    debounce: debounce
  };
})();
