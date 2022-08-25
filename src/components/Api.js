export class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;

    }
    getUserData() {
        return fetch(`${this._url}/users/me`, { headers: this._headers })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });

    }
    getUserCards() {
        return fetch(`${this._url}/cards`, { headers: this._headers })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .catch((err) => {
                console.log('Ошибка: ', err); // выведем ошибку в консоль
            });
    }
    setUserData(data) {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        })
    }
    setAvatarData(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        })
    }
    pushNewCard(data) {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        })

    }

    deleteCard(cardID) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-48/cards/${cardID}`, {
            headers: this._headers,
            method: 'DELETE',
        }).then(res => {
            if (res.ok) {
                return res.json();

            }
        })
    }
    setLike(cardID) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-48/cards/${cardID}/likes`, {
            headers: this._headers,
            method: 'PUT',
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        })
    }

    removeLike(cardID) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-48/cards/${cardID}/likes`, {
            headers: this._headers,
            method: 'DELETE',
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        })
    }
}
