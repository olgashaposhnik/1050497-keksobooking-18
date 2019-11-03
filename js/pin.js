'use strict';
var PIN_HEIGHT_BEFORE = 22;
var pinParams = {
  WIDTH: document.querySelector('.map__pin').offsetWidth,
  HEIGHT: document.querySelector('.map__pin').offsetHeight + PIN_HEIGHT_BEFORE
};
var mapPinTemplate = document.querySelector('#pin');

window.createButton = function (resultObject) { // клонирует пины из template
  var buttonItem = mapPinTemplate.content.cloneNode(true);
  buttonItem.querySelector('.map__pin').style = 'left:' + (resultObject.location.x - pinParams.WIDTH / 2) + 'px; top:' + (resultObject.location.y - pinParams.HEIGHT) + 'px;'; // длина метки 84px, отнимаем ее, чтобы на место на карте метка указывала своим острым концом
  buttonItem.querySelector('img').src = resultObject.author.avatar;
  buttonItem.querySelector('img').alt = resultObject.offer.title;
  return buttonItem;
};
