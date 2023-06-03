import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector)
    this._popupImage = this._popup.querySelector('.img-popup__image');
    this._imagePopupCaption = this._popup.querySelector('.img-popup__caption');
  }

  open = (cardData) => {
    this._popupImage.src = cardData.link;
    this._popupImage.alt = `Изображение ${cardData.title}`;
    this._imagePopupCaption.textContent = cardData.title;
    super.open();
  }
}