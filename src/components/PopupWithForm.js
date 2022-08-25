import { Popup } from "./Popup.js"

export class PopupWithForm extends Popup { /** @module Отвечает за открытие попапов форм*/
    constructor(popupElement, handleFormSubmit) { //Передаем колбек
        super(popupElement)
        this._popupElement = popupElement;
        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._popupElement.querySelector('.form');
        this._btnSave = this._formElement.querySelector('.form__bottom-submit');
        this._btnSaveText = this._btnSave.textContent;
        this._formInputList = Array.from(this._formElement.querySelectorAll('.form__input')); //Собираем коллекцию инпутов

    }
    _getInputValues() {
        this._formValues = {}; //Передаем их в массив
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
            this._handleFormSubmit(this._getInputValues()); //Передаем данные в колбек
        })
    }
    SaveButton(isSave) { //Метод реализует UX с кнопкой всех submit попапов
        if (isSave) {
            this._btnSave.textContent = 'Сохранение...'
        } else {
            this._btnSave.textContent = this._btnSaveText;
        }
    }

    close() { //закрывает и отчищает инпуты
        super.close();
        this._formElement.reset();
    }
}
