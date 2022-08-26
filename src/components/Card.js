export class Card {
    constructor(data, cardtemplate, handler) { /** @module Отвечает за генерацию карт*/
        this._data = data;
        this._onLikeHandler = handler.onLike;
        this._removePic = handler.onDeleteCard;
        this._handleCardClick = handler.onClick;
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
        this.likesElement.textContent = this._data.likes.length;
        if (this.isLiked()) {
            this._likeButton.classList.add('element__like-button_active');
        } else {
            this._likeButton.classList.remove('element__like-button_active');
        }
        if (!this.isOwner()) {
            this._btnRemoveCard.remove();
        }
        this._setEventListeners()
    }

    isLiked() {
        return this._data.likes.some((item) => {
            return this._data.currentUser._id === item._id
        })
    }
    isOwner() {

        return this._data.currentUser._id === this._data.owner._id
    }

    _handleLike() {
        // вызов колбека, который пришёл снаружи
        this._onLikeHandler(
            this._data,
            (updatedLikes) => {
                this._data.likes = updatedLikes;
                this._likeButton.classList.toggle('element__like-button_active', this.isLiked());
                this.likesElement.textContent = this._data.likes.length;
            });
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
            this._handleLike();
        });
        this._btnRemoveCard.addEventListener("click", () => {
            this._removePic(this._data, () => {
                this._handleTrashBtnClick();
            });
        });
        this.maskGroupImg.addEventListener("click", () => {
            this._handleCardClick({ name: this._data.name, link: this._data.link });
        });
    }
    _handleTrashBtnClick() {
        this._element.remove();
        this._element = null;
    }

}
