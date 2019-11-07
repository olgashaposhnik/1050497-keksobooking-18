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

  var createObjectCard = function (i) {
    return {
      author: {
        avatar: 'img/avatars/user0' + AVATARS_NUMBERS[i] + '.png'
      },
      offer: {
        title: window.utils.getRandomValues(TITLES),
        address: window.utils.getRandomInt(screenParams.MIN_WIDTH, screenParams.MAX_WIDTH) + ', ' + window.utils.getRandomInt(screenParams.MIN_HEIGHT, screenParams.MAX_HEIGHT),
        price: window.utils.getRandomInt(price.MIN, price.MAX),
        type: window.utils.getRandomValues(TYPES),
        rooms: window.utils.getRandomInt(rooms.MIN, rooms.MAX),
        guests: window.utils.getRandomInt(guests.MIN, guests.MAX),
        checkin: window.utils.getRandomValues(CHECKINS),
        checkout: window.utils.getRandomValues(CHECKOUTS),
        features: window.utils.createRandomValues(FEATURES),
        description: window.utils.getRandomValues(DESCRIPTIONS),
        photos: window.utils.createRandomValues(PHOTOS),
      },
      location: {
        x: window.utils.getRandomInt(screenParams.MIN_WIDTH, screenParams.MAX_WIDTH),
        y: window.utils.getRandomInt(screenParams.MIN_HEIGHT, screenParams.MAX_HEIGHT),
      }
    };
  };

  window.data = {
    createObjectCard: createObjectCard
  };
})();
