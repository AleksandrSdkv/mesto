export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._closePopupByEsc = this._closePopupByEsc.bind(this);
        this._closeButton = this._popup.querySelector('.popup__close');
    }
    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._closePopupByEsc);
    }
    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closePopupByEsc);
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    setEventListeners() {
        this._popupSelector.forEach((popup) => {
            popup.addEventListener('mousedown', (evt) => {
                if (evt.target.classList.contains('popup_opened') || (evt.target.classList.contains(this._closeButton))) {
                    this.close();
                }
            })
        })
    }
}
