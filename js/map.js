'use strict';

(function () {
  var TITLES = ['квартира в Токио', 'аппартаменты Москва', 'Комната в Париже', '3-х комнатная квартира в Риге', 'комната в Санкт-Петербурге', 'домик в Севастополе', 'квартира в Донецке', 'аппартаменты в Берлине'];
  var advertisementList = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin');
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapFiltersSelect = mapFilters.querySelectorAll('select');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adress = document.querySelector('#address');
  var advertisements = [];
  window.advertisements = advertisements;
  var ENTER_KEYCODE = 13;
  var PIN_HEIGHT_BEFORE = 22;
  var pinParams = {
    WIDTH: document.querySelector('.map__pin').offsetWidth,
    HEIGHT: document.querySelector('.map__pin').offsetHeight + PIN_HEIGHT_BEFORE
  };

  window.map = {
    createButton: function (resultObject) { // клонирует пины из template
      var buttonItem = mapPinTemplate.content.cloneNode(true);
      buttonItem.querySelector('.map__pin').style = 'left:' + (resultObject.location.x - pinParams.WIDTH / 2) + 'px; top:' + (resultObject.location.y - pinParams.HEIGHT) + 'px;'; // длина метки 84px, отнимаем ее, чтобы на место на карте метка указывала своим острым концом
      buttonItem.querySelector('img').src = resultObject.author.avatar;
      buttonItem.querySelector('img').alt = resultObject.offer.title;
      return buttonItem;
    },
    classRemove: function (element, className) {
      element.classList.remove(className);
    },
    onMapPinMainClick: function () {
      // Удаляем у блока .map класс .map--faded
      window.map.classRemove(map, 'map--faded');
      window.map.classRemove(adForm, 'ad-form--disabled');
      for (var j = 0; j < adFormFieldset.length; j++) {
        window.map.classRemove(adFormFieldset[j], 'disabled');
      }
      for (var l = 0; l < mapFiltersSelect.length; l++) {
        mapFiltersSelect[l].removeAttribute('disabled');
      }
      for (var a = 0; a < TITLES.length; a++) {
        advertisements[a] = window.data.createObjectCard(a);
      }
      var fragment = document.createDocumentFragment();
      for (var m = 0; m < advertisements.length; m++) {
        var advertisementItem = window.map.createButton(advertisements[m]);
        fragment.appendChild(advertisementItem);
        var advertisementCard = window.card.createCard(advertisements[m]);
        mapFiltersContainer.insertAdjacentElement('beforebegin', advertisementCard);
        advertisementCard.dataOptions = window.advertisements[m];
      }
      advertisementList.appendChild(fragment);
      adress.value = window.data.getIntegerValue(mapPinMain.style.left, pinParams.WIDTH) + ', ' + window.data.getIntegerValue(mapPinMain.style.top, pinParams.HEIGHT * 2);
    }
  };

  mapPinMain.addEventListener('mousedown', window.map.onMapPinMainClick);

  mapPinMain.addEventListener('keydown', function (evt) { // переводим страницу в активный режим при нажатии на энтер
    if (evt.keyCode === ENTER_KEYCODE) {
      window.map.onMapPinMainClick();
    }
  });
})();
