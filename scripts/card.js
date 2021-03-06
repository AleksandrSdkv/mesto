export class Card {
    constructor(item, setPopupImageData, cardtemplate) {
        this._link = item.link;
        this._name = item.name;
        this._setPopupImageData = setPopupImageData;
        this._cardTemplate = cardtemplate;
    }
    _getTemplate() {
        const cardNewElement = document.querySelector(this._cardTemplate).content.querySelector(".elements__element").cloneNode(true);
        return cardNewElement
    }
    generateCard() {
        this._element = this._getTemplate();
        this.maskGroupImg = this._element.querySelector('.elements__mask-group');
        this.maskGroupName = this._element.querySelector('.elements__place-name');
        this._likeButton = this._element.querySelector('.elements__like');
        this._btnRemoveCard = this._element.querySelector('.elements__btn-remove');
        this.maskGroupImg.src = this._link;
        this.maskGroupName.textContent = this._name;
        this.maskGroupImg.alt = this._name;
        this._setEventListeners()
        return this._element
    }
    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeBtnClick();
        });
        this._btnRemoveCard.addEventListener("click", () => {
            this._handleTrashBtnClick();
        });
        this.maskGroupImg.addEventListener("click", () => {
            this._handleOpenPopupPic();
        });

    }
    _handleLikeBtnClick() {
        this._likeButton.classList.toggle('elements__like_active');
    }
    _handleTrashBtnClick() {
        this._element.remove();
        this._element = null;
    }
    _handleOpenPopupPic() {
        this._setPopupImageData({ name: this._name, link: this._link });
    }
}
