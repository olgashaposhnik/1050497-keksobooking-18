'use strict';
var PIN_HEIGHT_BEFORE = 22;
var pinParams = {
  WIDTH: document.querySelector('.map__pin').offsetWidth,
  HEIGHT: document.querySelector('.map__pin').offsetHeight + PIN_HEIGHT_BEFORE
};
var typesKey = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var mapPinTemplate = document.querySelector('#pin');
var cardTemplate = document.querySelector('#card');
var popupPhoto = cardTemplate.content.querySelector('.popup__photo');

window.createButton = function (resultObject) { // клонирует пины из template
  var buttonItem = mapPinTemplate.content.cloneNode(true);
  buttonItem.querySelector('.map__pin').style = 'left:' + (resultObject.location.x - pinParams.WIDTH / 2) + 'px; top:' + (resultObject.location.y - pinParams.HEIGHT) + 'px;'; // длина метки 84px, отнимаем ее, чтобы на место на карте метка указывала своим острым концом
  buttonItem.querySelector('img').src = resultObject.author.avatar;
  buttonItem.querySelector('img').alt = resultObject.offer.title;
  return buttonItem;
};

var createFeatureFragment = function (resultObject) {
  var featureFragment = document.createDocumentFragment();
  for (var i = 0; i < resultObject.offer.features.length; i++) {
    var featureItem = document.createElement('li');
    featureItem.className = 'popup__feature popup__feature--' + resultObject.offer.features[i];
    featureFragment.appendChild(featureItem);
  }
  return featureFragment;
};

var createPhotosFragment = function (resultObject) {
  var photosFragment = document.createDocumentFragment();
  for (var j = 0; j < resultObject.offer.photos.length; j++) {
    var popupPhotoItem = popupPhoto.cloneNode(true);
    popupPhotoItem.src = resultObject.offer.photos[j];
    photosFragment.appendChild(popupPhotoItem);
  }
  return photosFragment;
};

window.createCard = function (resultObject) { // клонирует пины из card
  var cardItem = cardTemplate.content.cloneNode(true);
  console.log(cardItem)
  cardItem.querySelector('.popup__title').textContent = resultObject.offer.title;
  cardItem.querySelector('.popup__text--address').textContent = resultObject.offer.address;
  cardItem.querySelector('.popup__text--price').textContent = resultObject.offer.price + '₽/ночь';
  cardItem.querySelector('.popup__type').textContent = typesKey[resultObject.offer.type];
  cardItem.querySelector('.popup__text--capacity').textContent = resultObject.offer.rooms + ' комнаты для ' + resultObject.offer.guests + ' гостей';
  cardItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + resultObject.offer.checkin + ', выезд до ' + resultObject.offer.checkout;
  cardItem.querySelector('.popup__features').innerHTML = '';
  cardItem.querySelector('.popup__features').appendChild(createPhotosFragment(resultObject));
  cardItem.querySelector('.popup__description').textContent = resultObject.offer.description;
  cardItem.querySelector('.popup__photos').removeChild(cardItem.querySelector('.popup__photo'));
  cardItem.querySelector('.popup__photos').appendChild(createPhotosFragment(resultObject));
  cardItem.querySelector('.popup__avatar').src = resultObject.author.avatar;
  return cardItem;
};

for (var i = 0; i < advertisements.length; i++) {
  var advertisementCard = createCard(advertisements[i]);
  advertisementCard.before('.map__filters-container');
}
