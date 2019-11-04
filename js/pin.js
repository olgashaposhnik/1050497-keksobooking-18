'use strict';
var PIN_HEIGHT_BEFORE = 22;
var pinParams = {
  WIDTH: document.querySelector('.map__pin').offsetWidth,
  HEIGHT: document.querySelector('.map__pin').offsetHeight + PIN_HEIGHT_BEFORE
};
var mapPinTemplate = document.querySelector('#pin');
var cardTemplate = document.querySelector('#card');

window.createButton = function (resultObject) { // клонирует пины из template
  var buttonItem = mapPinTemplate.content.cloneNode(true);
  buttonItem.querySelector('.map__pin').style = 'left:' + (resultObject.location.x - pinParams.WIDTH / 2) + 'px; top:' + (resultObject.location.y - pinParams.HEIGHT) + 'px;'; // длина метки 84px, отнимаем ее, чтобы на место на карте метка указывала своим острым концом
  buttonItem.querySelector('img').src = resultObject.author.avatar;
  buttonItem.querySelector('img').alt = resultObject.offer.title;
  return buttonItem;
};

window.createCard = function (resultObject) { // клонирует пины из card
  var cardItem = cardTemplate.content.cloneNode(true);
  cardItem.querySelector('.popup__title').textContent = resultObject.offer.title;
  cardItem.querySelector('.popup__text--address').textContent = resultObject.offer.address;
  cardItem.querySelector('popup__text--price').textContent = resultObject.offer.price + '₽/ночь';
  cardItem.querySelector('popup__type').textContent = typesKey[resultObject.offer.type];
  cardItem.querySelector('popup__text--capacity').textContent = resultObject.offer.rooms + ' комнаты для ' + resultObject.offer.guests + ' гостей';
  cardItem.querySelector('popup__text--time').textContent = 'Заезд после ' + resultObject.offer.checkin + ', выезд до ' + resultObject.offer.checkout;
  cardItem.querySelector('popup__features').textContent = resultObject.offer.features;
  cardItem.querySelector('popup__description').textContent = resultObject.offer.description;
  cardItem.querySelector('popup__photos').textContent = resultObject.offer.description;
  return cardItem;
};
