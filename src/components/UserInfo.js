import { data } from "autoprefixer";

export class UserInfo { /** @module Передает информацию на страницу */
    constructor(userNameSelector, userInfoSelector) {
        this._userName = userNameSelector;
        this._userInfo = userInfoSelector;
        this._avatarSelector = document.querySelector('.profile__avatar');

    }

    //Публичный метод возвращает объект с данными пользователя, используется при открытии попапа
    getUserInfo() {
        console.log(this._data)
        return this._data;

    }


    //Публичный метод принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(data) {
        this._data = data;
        this._userName.textContent = data.name;
        this._userInfo.textContent = data.about;

    }
    getUserId() {
        return this._data;
    }
    setAvatar(data) {
        this._avatarSelector.src = data.avatar;
    }
}
