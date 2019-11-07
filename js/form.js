'use strict';

(function () {
  var PIN_HEIGHT_BEFORE = 22;
  var roomNumber = document.querySelector('#room_number');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersSelect = mapFilters.querySelectorAll('select');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var adress = document.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');
  var pinParams = {
    WIDTH: document.querySelector('.map__pin').offsetWidth,
    HEIGHT: document.querySelector('.map__pin').offsetHeight + PIN_HEIGHT_BEFORE
  };
  var capacity = document.querySelector('#capacity');
  var capacityOptionsObj = {
    '1': ['0', '2', '3'],
    '2': ['0', '3'],
    '3': ['0'],
    '100': ['1', '2', '3']
  };
  var capacityOptionsTrue = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var onNumberSelectChange = function () { // Устанавливаем соответствие количества комнат количеству гостей
    var key = roomNumber.value; // cледим за выбранным количеством комнат
    var disabledOptions = capacityOptionsObj[key]; // disabledOptions - value из capacity
    for (var k = 0; k < capacity.options.length; k++) {
      if (disabledOptions.includes(capacity.options[k].value)) {
        capacity.options[k].disabled = true;
      } else {
        capacity.options[k].disabled = false;
      }
    }
    if (disabledOptions.includes(capacity.selectedOptions[0].value)) {
      [].forEach.call(capacity.options, function (option) {
        if (option.value === capacityOptionsTrue[key][0]) {
          option.selected = true;
        } else {
          option.selected = false;
        }
      });
    }
  };

  var mapFiltersSelectDisabled = function () { // Делает неактивными поля формы на карте в неактивном режиме
    for (var m = 0; m < mapFiltersSelect.length; m++) {
      mapFiltersSelect[m].setAttribute('disabled', 'disabled');
    }
  };

  mapFiltersSelectDisabled();

  for (var i = 0; i < adFormFieldset.length; i++) {
    adFormFieldset[i].classList.add('disabled'); // Добавляем класс disabled полям adFormFieldset
  }

  adress.value = window.utils.getIntegerValue(mapPinMain.style.left, pinParams.WIDTH) + ', ' + window.utils.getIntegerValue(mapPinMain.style.top, (pinParams.HEIGHT - PIN_HEIGHT_BEFORE));

  mapFilters.classList.add('disabled'); // Добавляем класс disabled полям mapFilters

  roomNumber.addEventListener('change', onNumberSelectChange); // Устанавливаем соответствие количества комнат количеству гостей
  onNumberSelectChange();
})();
