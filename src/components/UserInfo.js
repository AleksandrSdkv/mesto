export class UserInfo { /** @module Передает информацию на страницу */
    constructor(userNameSelector, userInfoSelector) {
        this._userName = userNameSelector;
        this._userInfo = userInfoSelector;
        this._avatarSelector = document.querySelector('.profile__avatar');


    }

    //Публичный метод возвращает объект с данными пользователя, используется при открытии попапа
    getUserInfo() {
        const userData = {};
        userData.name = this._userName.textContent;
        userData.info = this._userInfo.textContent;

        return userData;
    }

    //Публичный метод принимает новые данные пользователя и добавляет их на страницу
    setUserInfo({ name, info, avatar }) {
        this._userName.textContent = name;
        this._userInfo.textContent = info;
        this._avatarSelector.src = avatar;

    }

}
