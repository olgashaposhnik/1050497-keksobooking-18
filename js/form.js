'use strict';
var roomNumber = document.querySelector('#room_number');
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
  var capacitySelected = capacity.value;
  var disabledOptions = capacityOptionsObj[key]; // disabledOptions - value из capacity
  var selectedOptions = capacityOptionsTrue[key];
  for (var k = 0; k < capacity.options.length; k++) {
    if (disabledOptions.includes(capacity.options[k].value)) {
      capacity.options[k].disabled = true;
    } else {
      capacity.options[k].disabled = false;
    }
  }
    for (var i = 0; i < capacity.options.length; i++)
  if (capacity.options[i].selected = true) {
    for (var j = 0; j < capacity.options.length; j++) {
      if (disabledOptions.includes(capacity.options[j].value)) {
        capacity.options[j].selected = selectedOptions[1];
      }
    }
  }
};

roomNumber.addEventListener('change', onNumberSelectChange); // Устанавливаем соответствие количества комнат количеству гостей
onNumberSelectChange();
