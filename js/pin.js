'use strict';

(function () {
  var PIN_HEIGHT_BEFORE = 22;
  var pinParams = {
    WIDTH: document.querySelector('.map__pin').offsetWidth,
    HEIGHT: document.querySelector('.map__pin').offsetHeight + PIN_HEIGHT_BEFORE
  };
  var mapPinTemplate = document.querySelector('#pin');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  window.pin = {
    createButton: function (resultObject) { // клонирует пины из template
      var buttonItem = mapPinTemplate.content.cloneNode(true);
      buttonItem.querySelector('.map__pin').style = 'left:' + (resultObject.location.x - pinParams.WIDTH / 2) + 'px; top:' + (resultObject.location.y - pinParams.HEIGHT) + 'px;'; // длина метки 84px, отнимаем ее, чтобы на место на карте метка указывала своим острым концом
      buttonItem.querySelector('img').src = resultObject.author.avatar;
      buttonItem.querySelector('img').alt = resultObject.offer.title;
      return buttonItem;
    },
    onMapPinClick: function () {
      for (var m = 0; m < window.advertisements.length; m++) {
        var advertisementCard = window.card.createCard(window.advertisements[m]);
        mapFiltersContainer.insertAdjacentElement('beforebegin', advertisementCard);
        advertisementCard.dataOptions = window.advertisements[m];
      }
    }
  };
})();
