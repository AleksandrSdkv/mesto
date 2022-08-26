import { data } from "autoprefixer";

export class UserInfo { /** @module Передает информацию на страницу */
    constructor(userNameSelector, userInfoSelector) {
        this._userName = userNameSelector;
        console.log(userNameSelector)
        this._userInfo = userInfoSelector;
        this._avatarSelector = document.querySelector('.profile__avatar');

    }

    //Публичный метод принимает объект с данными пользователя
    getUserInfo() {
        return this._data;

    }


    //Публичный метод принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(data) {
        this._data = data;
        console.log(this._data)
        this._userName.textContent = data.name;
        this._userInfo.textContent = data.about;

    }

    setAvatar(data) {
        this._data = data;
        this._avatarSelector.src = data.avatar;
    }
}
