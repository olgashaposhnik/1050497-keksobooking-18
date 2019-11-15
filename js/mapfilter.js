'use strict';

(function () {
  var PINS_LIMIT = 5;
  var filters = document.querySelector('.map__filters');
  /* var filterSelects = filters.querySelectorAll('select');
  var filterInputs = filters.querySelectorAll('input');*/
  var typeSelect = filters.querySelector('#housing-type');
  var priceSelect = filters.querySelector('#housing-price');
  var roomsSelect = filters.querySelector('#housing-rooms');
  var guestsSelect = filters.querySelector('#housing-guests');
  var featuresFieldset = filters.querySelector('#housing-features');
  var features = featuresFieldset.querySelectorAll('input');
  var checkedFeatures = featuresFieldset.querySelectorAll('input:checked');
  var advertisementList = document.querySelector('.map__pins'); // УДАЛИТЬ!!!!
  var errorTemplate = document.querySelector('#error');
  var errorMessage = errorTemplate.content.querySelector('.error');
  var mainBlock = errorTemplate.content.querySelector('.main');
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
  var form = document.querySelector('form');
  var filterOptions = {
    type: null,
    price: null,
    rooms: null,
    guests: null,
    features: null
  };

  var cleanAdvertisementList = function () { // функция, которая очищает область от старых пинов
    Array.from(advertisementList.querySelectorAll('.map__pin:not(.map__pin--main)')).forEach(function (item) {
      item.remove();
    });
  };

  var getFilterPrice = function (data) {
    var filterPrice = PriceRange[priceSelect.value.toUpperCase()]; // возвращает значение строки в верхний регистр
    return filterPrice >= PriceRange.MIN && data.offer.price <= PriceRange.MAX;
  };

  var getCheckedInputValues = function () {
    return Array.from(checkedFeatures).map(function (item) {
      return item.value;
    });
  };
  console.log(getCheckedInputValues());

  var updateFilterOptions = function () {
    filterOptions.type = typeSelect.value;
    filterOptions.price = priceSelect.value;
    filterOptions.rooms = parseInt(roomsSelect.value, 10);
    filterOptions.guests = parseInt(guestsSelect.value, 10);
    filterOptions.features = getCheckedInputValues();
    console.log(filterOptions.features);
  };
  console.log(updateFilterOptions());

  var updateAdvertisements = function (data) {
    var fragment = document.createDocumentFragment();
    for (var m = 0; m < data.length; m++) {
      var advertisementItem = window.pin.create(data[m]);
      fragment.appendChild(advertisementItem);
    }
    advertisementList.appendChild(fragment);
  };

  var filterData = function (data) {
    Object.keys(filterOptions).forEach(function (key) { // Object.keys(filterOptions - создает массив с ключами объекта filterOptions В нашем случае это будет ['type', 'rooms']. Проходимся в цикле по нашему массиву
    // если выбрано значение 'any' или у нас получился какой-нибудь NaN или просто неопределенное значение - пропускаем ход
      if (filterOptions[key] === 'any' || !filterOptions[key]) {
        return;
      /* }  else if (filterOptions[key] === 'price') {
        data = data.filter(function (item) { // отсортированный массив!
          var filterPrice = PriceRange[filterOptions[key].toUpperCase()];
          console.log(filterPrice);
          return filterPrice >= PriceRange.MIN && item.offer[key] <= PriceRange.MAX;
        });*/
      } else if (filterOptions[key] === 'features') {
        data = data.filter(function (item) {
          return item.offer[key].includes(filterOptions[key]);
        });
      } // иначе начинаем проходить циклом по нашему массиву с данными
      data = data.filter(function (item) { // отсортированный массив!
        // и оставляем в нем только те объекты, которые совпадают с выбранными в фильтре данными
        return item.offer[key] === filterOptions[key];
      });
    });
    cleanAdvertisementList();
    updateAdvertisements(data);
  };

  form.addEventListener('change', function () {
    updateFilterOptions();
    // после того, как обновили - запускам загрузку данных с сервера, и при успешной загрузке - фильтруем их
    window.backend.load(filterData);
  });
})();
