import './index.css';
import {
    formNewAvatar,
    avatarPopup,
    btnOverlayAvatar,
    notificationPopup,
    profileName,
    profileAbout,
    profileEditButton,
    profilePopup,
    elementList,
    profileForm,
    nameInput,
    jobInput,
    newPlacePopup,
    formNewElement,
    picturePopup,
    profilePlaceButton
} from '../utils/constants.js';

import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';

import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { config, apiConfig } from '../utils/config.js';




/**
 * @description - запускает валидацию.
 */
const validateFormNewElement = new FormValidator(config, formNewElement);
const validateProfileForm = new FormValidator(config, profileForm);
const validateAvataForm = new FormValidator(config, formNewAvatar);

validateFormNewElement.enableValidation();
validateProfileForm.enableValidation();
validateAvataForm.enableValidation();

/**
 * @description - функция создающая готовую карточку с данными.
 */
function createCardClass(data) {
    const card = new Card(
        data,
        handleCardClick, '#card_template', (currentCard, removeCard) => {
            confirmPopup.open();
            confirmPopup.setConfirmAction(() => {
                api.deleteCard(currentCard._id).then(() => {
                    removeCard();
                    confirmPopup.close();
                })
            });
        }, profileInfo.getUserId()
    )
    const cardNewElement = card.generateCard();

    return cardNewElement
}
// api.putLike()

/**
 * @description - Добавление новой карточки через форму.
 */


/**
 * @description - класс отрисовки массива карточек.
 */

const cardList = new Section({
        renderer: (data) => {
            const element = createCardClass(data);
            cardList.addItem(element);
        },
    },
    elementList
);




/**
 * @description - класс попапа картинки.
 */
const popupPice = new PopupWithImage(picturePopup)
popupPice.setEventListeners();

function handleCardClick(name, link) {
    popupPice.open(name, link);
};


/**
 * @description - попап редактирвания профиля.
 */
profileEditButton.addEventListener('click', () => {
    validateProfileForm.resetVadlidation();
    const { name, about } = profileInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = about;
    validateProfileForm.toggleButtonState();
    popupProfileForm.open()
});
const handleProfileFormSubmit = (data) => {
    popupProfileForm.SaveButton(true)

    api.setUserData(data)
        .then((data) => {
            profileInfo.setUserInfo(data)
        }).finally(() => {
            popupProfileForm.SaveButton(false);

        });
    popupProfileForm.close()
}

const popupProfileForm = new PopupWithForm(profilePopup, handleProfileFormSubmit);
popupProfileForm.setEventListeners();


const confirmPopup = new PopupWithConfirmation(notificationPopup)
confirmPopup.setEventListeners()

/**
 * @description - класс содержит методы API запросов
 */
const api = new Api(apiConfig);

/**
 * @description - функция создающая карточки из массива.
 */
api.getUserCards().then(res => cardList.renderItems(res)).catch((err) => {
    console.log(err); // выведем ошибку в консоль
});

/** @description - Загрузка информации о пользователе с сервера */


const avatarFunction = (data) => {
    popupByAvatar.SaveButton(true);
    api.setAvatarData(data)
        .then((res) => {
            profileInfo.setAvatar(res)

        }).finally(() => {
            popupByAvatar.SaveButton(false)
        });

    popupByAvatar.close()
}

const popupByAvatar = new PopupWithForm(avatarPopup, avatarFunction);


const handleAddElmForm = (data) => {
    popupNewElement.SaveButton(true)
    api.pushNewCard(data).then((res) => {
        cardList.addItem(createCardClass(res))
    }).catch((err) => {
        console.log(err); // выведем ошибку в консоль
    }).finally(() => {
        popupNewElement.SaveButton(false);

    });
    popupNewElement.close()
}
const popupNewElement = new PopupWithForm(newPlacePopup, handleAddElmForm);
popupNewElement.setEventListeners();



popupByAvatar.setEventListeners();

btnOverlayAvatar.addEventListener('click', () => {
    validateAvataForm.resetVadlidation();
    popupByAvatar.open();
    validateAvataForm.toggleButtonState();
})




/**
 * @description - слушатель, который сбрасывает валидацию формы профиля и переносит значения в inputs
 */


/**
 * @description - управление отображением информации о пользователе на странице.
 */
const profileInfo = new UserInfo(profileName, profileAbout);


api.getUserData().then((data) => {
    profileInfo.getUserInfo(),
        profileInfo.setUserInfo(data)
    profileInfo.setAvatar(data)
}).catch((err) => {
    console.log(err); // выведем ошибку в консоль
});
profilePlaceButton.addEventListener('click', () => {
    validateFormNewElement.resetVadlidation();
    popupNewElement.open()
    validateFormNewElement.toggleButtonState();
})
