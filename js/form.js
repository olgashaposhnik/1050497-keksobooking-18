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
  var disabledOptions = capacityOptionsObj[key]; // disabledOptions - value из capacity
  for (var k = 0; k < capacity.options.length; k++) {
    if (disabledOptions.includes(capacity.options[k].value)) {
      capacity.options[k].disabled = true;
    } else {
      capacity.options[k].disabled = false;
    }
  }
  if (disabledOptions.includes(capacity.selectedOptions[0].value)) {
    [].forEach.call(capacity.options, function(option) {
      if (option.value === capacityOptionsTrue[key][0]) {
        option.selected = true;
      } else {
        option.selected = false;
      }
    });
  }
};

roomNumber.addEventListener('change', onNumberSelectChange); // Устанавливаем соответствие количества комнат количеству гостей
onNumberSelectChange();
