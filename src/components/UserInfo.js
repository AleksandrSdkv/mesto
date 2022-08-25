export class UserInfo { /** @module Передает информацию на страницу */
    constructor(userNameSelector, userInfoSelector) {


        this._userName = userNameSelector;
        this._userInfo = userInfoSelector;
        this._avatarSelector = document.querySelector('.profile__avatar');
        this._id = getUserId();
    }

    //Публичный метод возвращает объект с данными пользователя, используется при открытии попапа
    getUserInfo() {
        return this._data;
    }


    //Публичный метод принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(data) {
        this._data = data;
        this._userName.textContent = data.name;
        this._userInfo.textContent = data.about;
        return this._id = this._data;

    }
    getUserId() {

        return this._id;
    }
    setAvatar(data) {

        this._avatarSelector.src = data.avatar;

    }
}
