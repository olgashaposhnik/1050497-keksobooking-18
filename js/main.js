'use strict';
var TITLES = ['квартира в Токио', 'аппартаменты Москва', 'Комната в Париже', '3-х комнатная квартира в Риге', 'комната в Санкт-Петербурге', 'домик в Севастополе', 'квартира в Донецке', 'аппартаменты в Берлине'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['описание 1', 'описание 2', 'описание 3', 'описание 4', 'описание 5', 'описание 6', 'описание 7', 'описание 8'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 62;
var PIN_HEIGHT = 84;
var advertisementList = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var advertisements = [];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var createRandomValues = function (VALUES) {
  var valueNumbers = []; // создаем массив с номерами опций
  var valuesQuantity = getRandomInt(0, VALUES.length); // сгенерировали количество опций
  for (var i = 0; i < valuesQuantity; i++) { // запускаем цикл с количеством итераций равным количеству запланированных опций
    while (valueNumbers.length < valuesQuantity) { // бесконечный цикл, который прерывается только, когда мы наполним свой массив достаточным количеством опций
      var valueNumber = getRandomInt(0, VALUES.length - 1); // Создаем случайный индекс для массива опций
      // По этому индексу ищем элемент массива VALUES .Если в нашем массиве valueNumbers
      // нет такого элемента, тогда добавляем его. Иначе запускаем новую итерацию бесконечного цикла
      if (valueNumbers.indexOf(VALUES[valueNumber]) === -1) {
        valueNumbers.push(VALUES[valueNumber]);
      }
    }
  }
  // Возвращаем созданный массив
  return valueNumbers;
};

var createObjectCard = function () {
  return {
    author: {
      avatar:'img/avatars/user0' + getRandomInt (1, 8) + '.png'
    },
    offer: {
      title: TITLES[Math.floor(Math.random()*TITLES.length)],
      address: getRandomInt (0, 800) + ', ' +  getRandomInt (0, 800),
      price: getRandomInt (1000, 10000),
      type: TYPES[Math.floor(Math.random()*TYPES.length)],
      rooms: getRandomInt (1, 4),
      guests: getRandomInt (1, 10),
      checkin: CHECKINS[Math.floor(Math.random()*CHECKINS.length)],
      checkout: CHECKOUTS[Math.floor(Math.random()*CHECKOUTS.length)],
      features: createRandomValues(FEATURES),
      description: DESCRIPTIONS[Math.floor(Math.random()*DESCRIPTIONS.length)],
      photos: createRandomValues(PHOTOS),

    },
    location: {
      x: getRandomInt (0, 1200),
      y: getRandomInt (130, 630)
    }
  };
};

var makeElement = function (tagName, className) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

var createButton = function (resultObject) {
  var buttonItem = makeElement('button', 'map__pin');
  buttonItem.style = 'left:' + (resultObject.location.x - PIN_WIDTH/2) + 'px; top:' + (resultObject.location.y - PIN_HEIGHT) + 'px;'; // длина метки 84px, отнимаем ее, чтобы на место на карте метка указывала своим острым концом
  // ширина метки 62px, отнимаем половину, чтобы на место на карте метка указывала своим острым концом

  var picture = makeElement('img', 'advertisement__image');
  picture.src = resultObject.author.avatar;
  picture.alt = resultObject.offer.title;
  buttonItem.appendChild(picture);
  return buttonItem;
};

for (i = 0; i < 8; i++) {
  advertisements[i] = createObjectCard();
}

// Удаляем у блока .map класс .map--faded
map.classList.remove('map--faded');

for (var i = 0; i < advertisements.length; i++) {
  var advertisementItem = createButton(advertisements[i]);
  advertisementList.appendChild(advertisementItem);
}
