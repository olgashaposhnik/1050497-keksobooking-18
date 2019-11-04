'use strict';
var TITLES = ['квартира в Токио', 'аппартаменты Москва', 'Комната в Париже', '3-х комнатная квартира в Риге', 'комната в Санкт-Петербурге', 'домик в Севастополе', 'квартира в Донецке', 'аппартаменты в Берлине'];
var advertisementList = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin');
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var adFormFieldset = adForm.querySelectorAll('fieldset');
var mapFilters = document.querySelector('.map__filters');
var mapFiltersSelect = mapFilters.querySelectorAll('select');
var mapPinMain = document.querySelector('.map__pin--main');
var adress = document.querySelector('#address');
var advertisements = [];
var ENTER_KEYCODE = 13;
var PIN_HEIGHT_BEFORE = 22;
var pinParams = {
  WIDTH: document.querySelector('.map__pin').offsetWidth,
  HEIGHT: document.querySelector('.map__pin').offsetHeight + PIN_HEIGHT_BEFORE
};

var createButton = function (resultObject) { // клонирует пины из template
  var buttonItem = mapPinTemplate.content.cloneNode(true);
  buttonItem.querySelector('.map__pin').style = 'left:' + (resultObject.location.x - pinParams.WIDTH / 2) + 'px; top:' + (resultObject.location.y - pinParams.HEIGHT) + 'px;'; // длина метки 84px, отнимаем ее, чтобы на место на карте метка указывала своим острым концом
  buttonItem.querySelector('img').src = resultObject.author.avatar;
  buttonItem.querySelector('img').alt = resultObject.offer.title;
  return buttonItem;
};

var classRemove = function (element, className) {
  element.classList.remove(className);
};

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
  for (var a = 0; a < TITLES.length; a++) {
    advertisements[a] = window.createObjectCard(a);
  }
  var fragment = document.createDocumentFragment();
  for (var m = 0; m < advertisements.length; m++) {
    var advertisementItem = createButton(advertisements[m]);
    var advertisementCard = window.createCard(advertisements[m]);
    fragment.appendChild(advertisementItem);
    advertisementCard.before('.map__filters-container');
  }
  for (var k = 0; k < advertisements.length; k++) {
    var advertisementCard = window.createCard(advertisements[k]);
    advertisementCard.before('.map__filters-container');
  }
  advertisementList.appendChild(fragment);
  adress.value = window.getIntegerAdress(mapPinMain.style.left, pinParams.WIDTH) + ', ' + window.getIntegerAdress(mapPinMain.style.top, pinParams.HEIGHT * 2);
};

for (var i = 0; i < adFormFieldset.length; i++) {
  adFormFieldset[i].classList.add('disabled'); // Добавляем класс disabled полям adFormFieldset
}

adress.value = window.getIntegerAdress(mapPinMain.style.left, pinParams.WIDTH) + ', ' + window.getIntegerAdress(mapPinMain.style.top, (pinParams.HEIGHT - PIN_HEIGHT_BEFORE));

mapFilters.classList.add('disabled'); // Добавляем класс disabled полям mapFilters

mapPinMain.addEventListener('mousedown', onMapPinMainClick);

mapPinMain.addEventListener('keydown', function (evt) { // переводим страницу в активный режим при нажатии на энтер
  if (evt.keyCode === ENTER_KEYCODE) {
    onMapPinMainClick();
  }
});
