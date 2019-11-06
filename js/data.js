'use strict';

(function () {
  var AVATARS_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];
  var TITLES = ['квартира в Токио', 'аппартаменты Москва', 'Комната в Париже', '3-х комнатная квартира в Риге', 'комната в Санкт-Петербурге', 'домик в Севастополе', 'квартира в Донецке', 'аппартаменты в Берлине'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['описание 1', 'описание 2', 'описание 3', 'описание 4', 'описание 5', 'описание 6', 'описание 7', 'описание 8'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var screenIndent = 70;
  var screenParams = {
    MIN_WIDTH: 70,
    MAX_WIDTH: document.querySelector('.map').offsetWidth - screenIndent,
    MIN_HEIGHT: 130,
    MAX_HEIGHT: 630,
  };
  var price = {
    MIN: 1000,
    MAX: 10000
  };
  var rooms = {
    MIN: 1,
    MAX: 4
  };
  var guests = {
    MIN: 1,
    MAX: 10
  };

  window.data = {
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomValues: function (values) {
      return values[Math.floor(Math.random() * values.length)];
    },
    getIntegerValue: function (value, param) {
      return Math.floor((parseInt(value, 10) + param / 2));
    },
    createRandomValues: function (values) {
      var valueNumbers = []; // создаем массив с номерами опций
      var valuesQuantity = window.data.getRandomInt(0, values.length); // сгенерировали количество опций
      for (var i = 0; i < valuesQuantity; i++) { // запускаем цикл с количеством итераций равным количеству запланированных опций
        while (valueNumbers.length < valuesQuantity) { // бесконечный цикл, который прерывается только, когда мы наполним свой массив достаточным количеством опций
          var valueNumber = window.data.getRandomInt(0, values.length - 1); // Создаем случайный индекс для массива опций
          // По этому индексу ищем элемент массива values .Если в нашем массиве valueNumbers
          // нет такого элемента, тогда добавляем его. Иначе запускаем новую итерацию бесконечного цикла
          if (valueNumbers.indexOf(values[valueNumber]) === -1) {
            valueNumbers.push(values[valueNumber]);
          }
        }
      }
      // Возвращаем созданный массив
      return valueNumbers;
    },
    createObjectCard: function (i) {
      return {
        author: {
          avatar: 'img/avatars/user0' + AVATARS_NUMBERS[i] + '.png'
        },
        offer: {
          title: window.data.getRandomValues(TITLES),
          address: window.data.getRandomInt(screenParams.MIN_WIDTH, screenParams.MAX_WIDTH) + ', ' + window.data.getRandomInt(screenParams.MIN_HEIGHT, screenParams.MAX_HEIGHT),
          price: window.data.getRandomInt(price.MIN, price.MAX),
          type: window.data.getRandomValues(TYPES),
          rooms: window.data.getRandomInt(rooms.MIN, rooms.MAX),
          guests: window.data.getRandomInt(guests.MIN, guests.MAX),
          checkin: window.data.getRandomValues(CHECKINS),
          checkout: window.data.getRandomValues(CHECKOUTS),
          features: window.data.createRandomValues(FEATURES),
          description: window.data.getRandomValues(DESCRIPTIONS),
          photos: window.data.createRandomValues(PHOTOS),
        },
        location: {
          x: window.data.getRandomInt(screenParams.MIN_WIDTH, screenParams.MAX_WIDTH),
          y: window.data.getRandomInt(screenParams.MIN_HEIGHT, screenParams.MAX_HEIGHT),
        }
      };
    }
  };
})();
