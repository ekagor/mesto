//Открытие закрытие попапа
const popup = document.querySelectorAll('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const placeEditButton = document.querySelector('.profile__add-button');
const popupCloseButtons = document.querySelectorAll('.popup__close');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

//Попапы
const popupEditProfile = document.querySelector('.popup-edit');
const popupEditPlace = document.querySelector('.popup-place');
const popupImg = document.querySelector('.img-popup');
//Формы попапов (для сабмитов)
const formPopupProfile = popupEditProfile.querySelector('.popup__content');
const formPopupPlace = popupEditPlace.querySelector('.popup__content');
//Импуты форм попапов:
//импуты попапа Profile
const inputNameAuthor = document.querySelector('.popup__input_type_name');
const inputJobAuthor = document.querySelector('.popup__input_type_job');
//импуты попапа Place
const inputTitle = formPopupPlace.querySelector('.popup__input_type_title');
const inputLink = formPopupPlace.querySelector('.popup__input_type_link');
//элементы попапа Img
const containerImgPopup = popupImg.querySelector('.img-popup__container')
const imageImgPopup = popupImg.querySelector('.img-popup__image');
const CaptionImgPopup = popupImg.querySelector('.img-popup__caption');

const formProfileElement = document.querySelector('.popup__container');
const ulContainer = document.querySelector('.photo-grid__cards');

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
  
  function openPopup(popup) {
      popup.classList.add('popup_opened');
  }

  function closePopup(popup) {
      popup.classList.remove('popup_opened');
  }

  profileEditButton.addEventListener('click', () => {
      inputNameAuthor.value = profileName.textContent;
      inputJobAuthor.value = profileJob.textContent;
      openPopup(popupEditProfile)
  })
      
  formPopupProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = inputNameAuthor.value;
    profileJob.textContent = inputJobAuthor.value;
    closePopup(popupEditProfile);
})

formProfileElement.addEventListener('submit', formPopupProfile);

popupCloseButtons.forEach((item) => {
    const popup = item.closest('.popup');
    item.addEventListener('click', () => {
    closePopup(popup)
  })
})

placeEditButton.addEventListener('click', () => {  
    openPopup(popupEditPlace)
})

//Создание карточки на основе темплейта
function createCard (item) {
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
  cardImage.addEventListener('click', function() {
    openPopup(popupImg);
    imageImgPopup.src = cardImage.src;
    imageImgPopup.alt = cardImage.alt;
    CaptionImgPopup.textContent = cardImage.alt;
  });

trashCard.addEventListener('click', () => trashCard.closest('.card').remove());  
  return cardElement
};

initialCards.forEach(function (item) {
   ulContainer.append(createCard(item));
});

//Редактирование карточки места
formPopupPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const objectPlace = {name: inputTitle.value, link: inputLink.value};  
  ulContainer.prepend(createCard(objectPlace));
  closePopup(popupEditPlace);
  evt.target.reset();
})