export default class FormValidator {
  constructor(settings, form) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorTemplate = settings.errorTemplate;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._form = form
    this._button = form.querySelector(settings.submitButtonSelector)
    this._inputList = form.querySelectorAll(settings.inputSelector)
  }

  _showInputError(errorTextElement, input) {
    input.classList.add(this._inputErrorClass);
    errorTextElement.textContent = input.validationMessage;
  }

  _hideInputError(errorTextElement, input) {
    input.classList.remove(this._inputErrorClass);
    errorTextElement.textContent = '';
  }

  _enableSubmitButton() {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.disabled = false;
  }

  _disableSubmitButton() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.disabled = true;
  }

  _hasValidInput() {
    return Array.from(this._inputList).every(input => input.validity.valid)
  }

  _toggleButtonState() {
    if (this._hasValidInput()) {
      this._enableSubmitButton();
    } else {
      this._disableSubmitButton();
    }
  }

  _checkInputValidity(input) {
    const errorTextElement = this._form.querySelector(`${this._errorTemplate}${input.name}`)
    if (input.validity.valid) {
      this._hideInputError(errorTextElement, input,);
    } else {
      this._showInputError(errorTextElement, input);
    }
  }

  _setEventListener() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input)
        this._toggleButtonState()
      })
    })
  }
  
  enableValidation() {
    this._setEventListener();
  }
  
  resetErrorOpenPopup() {
    this._inputList.forEach(input => {
      const errorTextElement = this._form.querySelector(`${this._errorTemplate}${input.name}`);
      if (!input.validity.valid) {
        this._hideInputError(errorTextElement, input);
      }
    })
    this._disableSubmitButton()
  }
}
