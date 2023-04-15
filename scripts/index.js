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
const formPopupProfile = popupEditProfile.querySelector('.popup__content');
const formPopupPlace = popupAddPlace.querySelector('.popup__content');
//Импуты форм попапов:
//импуты попапа Profile
const inputNameAuthor = document.querySelector('.popup__input_type_name');
const inputJobAuthor = document.querySelector('.popup__input_type_job');
//импуты попапа Place
const inputTitleFormPopupPlace = formPopupPlace.querySelector('.popup__input_type_title');
const inputLinkFormPopupPlace = formPopupPlace.querySelector('.popup__input_type_link');
//элементы попапа Img
const containerImgPopup = popupImg.querySelector('.img-popup__container')
const imageImgPopup = popupImg.querySelector('.img-popup__image');
const captionImgPopup = popupImg.querySelector('.img-popup__caption');

const cardsContainer = document.querySelector('.photo-grid__cards');

const popupCloseButton = document.querySelectorAll('.popup__close-button'); 
// Все оверлеи попапов
const popupOverlays = document.querySelectorAll('.popup');

//для валидации
const buttonSubmitFormPopupProfile = document.querySelector('.popup__button');
const inputListFormPopupProfile = document.querySelectorAll('.popup__input');
const buttonSubmitFormPopupPlacePlace = document.querySelector('.popup__button');
const inputListFormPopupPlace = document.querySelectorAll('.popup__input');


//Массив картточек изначальный
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//закрытие попапа при нажатии на клавишу Escape
function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  }
}

function closePopupOverlay(evt, popup) {
  if (evt.target === evt.currentTarget) {
    closePopup(popup);
  }
  return
}

// закрытие попап по оверлею
popupOverlays.forEach(item => item.addEventListener('click', (evt) => closePopupOverlay(evt, item)));


function openPopup(listPopups) {  
  listPopups.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
}

function closePopup(listPopups) {
  listPopups.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);  
}

profileEditButton.addEventListener('click', () => {
  resetErrorOpenPopup(formPopupProfile)  
  inputNameAuthor.value = profileName.textContent;
  inputJobAuthor.value = profileJob.textContent;
  toggleButtonState(buttonSubmitFormPopupProfile, inputListFormPopupProfile, validationSettings.inactiveButtonClass) 
  openPopup(popupEditProfile)
})

formPopupProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = inputNameAuthor.value;
  profileJob.textContent = inputJobAuthor.value;
  closePopup(popupEditProfile);
})

popupCloseButtons.forEach((item) => {
  const listPopups = item.closest('.popup');
  item.addEventListener('click', () => {
    closePopup(listPopups)
  })
})

placeEditButton.addEventListener('click', () => {
  const buttonSubmit = formPopupPlace.querySelector('.popup__button');
  disableSubmitButton(buttonSubmit, validationSettings.inactiveButtonClass);
  formPopupPlace.reset();
  toggleButtonState(buttonSubmitFormPopupPlacePlace, inputListFormPopupPlace, validationSettings.inactiveButtonClass);  
  resetErrorOpenPopup(formPopupPlace);  
  openPopup(popupAddPlace);
})


//Создание карточки на основе темплейта
function createCard(item) {
  const cardTemplate = document.querySelector('.card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image'); 
  const cardName = cardElement.querySelector('.card__title');
  const cardLike = cardElement.querySelector('.card__like');
  const trashCard = cardElement.querySelector('.card__trash');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardName.textContent = item.name;
  cardLike.addEventListener('click', (evt) => evt.target.classList.toggle('card__like_active'));
  cardImage.addEventListener('click', function () {
    openPopup(popupImg);
    imageImgPopup.src = cardImage.src;
    imageImgPopup.alt = cardImage.alt;
    captionImgPopup.textContent = cardImage.alt;
  });

  trashCard.addEventListener('click', () => trashCard.closest('.card').remove());
  return cardElement
};

initialCards.forEach(function (item) {
  cardsContainer.append(createCard(item));
});

//Редактирование карточки места
formPopupPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const objectPlace = { name: inputTitleFormPopupPlace.value, link: inputLinkFormPopupPlace.value };
  cardsContainer.prepend(createCard(objectPlace));  
  closePopup(popupAddPlace);
  evt.target.reset();  
})