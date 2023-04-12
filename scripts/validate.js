

const validationSettings = {
  allForms: document.forms,
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  errorTemplate: '.popup__input-error_type_',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error_invalid', //подчеркивает ошибку красным
  errorClass: 'popup__input-error_active' //когда активная ошибка висит
};
// const l = console.log;
// l(validationSettings.errorClass)

function showInputError(errorElement, input, inputErrorClass, errorClass) {
  errorElement.classList.add(errorClass);
  errorElement.textContent = input.validationMessage;
  input.classList.add(inputErrorClass);
}

function hideInputError(errorElement, input, inputErrorClass, errorClass) {
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
  input.classList.remove(inputErrorClass);
}

//делает инпуты валидными
function hasValidInput(inputList) {
  return Array.from(inputList).every((input) => input.validity.valid)
}

//делает кнопку некликабельной
function disableSubmitButton(button, inactiveButtonClass) {
  button.classList.add(inactiveButtonClass);
  button.disabled = true;
}

//делает кнопку кликабельной
function enableSubmitButton(button, inactiveButtonClass) {
  button.classList.remove(inactiveButtonClass);
  button.disabled = false;
}

//проверяет валидность инпутов и меняет вид кнопки 
function toggleButtonState(button, inputList, inactiveButtonClass) {
  if (hasValidInput(inputList)) {
    button.classList.remove(inactiveButtonClass)
    button.disabled = false
  }
  else {
    button.classList.add(inactiveButtonClass)
    button.disabled = true
  }
}

// скрытие или показ ошибки при валидных и невалидных инпутах
function checkInputValidity(input, errorTemplate, inputErrorClass, errorClass) {
  const errorElement = document.querySelector(`${errorTemplate}${input.name}`);
  if (input.validity.valid) {
    hideInputError(errorElement, input, inputErrorClass, errorClass)
  }
  else {
    showInputError(errorElement, input, inputErrorClass, errorClass)
  }
}

function enableValidation(settings) {
  const forms = Array.from(settings.allForms)
  forms.forEach((item) => {
    const inputList = item.querySelectorAll(settings.inputSelector)
    const buttonSubmit = item.querySelector(settings.submitButtonSelector)
    addEventListener(inputList, buttonSubmit, settings.errorTemplate, settings.inactiveButtonClass, settings.inputErrorClass, settings.errorClass)
  })
}


function addEventListener(inputList, button, errorSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      toggleButtonState(button, inputList, inactiveButtonClass);
      checkInputValidity(input, errorSelector, inputErrorClass, errorClass);
    })
  })
}

enableValidation(validationSettings)