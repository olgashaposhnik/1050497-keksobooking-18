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
  window.advertisements = advertisements;
  /* var screenIndent = 70;
   var screenParams = {
    MIN_WIDTH: 70,
    MAX_WIDTH: document.querySelector('.map').offsetWidth - screenIndent,
    MIN_HEIGHT: 130,
    MAX_HEIGHT: 630,
  };*/
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
      advertisements[a] = window.data.createObjectCard(a);
    }
    var fragment = document.createDocumentFragment();
    for (var m = 0; m < advertisements.length; m++) {
      var advertisementItem = window.pin.createButton(advertisements[m]);
      fragment.appendChild(advertisementItem);
    }
    advertisementList.appendChild(fragment);
    adress.value = window.utils.getIntegerValue(mapPinMain.style.left, pinParams.WIDTH) + ', ' + window.utils.getIntegerValue(mapPinMain.style.top, pinParams.HEIGHT * 2);
  };

  mapPinMain.addEventListener('mousedown', onMapPinMainClick);

  mapPinMain.addEventListener('keydown', function (evt) { // переводим страницу в активный режим при нажатии на энтер
    if (evt.keyCode === ENTER_KEYCODE) {
      onMapPinMainClick();
    }
  });

  /*
  mapPinMain.addEventListener('mousedown', function (evt) {
    moveEvt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    var mapPinMainPosition = {
      x: mapPinMain.offsetLeft - shift.x,
      y: mapPinMain.offsetTop - shift.y
    };
    var moveLimit = {
      LEFT: screenParams.MIN_WIDTH,
      TOP: screenParams.MAX_HEIGHT - pinParams.HEIGHT,
      RIGHT: screenParams.MAX_WIDTH - pinParams.WIDTH,
      BOTTOM: DragLimit.Y.MAX - mapPinMain.offsetHeight - TAIL_HEIGHT
    };
_______________________
    moveEvt.preventDefault();
_______________________
    var Border = {
      TOP: DragLimit.Y.MIN - mapPinMain.offsetHeight - TAIL_HEIGHT,
      BOTTOM: DragLimit.Y.MAX - mapPinMain.offsetHeight - TAIL_HEIGHT,
      LEFT: DragLimit.X.MIN,
      RIGHT: DragLimit.X.MAX - mapPinMain.offsetWidth
    };
    if (mapPinMainPosition.x >= Border.LEFT && mapPinMainPosition.x <= Border.RIGHT) {
      mapPinMain.style.left = mapPinMainPosition.x + 'px';
    }
    if (mapPinMainPosition.y >= Border.TOP && mapPinMainPosition.y <= Border.BOTTOM) {
      mapPinMain.style.top = mapPinMainPosition.y + 'px';
    }
    var pinTailCoords = {
      x: mapPinMainPosition.x + Math.ceil(PinSize.WIDTH / 2),
      y: mapPinMainPosition.y + PinSize.HEIGHT + TAIL_HEIGHT
    };
    window.form.setAddress(pinTailCoords);
  };
__________________
  document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });*/
})();
