export class UserInfo { /** @module Передает информацию на страницу */
    constructor(userNameSelector, userInfoSelector) {
        this._userName = userNameSelector;
        this._userInfo = userInfoSelector;
    }

    //Публичный метод возвращает объект с данными пользователя, используется при открытии попапа
    getUserInfo() {
        const userData = {};

        userData.name = this._userName.textContent;
        userData.info = this._userInfo.textContent;

        return userData;
    }

    //Публичный метод принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(name, info) {
        this._userName.textContent = name;
        this._userInfo.textContent = info;
    }
}