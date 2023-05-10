export default class Card {
  constructor (cardData, selectorTemlate, openImagePopup) {
    this._link = cardData.link;
    this._name = cardData.name;
    this._selectorTemlate = selectorTemlate;
    this._openImagePopup = openImagePopup;
  }

  _getTemplate() {
    return document.querySelector(this._selectorTemlate).content.querySelector('.card').cloneNode(true);
  }
  
  _handleDeleteClick(evt) {
    evt.target.closest('.card').remove();
  }

  _handleCardClick(evt) {
    evt.target.classList.toggle('card__like_active');
  }
  
  _handleOpenImage = (evt) => {
    this._cardData = {name: evt.target.alt, link: evt.target.src};
    this._openImagePopup(this._cardData);
  }

  _setEventListener() {
    this._cardLike.addEventListener('click', this._handleCardClick);
    this._trashCard.addEventListener('click', this._handleDeleteClick);
    this._cardImage.addEventListener('click', this._handleOpenImage);
  }

  createCard = () => {
    this._cloneCard = this._getTemplate();
    this._cardImage = this._cloneCard.querySelector('.card__image');
    this._cardLike = this._cloneCard.querySelector('.card__like');
    this._trashCard = this._cloneCard.querySelector('.card__trash');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cloneCard.querySelector('.card__title').textContent = this._name;
    this._setEventListener();
    return this._cloneCard;
  }
}