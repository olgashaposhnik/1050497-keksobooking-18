'use strict';

(function () {
  var PIN_HEIGHT_BEFORE = 22;
  var pinParams = {
    WIDTH: document.querySelector('.map__pin').offsetWidth,
    HEIGHT: document.querySelector('.map__pin').offsetHeight + PIN_HEIGHT_BEFORE
  };
  var mapPinTemplate = document.querySelector('#pin');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var mapCard = function () {
    return document.querySelector('.map_card');
  };

  var onButtonPinClick = function (evt) { // odl
    var optionsObject = evt.currentTarget._options; // odl
    var advertisementCard = window.card.createCard(optionsObject); // odl
    if (mapCard()) {
      mapCard().remove();
    }
    mapFiltersContainer.insertAdjacentElement('beforebegin', advertisementCard); // odl
  };

  var createButton = function (resultObject) { // клонирует пины из template
    var buttonItem = mapPinTemplate.content.cloneNode(true);
    var mapPin = buttonItem.querySelector('.map__pin');
    mapPin.style = 'left:' + (resultObject.location.x - pinParams.WIDTH / 2) + 'px; top:' + (resultObject.location.y - pinParams.HEIGHT) + 'px;'; // длина метки 84px, отнимаем ее, чтобы на место на карте метка указывала своим острым концом
    buttonItem.querySelector('img').src = resultObject.author.avatar;
    buttonItem.querySelector('img').alt = resultObject.offer.title;
    mapPin._options = resultObject; // odl
    mapPin.addEventListener('click', onButtonPinClick); // odl
    return buttonItem;
  };

  window.pin = {
    createButton: createButton
  };
})();
