'use strict';

(function () {
  var typesKey = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var cardTemplate = document.querySelector('#card');
  var popupPhoto = cardTemplate.content.querySelector('.popup__photo');

  window.card = {
    createFeatureFragment: function (resultObject) {
      var featureFragment = document.createDocumentFragment();
      for (var i = 0; i < resultObject.offer.features.length; i++) {
        var featureItem = document.createElement('li');
        featureItem.className = 'popup__feature popup__feature--' + resultObject.offer.features[i];
        featureFragment.appendChild(featureItem);
      }
      return featureFragment;
    },
    createPhotosFragment: function (resultObject) {
      var photosFragment = document.createDocumentFragment();
      for (var j = 0; j < resultObject.offer.photos.length; j++) {
        var popupPhotoItem = popupPhoto.cloneNode(true);
        popupPhotoItem.src = resultObject.offer.photos[j];
        photosFragment.appendChild(popupPhotoItem);
      }
      return photosFragment;
    },
    createCard: function (resultObject) { // клонирует пины из card
      var cardItem = cardTemplate.content.cloneNode(true);
      cardItem.querySelector('.popup__title').textContent = resultObject.offer.title;
      cardItem.querySelector('.popup__text--address').textContent = resultObject.offer.address;
      cardItem.querySelector('.popup__text--price').textContent = resultObject.offer.price + '₽/ночь';
      cardItem.querySelector('.popup__type').textContent = typesKey[resultObject.offer.type];
      cardItem.querySelector('.popup__text--capacity').textContent = resultObject.offer.rooms + ' комнаты для ' + resultObject.offer.guests + ' гостей';
      cardItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + resultObject.offer.checkin + ', выезд до ' + resultObject.offer.checkout;
      cardItem.querySelector('.popup__features').innerHTML = '';
      cardItem.querySelector('.popup__features').appendChild(window.card.createFeatureFragment(resultObject));
      cardItem.querySelector('.popup__description').textContent = resultObject.offer.description;
      cardItem.querySelector('.popup__photos').removeChild(cardItem.querySelector('.popup__photo'));
      cardItem.querySelector('.popup__photos').appendChild(window.card.createPhotosFragment(resultObject));
      cardItem.querySelector('.popup__avatar').src = resultObject.author.avatar;
      return cardItem.firstElementChild;
    }
  };
})();
