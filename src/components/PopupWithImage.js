import { Popup } from './Popup.js'

export class PopupWithImage extends Popup { /** @module Отвечает за открытие картинки*/
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPhotoTitle = document.querySelector('.popup__caption');
        this._popupPhotoImg = document.querySelector('.popup__img');
        super.setEventListeners();
    }

    open({ name, link }) { //открытие картинки и передача значений
        this._popupPhotoImg.src = link;
        this._popupPhotoImg.alt = name;
        this._popupPhotoTitle.textContent = name;

        super.open();
    }
}
