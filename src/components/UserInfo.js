export class UserInfo { /** @module Передает информацию на страницу */
    constructor(userNameSelector, userInfoSelector) {
        this._userName = userNameSelector;
        this._userInfo = userInfoSelector;
        this._avatarSelector = document.querySelector('.profile__avatar');

    }

    //Публичный метод принимает объект с данными пользователя

    getUserInfo() {
        const userData = {};
        userData.name = this._userName.textContent;
        userData.about = this._userInfo.textContent;
        userData.id = this._userId;

        return userData;
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userInfo.textContent = data.about;
        this._avatarSelector.src = data.avatar;
        this._userId = data._id;
    }
}
