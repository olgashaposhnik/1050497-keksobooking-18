'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var roomNumber = document.querySelector('#room_number');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
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
  var success = successMessage.cloneNode(true);
  var errorTemplate = document.querySelector('#error');
  var errorMessage = errorTemplate.content.querySelector('.error');
  var error = errorMessage.cloneNode(true);
  var errorClose = errorTemplate.content.querySelector('.error__button');
  var mainBlock = document.querySelector('main');
  var capacityOptionsTrue = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var TitleLength = {
    MISS: 0,
    MIN: 30,
    MAX: 100
  };
  var priceRange = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000,
    MAX: 100000
  };

  var setAddress = function (data) {
    adress.value = data;
  };

  adress.setAttribute('readonly', 'true');

  var onNumberSelectChange = function () { // Устанавливаем соответствие количества комнат количеству гостей
    var key = roomNumber.value; // cледим за выбранным количеством комнат
    var activeOptions = capacityOptionsTrue[key]; // disabledOptions - value из capacity
    Array.from(capacity.options).forEach(function (item) {
      item.disabled = !activeOptions.includes(item.value);
    });
    if (!activeOptions.includes(capacity.selectedOptions[0].value)) {
      capacity.value = capacityOptionsTrue[key][0];
    }
  };

  Array.from(adFormFieldsets).forEach(function (item) { // Добавляем класс disabled полям adFormFieldsets
    item.classList.add('disabled');
  });

  var activateAdForm = function () {
    adForm.classList.remove('ad-form--disabled');
    Array.from(adFormFieldsets).forEach(function (item) {
      item.classList.remove('disabled');
    });
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
    if (target.value.length < TitleLength.MIN) {
      target.setCustomValidity('Заголовок объявления должен состоять минимум из 30-ти символов');
    } else if (target.value.length > TitleLength.MAX) {
      target.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else if (target.value.length === TitleLength.MISS) {
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
    if (target.value < priceRange.BUNGALO) {
      target.setCustomValidity('Минимальная цена за ночь 0 рублей');
    } else if (target.value > priceRange.MAX) {
      target.setCustomValidity('Максимальная цена за ночь 1 000 000 рублей');
    } else {
      target.setCustomValidity('');
    }
  });

  var onTypeSelectChange = function () { // Устанавливаем соответствие цены типу жилья
    if (type.value === 'bungalo') {
      price.setAttribute('min', priceRange.BUNGALO);
      price.setAttribute('placeholder', priceRange.BUNGALO);
    } else if (type.value === 'flat') {
      price.setAttribute('min', priceRange.FLAT);
      price.setAttribute('placeholder', priceRange.FLAT);
    } else if (type.value === 'house') {
      price.setAttribute('min', priceRange.HOUSE);
      price.setAttribute('placeholder', priceRange.HOUSE);
    } else {
      price.setAttribute('min', priceRange.PALACE);
      price.setAttribute('placeholder', priceRange.PALACE);
    }
  };

  var onEscDown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (document.querySelector('.success')) {
        removeMessage(document.querySelector('.success'));
      }

      if (document.querySelector('.error')) {
        removeMessage(document.querySelector('.error'));
      }
    }
  };

  var removeMessage = function (message) {
    message.remove();
    adForm.addEventListener('submit', preventSubmitDefault);
    document.removeEventListener('keydown', onEscDown);
  };

  var removeSuccessMessage = function () {
    removeMessage(success);
  };

  var removeErrorMessage = function () {
    removeMessage(error);
  };

  var onFormSubmitClick = function () {
    window.map.deactivate();
    adForm.classList.add('ad-form--disabled');
    Array.from(adFormFieldsets).forEach(function (item) {
      item.classList.add('disabled');
    });
    window.map.disableFiltersSelect();
    Array.from(document.querySelectorAll('.map__pin:not(.map__pin--main)')).forEach(function (item) {
      item.remove();
    });
    mapPinMain.setAttribute('style', 'left: 570px; top: 375px;');
    adForm.reset();
    onNumberSelectChange();
    setAddress(window.map.getMainAddress());
    mainBlock.insertAdjacentElement('afterbegin', success);
    success.addEventListener('click', removeSuccessMessage);
    document.addEventListener('keydown', onEscDown);
    mapPinMain.addEventListener('click', window.map.onPinMainClick);
    adForm.removeEventListener('submit', preventSubmitDefault);
  };

  var preventSubmitDefault = function (evt) {
    evt.preventDefault();
    window.backend.upload(onFormSubmitClick, onSubmitError, new FormData(adForm));
    adForm.removeEventListener('submit', preventSubmitDefault);
  };

  var onSubmitError = function () {
    mainBlock.insertAdjacentElement('afterbegin', error);
    errorClose.addEventListener('click', removeErrorMessage);
    error.addEventListener('click', removeErrorMessage);
    document.addEventListener('keydown', onEscDown);
  };

  type.addEventListener('change', onTypeSelectChange);
  onTypeSelectChange();

  timein.addEventListener('change', function (evt) {
    timeout.value = evt.target.value;
  });

  timeout.addEventListener('change', function (evt) {
    timein.value = evt.target.value;
  });

  adForm.addEventListener('submit', preventSubmitDefault);

  window.form = {
    setAddress: setAddress,
    activate: activateAdForm
  };
})();
