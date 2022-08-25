import { Popup } from "./Popup.js"

export class PopupWithForm extends Popup { /** @module Отвечает за открытие попапов форм*/
    constructor(popupElement, handleFormSubmit) {
        super(popupElement)
        this._popupElement = popupElement;
        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._popupElement.querySelector('.form');
        this._btnSave = this._formElement.querySelector('.form__bottom-submit');
        this._btnSaveText = this._btnSave.textContent;
        this._formInputList = Array.from(this._formElement.querySelectorAll('.form__input'));

    }
    _getInputValues() {
        this._formValues = {};
        this._formInputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        // возвращаем объект значений
        return this._formValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
    }
    SaveButton(isSave) {
        if (isSave) {
            this._btnSave.textContent = 'Сохранение...'
        } else {
            this._btnSave.textContent = this._btnSaveText;
        }
    }

    close() {
        super.close();
        this._formElement.reset();
    }
}
