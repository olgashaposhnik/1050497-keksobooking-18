'use strict';
var AVATARS_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];
var TITLES = ['квартира в Токио', 'аппартаменты Москва', 'Комната в Париже', '3-х комнатная квартира в Риге', 'комната в Санкт-Петербурге', 'домик в Севастополе', 'квартира в Донецке', 'аппартаменты в Берлине'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var typesKey = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
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

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomValues = function (values) {
  return values[Math.floor(Math.random() * values.length)];
};

window.getIntegerAdress = function (value, param) {
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

window.createObjectCard = function (i) {
  return {
    author: {
      avatar: 'img/avatars/user0' + AVATARS_NUMBERS[i] + '.png'
    },
    offer: {
      title: getRandomValues(TITLES),
      address: getRandomInt(screenParams.MIN_WIDTH, screenParams.MAX_WIDTH) + ', ' + getRandomInt(screenParams.MIN_HEIGHT, screenParams.MAX_HEIGHT),
      price: getRandomInt(price.MIN, price.MAX),
      type: getRandomValues(TYPES),
      rooms: getRandomInt(rooms.MIN, rooms.MAX),
      guests: getRandomInt(guests.MIN, guests.MAX),
      checkin: getRandomValues(CHECKINS),
      checkout: getRandomValues(CHECKOUTS),
      features: createRandomValues(FEATURES),
      description: getRandomValues(DESCRIPTIONS),
      photos: createRandomValues(PHOTOS),
    },
    location: {
      x: getRandomInt(screenParams.MIN_WIDTH, screenParams.MAX_WIDTH),
      y: getRandomInt(screenParams.MIN_HEIGHT, screenParams.MAX_HEIGHT),
    }
  };
};

var createFeatureFragment = function (resultObject) {
  var featureFragment = document.createDocumentFragment();
  for (var j = 0; j < adData.offer.features.length; j++) {
    var featureItem = document.createElement('li');
    featureItem.className = 'popup__feature popup__feature--' + adData.offer.features[j];
    featureFragment.appendChild(featureItem);
  }
  return featureFragment;
};

var createPhotosFragment = function (resultObject) {
  var photosFragment = document.createDocumentFragment();
  for (var t = 0; t < adData.offer.photos.length; t++) {
    var popupPhotoItem = popupPhoto.cloneNode(true);
    popupPhotoItem.src = adData.offer.photos[t];
    photosFragment.appendChild(popupPhotoItem);
  }
  return photosFragment;
};
