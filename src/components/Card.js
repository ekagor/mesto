export default class Card {
  constructor (cardData, selectorTemplate, openImagePopup, openDelete, changeLike) {
    this._link = cardData.link;
    this._name = cardData.name;
    this._cardId = cardData._id;
    this._myId = cardData.myid;
    this._ownerId = cardData.owner._id;
    this._likes = cardData.likes
    this._likesLength = cardData.likes.length;
    this._changeLike = changeLike;
    this._openImagePopup = openImagePopup;
    this._openDelete = openDelete;
    this._cloneElement = document.querySelector(selectorTemplate).content.querySelector('.card').cloneNode(true);
    this._imageElement = this._cloneElement.querySelector('.card__image');
    this._likeIconElement = this._cloneElement.querySelector('.card__like');
    this._trashElement = this._cloneElement.querySelector('.card__trash');
    this._subTitle = this._cloneElement.querySelector('.card__title');
    this._counter = this._cloneElement.querySelector('.card__counter');
  }

  _handleLike = () => {
    this._changeLike(this._likeIconElement, this._cardId)
  }

  _handleDeleteClick = () => {
    this._openDelete({ cardId: this._cardId, card: this });
  }

  _handleOpenImage = () => {
    this._openImagePopup({ title: this._name, link: this._link });
  }

  _setEventListener() {
    this._likeIconElement.addEventListener('click', this._handleLike);
    this._trashElement.addEventListener('click', this._handleDeleteClick);
    this._imageElement.addEventListener('click', this._handleOpenImage);
  }

  _checkLikeStatus() {
    this._likes.forEach(item => {
      if (item._id === this._myId) {
        this._likeIconElement.classList.add('card__like_active')
        return
      }
    })
    this._counter.textContent = this._likesLength
  }

  _changeVisibleForTrashButton() {
    this._myId === this._ownerId ? this._trashElement.style.display = 'block' : this._trashElement.style.display = 'none'
  }

  removeCard() {
    this._cloneElement.remove()
    this._cloneElement = null
  }

  toggleLike(likes) {
    this._likeIconElement.classList.toggle('card__like_active')
    this._counter.textContent = likes.length
  }

  createCard() {
    this._imageElement.src = this._link;
    this._imageElement.alt = `Изображение ${this._name}`;
    this._subTitle.textContent = this._name;
    this._checkLikeStatus()
    this._changeVisibleForTrashButton()
    this._setEventListener();
    return this._cloneElement;
  }
}