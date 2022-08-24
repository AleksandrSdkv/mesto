export class Card {
    constructor(data, handleCardClick, cardtemplate) { /** @module Отвечает за генерацию карт*/
        this._data = data;
        this._handleCardClick = handleCardClick;
        this._cardTemplate = cardtemplate;
        this._element = this._getTemplate();
        this.maskGroupImg = this._element.querySelector('.element__mask-group');
        this.maskGroupName = this._element.querySelector('.element__place-name');
        this._likeButton = this._element.querySelector('.element__like-button');
        this._btnRemoveCard = this._element.querySelector('.element__btn-remove');
        this.likesElement = this._element.querySelector('.element__like-counter');
        this.maskGroupImg.src = this._data.link;
        this.maskGroupName.textContent = this._data.name;
        this.maskGroupImg.alt = this._data.name;
        console.log(this._data)
        console.log(this._element)
            // this.likesElement.textContent = this._data.likes.length;
        this._setEventListeners()
    }
    _getTemplate() {
        const cardNewElement = document.querySelector(this._cardTemplate).content.querySelector(".element").cloneNode(true);
        return cardNewElement
    }
    generateCard() {

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
            this._handleCardClick({ name: this._data.name, link: this._data.link });
        });

    }
    _handleLikeBtnClick() {
        this._likeButton.classList.toggle('element__like-button_active');
    }
    _handleTrashBtnClick() {
        this._element.remove();
        this._element = null;
    }

}
