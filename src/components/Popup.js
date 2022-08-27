export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscCloseBinded = this._handleEscClose.bind(this);
    }
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscCloseBinded);
    }
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscCloseBinded);
    }
    _handleEscClose(evt) { //Метод позволяющий закрывать попапы по Esc
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    setEventListeners() { //Метод позволяющий закрывать попапы по клику на крестик и оверлей
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened') || (evt.target.classList.contains('popup__close'))) {
                this.close();
            }
        })
    }
}
