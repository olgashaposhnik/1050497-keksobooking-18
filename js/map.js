'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var PIN_HEIGHT_BEFORE = 22;
  var TITLES = ['квартира в Токио', 'аппартаменты Москва', 'Комната в Париже', '3-х комнатная квартира в Риге', 'комната в Санкт-Петербурге', 'домик в Севастополе', 'квартира в Донецке', 'аппартаменты в Берлине'];
  var advertisementList = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersSelect = mapFilters.querySelectorAll('select');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adress = document.querySelector('#address');
  var advertisements = [];
  var screenIndent = 70;
  var screenParams = {
    MIN_WIDTH: 70,
    MAX_WIDTH: document.querySelector('.map').offsetWidth - screenIndent,
    MIN_HEIGHT: 130,
    MAX_HEIGHT: 630,
  };
  var pinParams = {
    WIDTH: document.querySelector('.map__pin').offsetWidth,
    HEIGHT: document.querySelector('.map__pin').offsetHeight + PIN_HEIGHT_BEFORE
  };

  var classRemove = function (element, className) {
    element.classList.remove(className);
  };

  var onMapPinMainClick = function () {
    // Удаляем у блока .map класс .map--faded
    classRemove(map, 'map--faded');
    classRemove(adForm, 'ad-form--disabled');
    for (var j = 0; j < adFormFieldset.length; j++) {
      classRemove(adFormFieldset[j], 'disabled');
    }
    for (var l = 0; l < mapFiltersSelect.length; l++) {
      mapFiltersSelect[l].removeAttribute('disabled');
    }
    for (var a = 0; a < TITLES.length; a++) {
      advertisements[a] = window.data.create(a);
    }
    var fragment = document.createDocumentFragment();
    for (var m = 0; m < advertisements.length; m++) {
      var advertisementItem = window.pin.create(advertisements[m]);
      fragment.appendChild(advertisementItem);
    }
    advertisementList.appendChild(fragment);
    adress.value = window.utils.getIntegerValue(mapPinMain.style.left, pinParams.WIDTH) + ', ' + window.utils.getIntegerValue(mapPinMain.style.top, pinParams.HEIGHT * 2);
  };

  adress.value = window.utils.getIntegerValue(mapPinMain.style.left, pinParams.WIDTH) + ', ' + window.utils.getIntegerValue(mapPinMain.style.top, (pinParams.HEIGHT - PIN_HEIGHT_BEFORE));
  adress.setAttribute('readonly', 'true');

  var mapFiltersSelectDisabled = function () { // Делает неактивными поля формы на карте в неактивном режиме
    for (var m = 0; m < mapFiltersSelect.length; m++) {
      mapFiltersSelect[m].setAttribute('disabled', 'disabled');
    }
  };

  mapFilters.classList.add('disabled'); // Добавляем класс disabled полям mapFilters
  
  mapFiltersSelectDisabled();

  mapPinMain.addEventListener('click', onMapPinMainClick);

  mapPinMain.addEventListener('click', function (evt) { // переводим страницу в активный режим при нажатии на энтер
    if (evt.keyCode === ENTER_KEYCODE) {
      onMapPinMainClick();
    }
    mapPinMain.removeEventListener('click', onMapPinMainClick);
  });

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var mapPinMainPosition = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };
      var moveLimit = {
        LEFT: screenParams.MIN_WIDTH,
        TOP: screenParams.MAX_HEIGHT,
        RIGHT: screenParams.MAX_WIDTH - pinParams.WIDTH,
        BOTTOM: screenParams.MIN_HEIGHT
      };
      if (mapPinMainPosition.x >= moveLimit.LEFT && mapPinMainPosition.x <= moveLimit.RIGHT) {
        mapPinMain.style.left = mapPinMainPosition.x + 'px';
      }
      if (mapPinMainPosition.y <= moveLimit.TOP && mapPinMainPosition.y >= moveLimit.BOTTOM) {
        mapPinMain.style.top = mapPinMainPosition.y + 'px';
      }
      var buttonPinCoords = {
        x: window.utils.getIntegerValue(mapPinMainPosition.x, pinParams.WIDTH),
        y: window.utils.getIntegerValue(mapPinMainPosition.y, pinParams.HEIGHT * 2)
      };
      adress.value = buttonPinCoords.x + ', ' + buttonPinCoords.y;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (event) {
          event.preventDefault();
          mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        mapPinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
