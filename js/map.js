'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var PIN_HEIGHT_BEFORE = 22;
  var advertisementList = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersSelect = mapFilters.querySelectorAll('select');
  var mapPinMain = document.querySelector('.map__pin--main');
  var errorTemplate = document.querySelector('#error');
  var errorMessage = errorTemplate.content.querySelector('.error');
  var mainBlock = errorTemplate.content.querySelector('.main');
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

  var onSuccessLoad = function (data) {
    advertisements = data;
    createAdvertisements(data);
  };

  var onErrorLoad = function () {
    var Error = errorMessage.cloneNode(true);
    mainBlock.insertAdjacentElement('afterbegin', Error);
  };

  var createAdvertisements = function () {
    var fragment = document.createDocumentFragment();
    for (var m = 0; m < advertisements.length; m++) {
      var advertisementItem = window.pin.create(advertisements[m]);
      fragment.appendChild(advertisementItem);
    }
    advertisementList.appendChild(fragment);
  };

  var getMapPinMainAddress = function () {
    return window.utils.getIntegerValue(mapPinMain.style.left, pinParams.WIDTH) + ', ' + window.utils.getIntegerValue(mapPinMain.style.top, pinParams.HEIGHT * 2);
  };

  var getMapPinAddress = function () {
    return window.utils.getIntegerValue(mapPinMain.style.left, pinParams.WIDTH) + ', ' + window.utils.getIntegerValue(mapPinMain.style.top, (pinParams.HEIGHT - PIN_HEIGHT_BEFORE));
  };

  var deactivateMap = function () {
    map.classList.add('map--faded');
  };

  window.form.setAddress(getMapPinAddress());

  var onMapPinMainClick = function () {
    // Удаляем у блока .map класс .map--faded
    classRemove(map, 'map--faded');
    window.form.activateAdForm();
    for (var l = 0; l < mapFiltersSelect.length; l++) {
      mapFiltersSelect[l].removeAttribute('disabled');
    }
    window.form.setAddress(getMapPinMainAddress());
  };

  var mapFiltersSelectDisabled = function () { // Делает неактивными поля формы на карте в неактивном режиме
    for (var m = 0; m < mapFiltersSelect.length; m++) {
      mapFiltersSelect[m].setAttribute('disabled', 'disabled');
    }
  };

  mapFilters.classList.add('disabled'); // Добавляем класс disabled полям mapFilters
  mapFiltersSelectDisabled();

  mapPinMain.addEventListener('click', onMapPinMainClick);

  mapPinMain.addEventListener('click', function (evt) { // переводим страницу в активный режим при нажатии на enter
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
      var getButtonPinAddress = function () {
        return buttonPinCoords.x + ', ' + buttonPinCoords.y;
      };
      window.form.setAddress(getButtonPinAddress());
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
    window.backend.load(onSuccessLoad, onErrorLoad);
  });

  window.map = {
    getMainAddress: getMapPinMainAddress,
    getAddress: getMapPinAddress,
    deactivate: deactivateMap,
    mapFiltersSelectDisabled: mapFiltersSelectDisabled
  };
})();
