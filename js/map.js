'use strict';

(function () {
  var PIN_HEIGHT_BEFORE = 22;
  var PINS_LIMIT = 5;
  var advertisementList = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersSelect = mapFilters.querySelectorAll('select');
  var mapPinMain = document.querySelector('.map__pin--main');
  var errorTemplate = document.querySelector('#error');
  var errorMessage = errorTemplate.content.querySelector('.error');
  var mainBlock = errorTemplate.content.querySelector('.main');
  var filters = document.querySelector('.map__filters');
  var typeSelect = filters.querySelector('#housing-type');
  var priceSelect = filters.querySelector('#housing-price');
  var roomsSelect = filters.querySelector('#housing-rooms');
  var guestsSelect = filters.querySelector('#housing-guests');
  var featuresFieldset = filters.querySelector('#housing-features');
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
  var PriceRange = {
    LOW: {
      MIN: 0,
      MAX: 10000
    },
    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },
    HIGH: {
      MIN: 50000,
      MAX: Infinity
    }
  };
  var filterOptions = {
    type: null,
    price: null,
    rooms: null,
    guests: null,
    features: null
  };

  var classRemove = function (element, className) {
    element.classList.remove(className);
  };

  var onSuccessLoad = function (data) {
    advertisements = data;
    filteredData(data);
    // createAdvertisements(data);
  };

  var onErrorLoad = function () {
    var Error = errorMessage.cloneNode(true);
    mainBlock.insertAdjacentElement('afterbegin', Error);
  };

  var createAdvertisements = function (items) {
    var fragment = document.createDocumentFragment();
    for (var m = 0; m < items.length; m++) {
      var advertisementItem = window.pin.create(items[m]);
      fragment.appendChild(advertisementItem);
    }
    advertisementList.appendChild(fragment);
    // cleanAdvertisementList(); // очищаем карту от ранее созданных пинов
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
    window.backend.load(onSuccessLoad, onErrorLoad);
  };

  var mapFiltersSelectDisabled = function () { // Делает неактивными поля формы на карте в неактивном режиме
    for (var m = 0; m < mapFiltersSelect.length; m++) {
      mapFiltersSelect[m].setAttribute('disabled', 'disabled');
    }
  };

  var cleanAdvertisementList = function () { // функция, которая очищает область от старых пинов
    Array.from(advertisementList.querySelectorAll('.map__pin:not(.map__pin--main)')).forEach(function (item) {
      item.remove();
    });
  };

  var getCheckedInputValues = function () {
    var checkedFeatures = featuresFieldset.querySelectorAll('input:checked');
    return Array.from(checkedFeatures).map(function (item) {
      return item.value;
    });
  };

  var updateFilterOptions = function () {
    filterOptions.type = typeSelect.value;
    filterOptions.price = priceSelect.value;
    filterOptions.rooms = parseInt(roomsSelect.value, 10);
    filterOptions.guests = parseInt(guestsSelect.value, 10);
    filterOptions.features = getCheckedInputValues();
  };

  var filterSelects = function (data) {
    Object.keys(filterOptions).forEach(function (key) { // Object.keys(filterOptions - создает массив с ключами объекта filterOptions В нашем случае это будет ['type', 'rooms']. Проходимся в цикле по нашему массиву
    // если выбрано значение 'any' или у нас получился какой-нибудь NaN или просто неопределенное значение - пропускаем ход
      if (filterOptions[key] === 'any' || !filterOptions[key]) {
        return;
      } else if (key === 'type' || key === 'rooms' || key === 'guests') { // если изменения были в соответствующих селектах
        data = data.filter(function (item) { // фильтруем массив!
          return item.offer[key] === filterOptions[key]; // и оставляем в нем только те объекты, которые совпадают с выбранными в фильтре данными
        });
      }
    });
  };

  var filterFeatures = function (data) {
    Object.keys(filterOptions).forEach(function (key) { // Object.keys(filterOptions - создает массив с ключами объекта filterOptions В нашем случае это будет ['type', 'rooms']. Проходимся в цикле по нашему массиву
    // если выбрано значение 'any' или у нас получился какой-нибудь NaN или просто неопределенное значение - пропускаем ход
      if (filterOptions[key] === 'any' || !filterOptions[key]) {
        return;
      } else if (key === 'features') {
        data = data.filter(function (item) {
          return filterOptions[key].every(
              function (adv) {
                return item.offer[key].includes(adv);
              }
          );
        });
      }
    });
  };

  var filterPrice = function (data) {
    Object.keys(filterOptions).forEach(function (key) { // Object.keys(filterOptions - создает массив с ключами объекта filterOptions В нашем случае это будет ['type', 'rooms']. Проходимся в цикле по нашему массиву
    // если выбрано значение 'any' или у нас получился какой-нибудь NaN или просто неопределенное значение - пропускаем ход
      if (filterOptions[key] === 'any' || !filterOptions[key]) {
        return;
      } else if (key === 'price') {
        var filteredPrice = filterOptions[key].toUpperCase(); // перевели значение выбранного фильтра в верхний регистр
        data = data.filter(function (item) {
          return item.offer[key] >= PriceRange[filteredPrice].MIN && item.offer[key] <= PriceRange[filteredPrice].MAX;
        });
      }
    });
  };

  var filteredData = function (data) { // функция, которая фильтрует объявления
    // Object.keys(filterOptions).forEach(function (key) { // Object.keys(filterOptions - создает массив с ключами объекта filterOptions В нашем случае это будет ['type', 'rooms']. Проходимся в цикле по нашему массиву
    // // если выбрано значение 'any' или у нас получился какой-нибудь NaN или просто неопределенное значение - пропускаем ход
    //   if (filterOptions[key] === 'any' || !filterOptions[key]) {
    //     return;
    //   } else if (key === 'type' || key === 'rooms' || key === 'guests') { // если изменения были в соответствующих селектах
    //     data = data.filter(function (item) { // фильтруем массив!
    //       return item.offer[key] === filterOptions[key]; // и оставляем в нем только те объекты, которые совпадают с выбранными в фильтре данными
    //     });
    //   } else if (key === 'features') {
    //     data = data.filter(function (item) {
    //       return filterOptions[key].every(
    //           function (adv) {
    //             return item.offer[key].includes(adv);
    //           }
    //       );
    //     });
    //   } else if (key === 'price') {
    //     var filterPrice = filterOptions[key].toUpperCase(); // перевели значение выбранного фильтра в верхний регистр
    //     data = data.filter(function (item) {
    //       return item.offer[key] >= PriceRange[filterPrice].MIN && item.offer[key] <= PriceRange[filterPrice].MAX;
    //     });
    //   }
    // });
    cleanAdvertisementList();
    window.utils.debounce(createAdvertisements(data.filter(function () {
      return filterSelects(data) && filterPrice(data) && filterFeatures(data);
    }).slice(0, PINS_LIMIT)));
    // createAdvertisements((filterSelects(data)) && (filterPrice(data)) && (filterFeatures(data))).slice(0, PINS_LIMIT);
    // createAdvertisements(data.slice(0, PINS_LIMIT));
  };

  mapFilters.addEventListener('change', function () { // добавляем обработчик события изменения формы
    updateFilterOptions();
    // после того, как обновили - запускам загрузку данных с сервера, и при успешной загрузке - фильтруем их
    window.backend.load(filteredData, onErrorLoad);
  });

  mapFilters.classList.add('disabled'); // Добавляем класс disabled полям mapFilters
  mapFiltersSelectDisabled();

  mapPinMain.addEventListener('click', onMapPinMainClick);

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
  });

  window.map = {
    getMainAddress: getMapPinMainAddress,
    getAddress: getMapPinAddress,
    deactivate: deactivateMap,
    mapFiltersSelectDisabled: mapFiltersSelectDisabled,
    createAdvertisements: createAdvertisements
  };
})();
