import { Popup } from "./Popup.js"
export class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupSelector = popupSelector;
        this._formElement = this._popupSelector.querySelector('.form');
        this._setConfirmAction = () => {}

    }
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => { //Подтверждение удаления
            evt.preventDefault();
            this._setConfirmAction();
        })
    }
    setConfirmAction(action) { //Передает колбек в конструктор
        this._setConfirmAction = action;
    }


}
