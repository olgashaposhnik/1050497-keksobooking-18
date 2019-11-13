'use strict';

(function () {
  /* var PINS_LIMIT = 5;
  var filters = document.querySelector('.map__filters');
  var filterSelects = filters.querySelectorAll('select');
  var filterInputs = filters.querySelectorAll('input');
  var typeSelect = filters.querySelector('#housing-type');
  var priceSelect = filters.querySelector('#housing-price');
  var roomsSelect = filters.querySelector('#housing-rooms');
  var guestsSelect = filters.querySelector('#housing-guests');
  var featuresFieldset = filters.querySelector('#housing-features');
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
  }

  var updateFilterOptions = function() {
    filterOptions.type = typeSelect.value;
    filterOptions.price = PriceRange[priceSelect.value.toUpperCase()]; // возвращает значение строки в верхний регистр.
    filterOptions.rooms = parseInt(roomsSelect.value);
    filterOptions.guests = parseInt(guestsSelect.value);
    filterOptions.features = featuresFieldset.querySelectorAll('input:checked');
  };

  var createAdvertisements = function () {
    var fragment = document.createDocumentFragment();
    for (var m = 0; m < advertisements.length; m++) {
      var advertisementItem = window.pin.create(advertisements[m]);
      fragment.appendChild(advertisementItem);
    }
    advertisementList.appendChild(fragment);
  };

  var onSuccessLoad = function (data) { //
    advertisements = data;
    createAdvertisements();
  };

  var filterData = function(data) {
    Object.keys(filterOptions).forEach(function(key) { // Object.keys(filterOptions - создает массив с ключами объекта filterOptions В нашем случае это будет ['type', 'rooms']. Проходимся в цикле по нашему массиву
    // если выбрано значение 'any' или у нас получился какой-нибудь NaN или просто неопределенное значение - пропускаем ход
      if (filterOptions[key] === 'any' || !filterOptions[key]) {
        return;
      };
    // иначе начинаем проходить циклом по нашему массиву с данными
      data = data.filter(function(item) { // отсортированный массив!
    // и оставляем в нем только те объекты, которые совпадают с выбранными в фильтре данными
        return item.offer[key] === filterOptions[key];
      });
    });
  };

  var filterPrice = function (data) {
    return filterOptions.price >= filterOptions.price.MIN && data.offer.price <= filterOptions.price.MAX;
  };

  form.addEventListener('change', function() {
    updateFilterOptions();
    // после того, как обновили - запускам загрузку данных с сервера, и при успешной загрузке - фильтруем их
    window.load.pageLoad(filterData);
  });*/
})();
