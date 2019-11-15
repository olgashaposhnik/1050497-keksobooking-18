'use strict';

(function () {
  var URL = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };
  var SUCCESS_SERVER_CODE = 200;
  var TIMEOUT = 10000;

  var request = function (method, url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_SERVER_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT; // 10s
    xhr.open(method, url);
    return xhr;
  };

  var load = function (onSuccess, onError) {
    request('GET', URL.LOAD, onSuccess, onError).send();
  };

  var upload = function (onSuccess, onError, data) {
    request('POST', URL.UPLOAD, onSuccess, onError).send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
