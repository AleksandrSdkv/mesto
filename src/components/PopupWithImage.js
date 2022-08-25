import { Popup } from './Popup.js'

export class PopupWithImage extends Popup { /** @module Отвечает за открытие картинки*/
    constructor(popupElement) {
        super(popupElement);
        this._popupPhotoTitle = document.querySelector('.popup__caption');
        this._popupPhotoImg = document.querySelector('.popup__img');
    }

    open({ name, link }) { //открытие картинки и передача значений
        this._popupPhotoImg.src = link;
        this._popupPhotoImg.alt = name;
        this._popupPhotoTitle.textContent = name;

        super.open();
    }
}
