import initialCards from './constants.js'
import FormValidator from './FormValidator.js';
import Card from './Card.js';

//Открытие закрытие попапа
const listPopups = document.querySelectorAll('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const placeEditButton = document.querySelector('.profile__add-button');
const popupCloseButtons = document.querySelectorAll('.popup__close');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

//Попапы
const popupEditProfile = document.querySelector('.popup-edit');
const popupAddPlace = document.querySelector('.popup-place');
const popupImg = document.querySelector('.img-popup');

//Формы попапов (для сабмитов)
// const formPopupProfile = popupEditProfile.querySelector('.popup__content');
// const formPopupPlace = popupAddPlace.querySelector('.popup__content');
const formPopupProfile = document.forms.profileData
const formPopupPlace = document.forms.placeData

//Импуты форм попапов:
//импуты попапа Profile
const inputNameAuthor = formPopupProfile.querySelector('.popup__input_type_name');
const inputJobAuthor = formPopupProfile.querySelector('.popup__input_type_job');

//импуты попапа Place
const inputTitleFormPopupPlace = formPopupPlace.querySelector('.popup__input_type_title');
const inputLinkFormPopupPlace = formPopupPlace.querySelector('.popup__input_type_link');

//элементы попапа Img
// const containerImgPopup = popupImg.querySelector('.img-popup__container');
const imageImgPopup = popupImg.querySelector('.img-popup__image');
const captionImgPopup = popupImg.querySelector('.img-popup__caption');

const listsElement = document.querySelector('.photo-grid__cards');
const selectorTemlate = '#cardElement';


//объект для валидации
const validationSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  errorTemplate: '.popup__input-error_type_',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error_invalid', //подчеркивает ошибку красным
};

const openPopup=(popup) =>{
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}

// закрытие попапа по крестику
popupCloseButtons.forEach(element => {
  const popup = element.closest('.popup');
  element.addEventListener('click', () => closePopup(popup));
})

// закрытие попапа по оверлею
listPopups.forEach(element => element.addEventListener('click', closePopupOverlay));

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

//закрытие попапа по Escape
function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//открытие попапа картинки
function openImagePopup(cardData) {
  imageImgPopup.src = cardData.link;
  imageImgPopup.alt = cardData.name;
  captionImgPopup.textContent = cardData.name;
  openPopup(popupImg);
  console.log(cardData); 
}

// загрузка массива изначальных карточек
initialCards.forEach(element => {
  addCard(listsElement, creatCard(element));
})

//создание экземпляра объекта и вывод разметки карточки
function creatCard(element) {
  const card = new Card(element, selectorTemlate, openImagePopup);
  const cardElement = card.createCard();
  return cardElement;
}
//добавление карточки в контейнер
function addCard(container, card) {
  container.prepend(card);
}

//открытие попапа редактирования профайла
profileEditButton.addEventListener('click', () => {
  formPopupProfileValidator.resetErrorOpenPopup();
  inputNameAuthor.value = profileName.textContent;
  inputJobAuthor.value = profileJob.textContent;
  openPopup(popupEditProfile);
})

//открытие попапа редактирования карточек
placeEditButton.addEventListener('click', () => {
  formPopupPlace.reset();
  formPopupPlaceValidator.resetErrorOpenPopup();
  openPopup(popupAddPlace);
})

//submit формы редактирования профайла
formPopupProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = inputNameAuthor.value;
  profileJob.textContent = inputJobAuthor.value;
  closePopup(popupEditProfile);
})

//submit формы добавления карточки
formPopupPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitCardPopupPlace = {name: inputTitleFormPopupPlace.value, link: inputLinkFormPopupPlace.value};
  addCard(listsElement, creatCard(submitCardPopupPlace));
  closePopup(popupAddPlace);
});

//экземпляр класса валидации для formPopupProfile
const formPopupProfileValidator = new FormValidator(validationSettings, formPopupProfile);
formPopupProfileValidator.enableValidation()

//экземпляр класса валидации для formPopupPlace
const formPopupPlaceValidator = new FormValidator(validationSettings, formPopupPlace);
formPopupPlaceValidator.enableValidation();