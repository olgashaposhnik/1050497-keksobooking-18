'use strict';

(function () {
  var roomNumber = document.querySelector('#room_number');
  var mapFilters = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var capacity = document.querySelector('#capacity');
  var capacityOptionsTrue = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var onNumberSelectChange = function () { // Устанавливаем соответствие количества комнат количеству гостей
    var key = roomNumber.value; // cледим за выбранным количеством комнат
    var activeOptions = capacityOptionsTrue[key]; // disabledOptions - value из capacity
    for (var k = 0; k < capacity.options.length; k++) {
      capacity.options[k].disabled = !activeOptions.includes(capacity.options[k].value);
    }
    if (!activeOptions.includes(capacity.selectedOptions[0].value)) {
      capacity.value = capacityOptionsTrue[key][0];
    }
  };

  for (var i = 0; i < adFormFieldset.length; i++) {
    adFormFieldset[i].classList.add('disabled'); // Добавляем класс disabled полям adFormFieldset
  }

  mapFilters.classList.add('disabled'); // Добавляем класс disabled полям mapFilters

  roomNumber.addEventListener('change', onNumberSelectChange); // Устанавливаем соответствие количества комнат количеству гостей
  onNumberSelectChange();
})();
