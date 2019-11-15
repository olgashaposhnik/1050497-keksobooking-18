'use strict';

(function () {
  var roomNumber = document.querySelector('#room_number');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var capacity = document.querySelector('#capacity');
  var title = document.querySelector('#title');
  var price = document.querySelector('#price');
  var type = document.querySelector('#type');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adress = document.querySelector('#address');
  var successTemplate = document.querySelector('#success');
  var successMessage = successTemplate.content.querySelector('.success');
  var errorTemplate = document.querySelector('#error');
  var errorMessage = errorTemplate.content.querySelector('.error');
  var errorClose = errorTemplate.content.querySelector('.error__button');
  var mainBlock = document.querySelector('main');
  var capacityOptionsTrue = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var setAddress = function (data) {
    adress.value = data;
  };

  adress.setAttribute('readonly', 'true');

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

  var activateAdForm = function () {
    adForm.classList.remove('ad-form--disabled');
  };

  var activateAdFormFieldset = function () {
    for (var j = 0; j < adFormFieldset.length; j++) {
      adFormFieldset[j].classList.remove('disabled');
    }
  };

  roomNumber.addEventListener('change', onNumberSelectChange); // Устанавливаем соответствие количества комнат количеству гостей
  onNumberSelectChange();

  title.addEventListener('invalid', function () {
    if (title.validity.tooShort) {
      title.setCustomValidity('Заголовок объявления должен состоять минимум из 30-ти символов');
    } else if (title.validity.tooLong) {
      title.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else if (title.validity.valueMissing) {
      title.setCustomValidity('Обязательное поле');
    } else {
      title.setCustomValidity('');
    }

  });

  title.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 30) {
      target.setCustomValidity('Заголовок объявления должен состоять минимум из 30-ти символов');
    } else if (target.value.length > 100) {
      target.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else if (target.value.length === 0) {
      target.setCustomValidity('Обязательное поле');
    } else {
      target.setCustomValidity('');
    }
  });

  price.addEventListener('invalid', function () {
    if (price.validity.rangeUnderflow) {
      price.setCustomValidity('Минимальная цена за ночь ' + price.getAttribute('min') + ' рублей');
    } else if (price.validity.rangeOverflow) {
      price.setCustomValidity('Максимальная цена за ночь 1 000 000 рублей');
    }
  });

  price.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value < 0) {
      target.setCustomValidity('Минимальная цена за ночь 0 рублей');
    } else if (target.value > 1000000) {
      target.setCustomValidity('Максимальная цена за ночь 1 000 000 рублей');
    } else {
      target.setCustomValidity('');
    }
  });

  var onTypeSelectChange = function () { // Устанавливаем соответствие цены типу жилья
    if (type.value === 'bungalo') {
      price.setAttribute('min', '0');
      price.setAttribute('placeholder', '0');
    } else if (type.value === 'flat') {
      price.setAttribute('min', '1000');
      price.setAttribute('placeholder', '1000');
    } else if (type.value === 'house') {
      price.setAttribute('min', '5000');
      price.setAttribute('placeholder', '5000');
    } else {
      price.setAttribute('min', '10000');
      price.setAttribute('placeholder', '10000');
    }
  };

  var onFormSubmitClick = function () {
    window.map.deactivate();
    adForm.classList.add('ad-form--disabled');
    for (var j = 0; j < adFormFieldset.length; j++) {
      adFormFieldset[j].classList.add('disabled');
    }
    window.map.mapFiltersSelectDisabled();
    Array.from(document.querySelectorAll('.map__pin:not(.map__pin—main)')).forEach(function (item) {
      item.remove();
    });
    mapPinMain.setAttribute('style', 'left: 570px; top: 375px;');
    adForm.reset();
    var success = successMessage.cloneNode(true);
    mainBlock.insertAdjacentElement('afterbegin', success);
    success.addEventListener('click', function () {
      success.remove();
    });
    document.addEventListener('keydown', window.utils.onEscDown); // НЕ РАБОТАЕТ
  };

  var onSubmitError = function () {
    var error = errorMessage.cloneNode(true);
    mainBlock.insertAdjacentElement('afterbegin', error);
    errorClose.addEventListener('click', function () {
      error.remove();
    });
    error.addEventListener('click', function () {
      error.remove();
    });
    document.addEventListener('keydown', window.utils.onEscDown); // НЕ РАБОТАЕТ
  };

  type.addEventListener('change', onTypeSelectChange);
  onTypeSelectChange();

  timein.addEventListener('change', function (evt) {
    timeout.value = evt.target.value;
  });

  timeout.addEventListener('change', function (evt) {
    timein.value = evt.target.value;
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(onFormSubmitClick, onSubmitError, new FormData(adForm));
  });

  window.form = {
    setAddress: setAddress,
    activateAdFormFieldset: activateAdFormFieldset,
    activateAdForm: activateAdForm
  };
})();
