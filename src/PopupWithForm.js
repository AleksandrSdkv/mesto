import { config } from "../scripts/config.js";
import { Popup } from "./Popup.js"

export class PopupWithForm extends Popup {
    constructor(popupElement, handleFormSubmit) {
        super(popupElement)
        this._popupElement = popupElement;
        this._handeFormSubmit = handleFormSubmit;
        this._formElement = this._popupElement.querySelector('.form');
        this._formInputList = this._formElement.querySelector('.form__input');

    }
    _getInputValues() {
        this._formValues = {};

        this._formInputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        console.log(input.name)
            // возвращаем объект значений
        return this._formValues;
    }
    setEventListeners() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
        super.setEventListeners();

    }
    close() {
        super.close();
        this._formElement.reset();
    }
}
