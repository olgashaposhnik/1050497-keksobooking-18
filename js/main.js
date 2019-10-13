'use strict';
var titles = ['квартира в Токио', 'аппартаменты Москва', 'Комната в Париже', '3-х комнатная квартира в Риге', 'комната в Санкт-Петербурге', 'домик в Севастополе', 'квартира в Донецке', 'аппартаменты в Берлине'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var descriptions = ['описание 1', 'описание 2', 'описание 3', 'описание 4', 'описание 5', 'описание 6', 'описание 7', 'описание 8'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var createRandomFeatures = function () {
  var featureNumbers = []; // создаем массив с номерами опций в комнатах
  var featuresQuantity = getRandomInt(0, features.length); // сгенерировали количество преимуществ в объявлении
  for (var i = 0; i < featuresQuantity; i++) { // запускаем цикл с количеством итераций равным количеству запланированных преимуществ в отеле
    while (featureNumbers.length < featuresQuantity) { // бесконечный цикл, который прерывается только, когда мы наполним свой массив достаточным количеством преимуществ
      var featureNumber = getRandomInt(0, features.length - 1); // Создаем случайный индекс для массива features
      // По этому индексу ищем элемент массива features .Если в нашем массиве featureNumbers
      // нет такого элемента, тогда добавляем его. Иначе запускаем новую итерацию бесконечного цикла
      if (featureNumbers.indexOf(features[featureNumber]) === -1) {
        featureNumbers.push(features[featureNumber]);
      }
    }
  }
  // Возвращаем созданный массив
  return featureNumbers;
};

var createRandomPhotos = function () {
  var photoNumbers = []; // создаем массив с номерами фото из массива
  var photosQuantity = getRandomInt(0, photos.length); // сгенерировали количество фотографий в объявлении
  for (var i = 0; i < photosQuantity; i++) { // запускаем цикл с количеством итераций равным количеству запланированных фото отеля
    while (photoNumbers.length < photosQuantity) { // бесконечный цикл, который прерывается только, когда мы наполним свой массив достаточным количеством фото
      var photoNumber = getRandomInt(0, photos.length - 1); // Создаем случайный индекс для массива photos
      /*
        По этому индексу ищем элемент массива photos
        Если в нашем массиве photosNumbers нет такого элемента, тогда добавляем его
        Иначе запускаем новую итерацию бесконечного цикла
      */
      if (photoNumbers.indexOf(photos[photoNumber]) === -1) {
        photoNumbers.push(photos[photoNumber]);
      }
    }
  }
  // Возвращаем созданный массив
  return photoNumbers;
};

var createObjectCard = function () {
  var resultObject = {};
  resultObject.author = {};
  resultObject.author.avatar = 'img/avatars/user0' + getRandomInt(1, 8) + '.png';
  resultObject.offer = {};
  resultObject.offer.title = titles[Math.floor(Math.random() * titles.length)];
  resultObject.offer.address = getRandomInt(0, 800) + ', ' + getRandomInt(0, 800);
  resultObject.offer.price = getRandomInt(1000, 10000);
  resultObject.offer.type = types[Math.floor(Math.random() * types.length)];
  resultObject.offer.rooms = getRandomInt(1, 4);
  resultObject.offer.guests = getRandomInt(1, 10);
  resultObject.offer.checkin = checkins[Math.floor(Math.random() * checkins.length)];
  resultObject.offer.checkout = checkouts[Math.floor(Math.random() * checkouts.length)];
  resultObject.offer.features = createRandomFeatures();
  resultObject.offer.description = descriptions[Math.floor(Math.random() * descriptions.length)];
  resultObject.offer.photos = createRandomPhotos();
  resultObject.location = {};
  resultObject.location.x = getRandomInt(0, 1200); // размеры блока взяла
  resultObject.location.y = getRandomInt(130, 630);
  return resultObject;
};

var advertisements = [];
for (i = 0; i < 8; i++) {
  advertisements[i] = createObjectCard();
}

// Удаляем у блока .map класс .map--faded
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var makeElement = function (tagName, className) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

var createButton = function (resultObject) {
  var buttonItem = makeElement('button', 'map__pin');
  buttonItem.style = 'left:' + (resultObject.location.x - 31) + 'px; top:' + (resultObject.location.y - 84) + 'px;'; // длина метки 84px, отнимаем ее, чтобы на место на карте метка указывала своим острым концом
  // ширина метки 62px, отнимаем половину, чтобы на место на карте метка указывала своим острым концом

  var picture = makeElement('img', 'advertisement__image');
  picture.src = resultObject.author.avatar;
  picture.alt = resultObject.offer.title;
  buttonItem.appendChild(picture);
  return buttonItem;
};

var advertisementList = document.querySelector('.map__pins');

for (var i = 0; i < advertisements.length; i++) {
  var advertisementItem = createButton(advertisements[i]);
  advertisementList.appendChild(advertisementItem);
}
