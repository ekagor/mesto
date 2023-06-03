export default class Section {
  constructor (renderer, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addCardFromArray(dataCard) {
    dataCard.forEach(element => {
      this._renderer(element)
    })
  }

  addItemPrepend(item) {
    this._container.prepend(item);
  }

  addItemAppend(item) {
    this._container.append(item);
  }
}
