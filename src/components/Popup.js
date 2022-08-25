export class Popup {
    constructor(popupElement) {
        this._popupElement = popupElement;
        this._handleEscCloseBinded = this._handleEscClose.bind(this);
    }
    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscCloseBinded);
    }
    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscCloseBinded);
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    setEventListeners() {
        this._popupElement.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened') || (evt.target.classList.contains('popup__close'))) {
                this.close();
            }
        })
    }
}
