obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  errorClass: 'popup__error-сontainer_active',
}


function isValid (input) {
  return input.checkValidity();
}

//выключает кнопку
function disableButton (input, submit, obj) { 
  if (isValid(input)) {
    submit.classList.remove(obj.inactiveButtonClass);
    submit.removeAttribute('disabled');
  } else {
    submit.classList.add(obj.inactiveButtonClass);
    submit.setAttribute('disabled', 'disabled');
  }
};

//показывает ошибку
function showError (form, input, obj) { 
  const inputName = input.getAttribute('name');
  const errorElement = document.getElementById(`${inputName}-error`);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(obj.errorClass);
};

//скрывает ошибку
function hidenError (form, input, obj) { 
  const inputName = input.getAttribute('name');
  const errorElement = document.getElementById(`${inputName}-error`);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = "";
};

//проверяет инпуты на валидность и показывает или скрывает ошибку
function isValidInput (form, input, obj) { 
  if (isValid(input)) {
      hidenError(form, input, obj);
  } else {
      showError(form, input, obj);
  }
}

//накладывает функции на инпуты
function addInputListeners (form, obj) { 
  const inputs = Array.from(form.querySelectorAll(obj.inputSelector));
  const submit = form.querySelector(obj.submitButtonSelector);

  inputs.forEach((input) => {
      input.addEventListener('input', function () {
        isValidInput(form, input, obj);
          disableButton(input, submit, obj);
      });
      disableButton(input, submit, obj);
  });
};

//накладывает валидацию
function enableValidation (obj) { 
  const forms = Array.from(document.querySelectorAll(obj.formSelector));

  forms.forEach(form => {
      form.addEventListener('submit', (evt) => {
          evt.preventDefault();
      });
      addInputListeners(form, obj);
  });
};

enableValidation(obj);