import './index.css';
import {
    initialCards,
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
    placeName,
    placeUrl,
    picturePopup,
    profilePlaceButton
} from '../utils/constants.js';

import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { config } from '../utils/config.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';


//активация валидации
const validateFormNewElement = new FormValidator(config, formNewElement);
const validateProfileForm = new FormValidator(config, profileForm);

validateFormNewElement.enableValidation();
validateProfileForm.enableValidation();

//-------------------------------------------------
//создание карточки
function createCardClass(name, link) { //функция создающая готовую карточку с данными.
    const card = new Card({
            name,
            link
        },
        handleCardClick, '#card_template');
    const cardNewElement = card.generateCard();
    return cardNewElement
}

//-----------------------------------------
//класс отрисовки массива карточек.
const cardList = new Section({
        data: initialCards,
        renderer: (item) => {
            const element = createCardClass(item.name, item.link);
            cardList.addItem(element);
        },
    },
    elementList
);
cardList.renderItems();

//---------------------------------------------
//класс попапа картинки.
const popupPice = new PopupWithImage(picturePopup)

function handleCardClick({ name, link }) {
    popupPice.open({ name, link });
    popupPice.setEventListeners();
};

//------------------------------------------------
//попап редактирвания профиля.
const handleProfileFormSubmit = (formData) => {
    const name = formData.name;
    const info = formData.about;
    profileInfo.setUserInfo({ name, info });
    popupProfileForm.close();
};

const popupProfileForm = new PopupWithForm(profilePopup, handleProfileFormSubmit);
popupProfileForm.setEventListeners();


profileEditButton.addEventListener('click', () => { // слушатель, который сбрасывает валидацию формы профиля и переносит значения в inputs
    validateProfileForm.resetVadlidation();
    const profileValue = profileInfo.getUserInfo();
    nameInput.value = profileValue.name;
    jobInput.value = profileValue.info;
    validateProfileForm.toggleButtonState();
    popupProfileForm.open()
});

//----------------------------------
//управление отображением информации о пользователе на странице.
const profileInfo = new UserInfo(profileName, profileAbout);

//----------------------------------
//код создания новой карточки и работы попапа.
const handleAddElmForm = (formData) => {
    submitFormHandlerPlace();
    popupNewElement.close()
}

const popupNewElement = new PopupWithForm(newPlacePopup, handleAddElmForm);

popupNewElement.setEventListeners();

function submitFormHandlerPlace() {
    const link = placeUrl.value;
    const name = placeName.value;
    const add = createCardClass(name, link);
    cardList.addItem(add);
}


profilePlaceButton.addEventListener('click', () => {
    validateFormNewElement.resetVadlidation();
    popupNewElement.open()
    validateFormNewElement.toggleButtonState();
})