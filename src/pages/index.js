import './index.css';
import {
    formNewAvatar,
    btnOverlayAvatar,
    profileName,
    profileAbout,
    profileEditButton,
    elementList,
    profileForm,
    nameInput,
    jobInput,
    formNewElement,
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
 * @description - Создание классов валидации форм попапов(Профиль, добавление карт, смена аватара),запускает валидацию.
 */
const validateFormNewElement = new FormValidator(config, formNewElement);
const validateProfileForm = new FormValidator(config, profileForm);
const validateAvataForm = new FormValidator(config, formNewAvatar);

validateFormNewElement.enableValidation();
validateProfileForm.enableValidation();
validateAvataForm.enableValidation();

/**
 * @description - класс содержит методы API запросов
 */
const api = new Api(apiConfig);

/**
 * @description - функция вызывающая методы классов API, UserInfo, PopupWithForm.Создающая карточку и наполняет функциональностью
 */
function createCardClass(data) {
    data.currentUser = profileInfo.getUserInfo();
    const card = new Card(
        data, '#card_template', {
            onClick: handleCardClick, // открытие попапа
            onDeleteCard: (currentCard, removeCard) => { // функциональность удаление карты
                confirmPopup.open();
                confirmPopup.setConfirmAction(() => {
                    api.deleteCard(currentCard._id).then(() => { // отправляем запрос
                            removeCard();
                            confirmPopup.close();
                        })
                        .catch((err) => {
                            console.log('Ошибка: ', err); // выведем ошибку в консоль
                        });
                });
            },
            onLike: (currentCard, likeCallback) => { // функциональность постановки лайка
                if (card.isLiked()) {
                    api.removeLike(currentCard._id).then((updatedCard) => likeCallback(updatedCard.likes))
                        .catch((err) => {
                            console.log('Ошибка: ', err); // выведем ошибку в консоль
                        });
                } else {
                    api.setLike(currentCard._id).then((updatedCard) => likeCallback(updatedCard.likes))
                        .catch((err) => {
                            console.log('Ошибка: ', err); // выведем ошибку в консоль
                        });
                }
            }
        })
    const cardNewElement = card.generateCard();
    return cardNewElement;
}

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
const popupPice = new PopupWithImage('.popup_type_pic')

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
const handleProfileFormSubmit = (data) => { // колбек 130 строка
    popupProfileForm.saveButton(true);
    api.setUserData(data)
        .then((data) => {
            profileInfo.setUserInfo(data);
            popupProfileForm.close();
        })
        .catch((err) => {
            console.log('Ошибка: ', err); // выведем ошибку в консоль
        })
        .finally(() => {
            popupProfileForm.saveButton(false);
        });

}

const popupProfileForm = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
popupProfileForm.setEventListeners();

/**
 * @description - Попап перед удалением карты.
 */

const confirmPopup = new PopupWithConfirmation('.popup_type_notification');
confirmPopup.setEventListeners();

Promise.all([api.getUserCards(), api.getUserData()])
    .then(([initialCards, data]) => {
        profileInfo.setUserInfo(data)
        cardList.renderItems(initialCards)
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });

/** @description - Работа с аватаром пользователя */

btnOverlayAvatar.addEventListener('click', () => {
    validateAvataForm.resetVadlidation();
    popupByAvatar.open();
    validateAvataForm.toggleButtonState();
})

const avatarFunction = (data) => {
    popupByAvatar.saveButton(true);
    api.setAvatarData(data)
        .then((res) => {
            profileInfo.setUserInfo(res);
            popupByAvatar.close();

        }).catch((err) => {
            console.log('Ошибка: ', err); // выведем ошибку в консоль
        })
        .finally(() => {
            popupByAvatar.saveButton(false);
        });
}
const popupByAvatar = new PopupWithForm('.popup_type_for-avatar', avatarFunction);
popupByAvatar.setEventListeners();

/**
 * @description - Работа с попапом создания карточки
 */

const handleAddElmForm = (data) => { // колбек 191 строка
    popupNewElement.saveButton(true);
    api.pushNewCard(data).then((res) => {
            cardList.addItem(createCardClass(res))
            popupNewElement.close()
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            popupNewElement.saveButton(false);
        });
}
const popupNewElement = new PopupWithForm('.popup_type_place', handleAddElmForm); // попап создания карты

popupNewElement.setEventListeners();
profilePlaceButton.addEventListener('click', () => {
    validateFormNewElement.resetVadlidation();
    popupNewElement.open()
    validateFormNewElement.toggleButtonState();
})

/**
 * @description - управление отображением информации о пользователе на странице.
 */

const profileInfo = new UserInfo(profileName, profileAbout);
