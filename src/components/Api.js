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
    pushNewCard(formData) {
            return fetch(`${this._url}/cards`, {
                headers: this._headers,
                method: "POST",
                body: JSON.stringify({
                    name: formData.place,
                    link: formData.url
                })
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
        }
        // _isCardLiked() {
        //     const isLiked = this._likes.find(like => like._id === this._ownerID);
        //     return isLiked;
        //     this._ownerID = '2341679b0114bf727da8f477'
        //     this._isCardMine = data.owner._id === this._ownerID;
        // }

}
