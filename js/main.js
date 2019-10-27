'use strict';
var PIN_HEIGHT_BEFORE = 22;
var pinParams = {
  WIDTH: document.querySelector('.map__pin').offsetWidth,
  HEIGHT: document.querySelector('.map__pin').offsetHeight + PIN_HEIGHT_BEFORE
};
/* var halfPinWidth = */
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var adFormFieldset = adForm.querySelectorAll('fieldset');
var mapFilters = document.querySelector('.map__filters');
var mapFiltersSelect = mapFilters.querySelectorAll('select');
var mapPinMain = document.querySelector('.map__pin--main');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var adress = document.querySelector('#address');
var ENTER_KEYCODE = 13;
var capacityOptionsObj = {
  '1': ['0', '2', '3'],
  '2': ['0', '3'],
  '3': ['0'],
  '100': ['1', '2', '3']
};

var getIntegerAdress = function (value, param) {
  return Math.floor((parseInt(value, 10) + param / 2));
};

for (var i = 0; i < adFormFieldset.length; i++) {
  adFormFieldset[i].classList.add('disabled'); // Добавляем класс disabled полям adFormFieldset
}
mapFilters.classList.add('disabled'); // Добавляем класс disabled полям mapFilters

var classRemove = function (element, className) {
  element.classList.remove(className);
};

adress.value = getIntegerAdress(mapPinMain.style.left, pinParams.WIDTH) + ', ' + getIntegerAdress(mapPinMain.style.top, (pinParams.HEIGHT - PIN_HEIGHT_BEFORE));

var mapFiltersSelectDisabled = function () { // Делает неактивными поля формы на карте в неактивном режиме
  for (var m = 0; m < mapFiltersSelect.length; m++) {
    mapFiltersSelect[m].setAttribute('disabled', 'disabled');
  }
};

mapFiltersSelectDisabled();

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
  adress.value = getIntegerAdress(mapPinMain.style.left, pinParams.WIDTH) + ', ' + getIntegerAdress(mapPinMain.style.top, pinParams.HEIGHT * 2);
};

mapPinMain.addEventListener('mousedown', onMapPinMainClick);

mapPinMain.addEventListener('keydown', function (evt) { // переводим страницу в активный режим при нажатии на энтер
  if (evt.keyCode === ENTER_KEYCODE) {
    onMapPinMainClick();
  }
});

roomNumber.addEventListener('change', function (evt) { // Устанавливаем соответствие количества комнат количеству гостей
  var key = evt.currentTarget.value; // cледим за выбранным количеством комнат
  var disabledOptions = capacityOptionsObj[key]; // disabledOptions - value из capacity
  for (var k = 0; k < capacity.options.length; k++) {
    if (disabledOptions.includes(capacity.options[k].value)) {
      capacity.options[k].disabled = true;
    } else {
      capacity.options[k].disabled = false;
    }
  }
});
