import './index.css';
import {

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
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { config, apiConfig } from '../utils/config.js';

fetch('https://mesto.nomoreparties.co/v1/cohort-48/cards/', {
        headers: {
            authorization: '25ce2e8c-2a55-4b07-a594-407cca6a6dd7',
            "content-type": "application/json"
        },

    }, ).then(res => res.json())
    .then((data) => {
        console.log(data);

    });


/**
 * @description - запускает валидацию.
 */
const validateFormNewElement = new FormValidator(config, formNewElement);
const validateProfileForm = new FormValidator(config, profileForm);



validateFormNewElement.enableValidation();
validateProfileForm.enableValidation();


/**
 * @description - функция создающая готовую карточку с данными.
 */
function createCardClass(data) {
    const card = new Card(
        data,
        handleCardClick, '#card_template');
    const cardNewElement = card.generateCard();
    // console.log(data)
    return cardNewElement
}



const handleAddElmForm = (data) => {
    console.log(data)
    cardList.addItem(createCardClass(data));
    // api.pushNewCard(data)
    popupNewElement.close()
}
const api = new Api(apiConfig);
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

const popupNewElement = new PopupWithForm(newPlacePopup, handleAddElmForm);
popupNewElement.setEventListeners();

/**
 * @description - функция создающая готовую карточку с данными.
 */

api.getUserCards().then(res => cardList.renderItems(res))

/**
 * @description - класс попапа картинки.
 */
const popupPice = new PopupWithImage(picturePopup)
popupPice.setEventListeners();

function handleCardClick(name, link) {
    popupPice.open(name, link);
};


/////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @description - попап редактирвания профиля.
 */
const handleProfileFormSubmit = ({ name, about }) => {
    // console.log({ name, about })
    api.setUserData({ name: name, about: about })
        .then(data => profileInfo.setUserInfo({
            name: data.name,
            info: data.about,
            avatar: data.avatar
        }));
    popupProfileForm.close();
}


const popupProfileForm = new PopupWithForm(profilePopup, handleProfileFormSubmit);
popupProfileForm.setEventListeners();
/////////////////////////////////////////////////////////////////////////////////////////////////

// const popupConfirmationForm = new PopupWithConfirmation(notificationPopup, )
// popupConfirmationForm.setEventListeners();

/**
 * @description - класс содержит методы API запросов
 */

api.getUserData().then(data => profileInfo.setUserInfo({
    /** @description - Загрузка информации о пользователе с сервера */
    name: data.name,
    info: data.about,
    avatar: data.avatar
}));




/**
 * @description - слушатель, который сбрасывает валидацию формы профиля и переносит значения в inputs
 */
profileEditButton.addEventListener('click', () => {
    validateProfileForm.resetVadlidation();
    const { name, info } = profileInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = info;
    validateProfileForm.toggleButtonState();
    popupProfileForm.open()
});

/**
 * @description - управление отображением информации о пользователе на странице.
 */
const profileInfo = new UserInfo(profileName, profileAbout);


/**
 * @description - код создания новой карточки и работы попапа.
 */





profilePlaceButton.addEventListener('click', () => {
    validateFormNewElement.resetVadlidation();
    popupNewElement.open()
    validateFormNewElement.toggleButtonState();
})
