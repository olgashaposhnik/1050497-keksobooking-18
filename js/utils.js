'use strict';

(function () {
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomValues = function (values) {
    return values[Math.floor(Math.random() * values.length)];
  };

  var getIntegerValue = function (value, param) {
    return Math.floor((parseInt(value, 10) + param / 2));
  };

  var createRandomValues = function (values) {
    var valueNumbers = []; // создаем массив с номерами опций
    var valuesQuantity = getRandomInt(0, values.length); // сгенерировали количество опций
    for (var i = 0; i < valuesQuantity; i++) { // запускаем цикл с количеством итераций равным количеству запланированных опций
      while (valueNumbers.length < valuesQuantity) { // бесконечный цикл, который прерывается только, когда мы наполним свой массив достаточным количеством опций
        var valueNumber = getRandomInt(0, values.length - 1); // Создаем случайный индекс для массива опций
        // По этому индексу ищем элемент массива values .Если в нашем массиве valueNumbers
        // нет такого элемента, тогда добавляем его. Иначе запускаем новую итерацию бесконечного цикла
        if (valueNumbers.indexOf(values[valueNumber]) === -1) {
          valueNumbers.push(values[valueNumber]);
        }
      }
    }
    // Возвращаем созданный массив
    return valueNumbers;
  };

  var utils = {
    getRandomInt: getRandomInt,
    getRandomValues: getRandomValues,
    getIntegerValue: getIntegerValue,
    createRandomValues: createRandomValues
  };

  window.utils = utils;
})();
