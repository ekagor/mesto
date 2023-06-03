const profileEditButtonElement = document.querySelector('.profile__edit-button');
const profileAddButtonElement = document.querySelector('.profile__add-button');
const avatarElement = document.querySelector('.profile__avatar-edit')

const formsValidator = {};

const selectorTemplate = '#cardElement';
const listsElementSelector = '.photo-grid__cards';
const popupProfileSelector = '.popup-edit';
const popupAddCardSelector = '.popup-place';
const popupImageSelector = '.img-popup';
const popupDeleteSelector = '.popup-delete';
const popupEditAvatarSelector = '.popup-avatar';

const settingsInfo = {
  profileNameSelector: '.profile__title',
  profileJobSelector: '.profile__subtitle',
  profileAvatarSelector: '.profile__avatar',
};

const validationSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  errorTemplate: '.popup__input-error_type_',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error_invalid',
};

export {
  profileEditButtonElement,
  profileAddButtonElement,
  avatarElement,
  formsValidator,
  selectorTemplate,
  listsElementSelector,
  popupProfileSelector,
  popupAddCardSelector,
  popupImageSelector,
  popupDeleteSelector,
  popupEditAvatarSelector,
  settingsInfo,
  validationSettings,
};
