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

  _showInputError() {
    this._input.classList.add(this._inputErrorClass);
    this._errorTextElement.textContent = this._input.validationMessage;
  }

  _hideInputError() {
    this._input.classList.remove(this._inputErrorClass);
    this._errorTextElement.textContent = '';
  }

  _enableButton() {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.disabled = false;
  }

  _disableButton() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.disabled = true;
  }

  _hasValidInput() {
    return Array.from(this._inputList).every(input => input.validity.valid);
  }

  _toggleButtonState() {
    this._hasValidInput() ? this._enableButton() : this._disableButton();
  }

  _checkInputValidity() {
    this._errorTextElement = this._form.querySelector(`${this._errorTemplate}${this._input.name}`);
    this._input.validity.valid ? this._hideInputError() : this._showInputError();
  }

  _setEventListener() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._input = input;
        this._checkInputValidity()
        this._toggleButtonState()
      })
    })
  }
  
  enableValidation() {
    this._setEventListener();
  }
  
  resetValidationState() {
    this._inputList.forEach(input => {
      this._input = input;
      this._errorTextElement = this._form.querySelector(`${this._errorTemplate}${input.name}`);
      if (!input.validity.valid) {
        this._hideInputError();
      }
    })
    this._disableButton()
  }
}