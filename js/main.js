'use strict';
/*
var AVATARS_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];
var TITLES = ['квартира в Токио', 'аппартаменты Москва', 'Комната в Париже', '3-х комнатная квартира в Риге', 'комната в Санкт-Петербурге', 'домик в Севастополе', 'квартира в Донецке', 'аппартаменты в Берлине'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['описание 1', 'описание 2', 'описание 3', 'описание 4', 'описание 5', 'описание 6', 'описание 7', 'описание 8'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
*/
var PIN_HEIGHT_BEFORE = 22;
var pinParams = {
  WIDTH: document.querySelector('.map__pin').offsetWidth,
  HEIGHT: document.querySelector('.map__pin').offsetHeight + PIN_HEIGHT_BEFORE
};
/*
var screenParams = {
  MIN_WIDTH: 0,
  MAX_WIDTH: document.querySelector('.map').offsetWidth,
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
};*/
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var adFormFieldset = adForm.querySelectorAll('fieldset');
var mapFilters = document.querySelector('.map__filters');
var mapPinMain = document.querySelector('.map__pin--main');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var adress = document.querySelector('#address');
var ENTER_KEYCODE = 13;
var capacityOptionsObj = {
  '1': ['0', '2', '3'],
  '2': ['0', '3'],
  '3': ['0'],
  '100': ['1', '2', '3']
};
/*
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomValues = function (values) {
  return values[Math.floor(Math.random() * values.length)];
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
};*/

/*
var createObjectCard = function () {
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

var makeElement = function (tagName, className) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};*/

/*
var createButton = function (resultObject) {
  var buttonItem = makeElement('button', 'map__pin');
  buttonItem.style = 'left:' + (resultObject.location.x + pinParams.WIDTH / 2) + 'px; top:' + (resultObject.location.y + pinParams.HEIGHT) + 'px;'; // длина метки 84px, отнимаем ее, чтобы на место на карте метка указывала своим острым концом
  // ширина метки 62px, отнимаем половину, чтобы на место на карте метка указывала своим острым концом

  var picture = makeElement('img', 'advertisement__image');
  picture.src = resultObject.author.avatar;
  picture.alt = resultObject.offer.title;
  buttonItem.appendChild(picture);
  return buttonItem;
};*/

for (var i = 0; i < adFormFieldset.length; i++) {
  adFormFieldset[i].classList.add('disabled'); // Добавляем класс disabled полям adFormFieldset
}
mapFilters.classList.add('disabled'); // Добавляем класс disabled полям mapFilters

var classRemove = function (element, className) {
  element.classList.remove(className);
};

adress.value = Math.floor((parseInt(mapPinMain.style.left, 10) + pinParams.WIDTH / 2)) + ', ' + Math.floor((parseInt(mapPinMain.style.top, 10) + (pinParams.HEIGHT - PIN_HEIGHT_BEFORE) / 2));

var onMapPinMainClick = function () {
  // Удаляем у блока .map класс .map--faded
  classRemove(map, 'map--faded');
  classRemove(adForm, 'ad-form--disabled');
  for (var j = 0; j < adFormFieldset.length; j++) {
    classRemove(adFormFieldset[j], 'disabled');
  }
  classRemove(mapFilters, 'disabled');
  adress.value = Math.floor((parseInt(mapPinMain.style.left, 10) + pinParams.WIDTH / 2)) + ', ' + Math.floor((parseInt(mapPinMain.style.top, 10) + pinParams.HEIGHT));
};

mapPinMain.addEventListener('mousedown', onMapPinMainClick);

mapPinMain.addEventListener('keydown', function (evt) { // переводим страницу в активный режим при нажатии на энтер
  if (evt.keyCode === ENTER_KEYCODE) {
    onMapPinMainClick();
  }
});

roomNumber.addEventListener('change', function (evt) { // Устанавливаем соответствие количества комнат количеству гостей
  var key = evt.currentTarget.value; // cледим за выбранным количеством комнат
  var disabledOptions = capacityOptionsObj[key]; // disabledOptions - value из capacity
  for (var k = 0; k < capacity.options.length; k++) {
    if (disabledOptions.includes(capacity.options[k].value)) {
      capacity.options[k].disabled = true;
    } else {
      capacity.options[k].disabled = false;
    }
  }
});

/* Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом, что при выборе
количества комнат вводятся ограничения на допустимые варианты выбора количества гостей:
1 комната — «для 1 гостя»;
2 комнаты — «для 2 гостей» или «для 1 гостя»;
3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
100 комнат — «не для гостей».*/
