'use strict';
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var capacityOptionsObj = {
  '1': ['0', '2', '3'],
  '2': ['0', '3'],
  '3': ['0'],
  '100': ['1', '2', '3']
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
};

roomNumber.addEventListener('change', onNumberSelectChange); // Устанавливаем соответствие количества комнат количеству гостей
onNumberSelectChange();
