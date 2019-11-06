'use strict';

(function () {
  var PIN_HEIGHT_BEFORE = 22;
  var pinParams = {
    WIDTH: document.querySelector('.map__pin').offsetWidth,
    HEIGHT: document.querySelector('.map__pin').offsetHeight + PIN_HEIGHT_BEFORE
  };
  var mapPinTemplate = document.querySelector('#pin');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');

  window.pin = {
    createButton: function (resultObject) { // клонирует пины из template
      var buttonItem = mapPinTemplate.content.cloneNode(true);
      buttonItem.querySelector('.map__pin').style = 'left:' + (resultObject.location.x - pinParams.WIDTH / 2) + 'px; top:' + (resultObject.location.y - pinParams.HEIGHT) + 'px;'; // длина метки 84px, отнимаем ее, чтобы на место на карте метка указывала своим острым концом
      buttonItem.querySelector('img').src = resultObject.author.avatar;
      buttonItem.querySelector('img').alt = resultObject.offer.title;
      buttonItem.addEventListener('click', function () {
        var mapCard = map.querySelector('.map__card');
        if (mapCard) {
          mapCard.remove();
        }
        window.data.createObjectCard(resultObject);
        document.addEventListener('keydown', onEscDown);
      });
      /*buttonItem.addEventListener('click', onMapPinClick); // добавила!!!!!!!!!*/
      return buttonItem;
    },
    onMapPinClick: function () {
      for (var m = 0; m < window.advertisements.length; m++) {
        var advertisementCard = window.pin.createCard(window.advertisements[m]);
        mapFiltersContainer.insertAdjacentElement('beforebegin', advertisementCard);
      }
    }
    /* var onMapPinClick = function(evt) {
      console.log(evt.target.advertisements);
   };*/
  };
})();
