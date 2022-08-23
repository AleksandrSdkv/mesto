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
                console.log(err); // выведем ошибку в консоль
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
}
