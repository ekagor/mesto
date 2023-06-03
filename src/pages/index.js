import './index.css';
import load from '../images/load3.gif'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDeleteForm from '../components/PopupWithDeleteForm.js';
import Api from '../components/Api.js';
import {
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
} from '../utils/constants.js'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '880e36b7-9ea4-410f-9e5e-ef166a41b5af',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo(settingsInfo);

const popupImage = new PopupWithImage(popupImageSelector);

function creatNewCard(element) {
  const card = new Card(element, selectorTemplate, popupImage.open, popupDelete.open, (likeElement, cardId,) => {
    if (likeElement.classList.contains('card__like_active')) {
      api.deleteLike(cardId)
        .then(res => {
          card.toggleLike(res.likes)
        })
        .catch((error) => console.error(`Ошибка при снятии лайка ${error}`))
    } else {
      api.addLike(cardId)
        .then(res => {
          card.toggleLike(res.likes)
        })
        .catch((error) => console.error(`Ошибка при добавлении лайка ${error}`))
    }
  })
  return card.createCard();
}

function handleSubmit (request, popupInstance, textForCatch = 'Ошибка', lodingText = 'Сохранение...') {
  popupInstance.setupText(true, lodingText)
  request()
    .then(() => {
      popupInstance.close()
    })
    .catch((error) => console.error(`${textForCatch} ${error}`))
    .finally(() => popupInstance.setupText(false))
}

const section = new Section((element) => {
  section.addItemAppend(creatNewCard(element))
  }, listsElementSelector);

const popupProfile = new PopupWithForm(popupProfileSelector, load, (data) => {
  function makeRequest () {
    return api.setUserInfo(data)
    .then(res => {
      userInfo.setUserInfo({name: res.name, job: res.about, avatar: res.avatar})
    })
  }
  handleSubmit(makeRequest, popupProfile, 'Ошибка при редактировании профиля')
});

const popupAddCard = new PopupWithForm(popupAddCardSelector, load, (data) => {
  function makeRequest () {
    return Promise.all([api.getInfo(), api.addCard(data)])
      .then(([dataUser, dataCard]) => {
        dataCard.myid = dataUser._id
        section.addItemPrepend(creatNewCard(dataCard))
      })
  }
  handleSubmit(makeRequest, popupAddCard, 'Ошибка при добавлении карточки', 'Создание...')
});

const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, load, (data) => {
  function makeRequest () {
    return api.setNewAvatar(data)
    .then(res => {
      userInfo.setUserInfo({name: res.name, job: res.about, avatar: res.avatar})
    })
  }
  handleSubmit(makeRequest, popupEditAvatar, 'Ошибка при редактировании аватара')
});

const popupDelete = new PopupWithDeleteForm(popupDeleteSelector, load, ({ card, cardId }) => {
  function makeRequest() {
    return api.deleteCard(cardId)
      .then(() => {
        card.removeCard()
        popupDelete.close()
      })
  }
  handleSubmit(makeRequest, popupDelete, 'Ошибка при удалении карточки', 'Удаление...')
});

Array.from(document.forms).forEach(item => {
  const form = new FormValidator(validationSettings, item);
  const name = item.getAttribute('name');
  formsValidator[name] = form;
  form.enableValidation()
})

const popups = [popupImage, popupProfile, popupAddCard, popupDelete, popupEditAvatar]
popups.forEach(element => element.setEventListeners())

profileEditButtonElement.addEventListener('click', () => {
  formsValidator.profileData.resetValidationState();
  popupProfile.setInputsValue(userInfo.getUserInfo())
  popupProfile.open()
})

profileAddButtonElement.addEventListener('click', () => {
  formsValidator.placeData.resetValidationState();
  popupAddCard.open();
})

avatarElement.addEventListener('click', ()=> {
  formsValidator.editAvatar.resetValidationState()
  popupEditAvatar.open()
})

Promise.all([api.getInfo(), api.getCards()])
  .then(([dataUser, dataCard]) => {
    dataCard.forEach(element => element.myid = dataUser._id);
    userInfo.setUserInfo({ name: dataUser.name, job: dataUser.about, avatar: dataUser.avatar });
    section.addCardFromArray(dataCard);
  })
  .catch((error) => console.error(`Ошибка при создании начальных данных страницы ${error}`))