import { initialCards } from './Cards.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './card.js';
import { config } from './config.js';

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePlaceButton = document.querySelector('.profile__place-button');

const profilePopup = document.querySelector('.popup_type_profile');
const popups = document.querySelectorAll('.popup')

const elementList = document.querySelector('.elements__list');

const profileForm = profilePopup.querySelector('.form');
const nameInput = profilePopup.querySelector('.form__input_type_name');
const jobInput = profilePopup.querySelector('.form__input_type_about');

const newPlacePopup = document.querySelector('.popup_type_place');
const formNewElement = newPlacePopup.querySelector('.form');

const placeName = newPlacePopup.querySelector('.form__input_type_name');
const placeUrl = newPlacePopup.querySelector('.form__input_type_about');

const picturePopup = document.querySelector('.popup_type_pic');
const picture = picturePopup.querySelector('.popup__img');

const popupCaption = document.querySelector('.popup__caption');

//активация валидации
const validateFormNewElement = new FormValidator(config, formNewElement);
const validateProfileForm = new FormValidator(config, profileForm);

validateFormNewElement.enableValidation();
validateProfileForm.enableValidation();

//открытие попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
}

//закрытие попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
    clearInput(popup);
}

function clearInput(popup) {
    const form = popup.querySelector('.form');
    form.reset();
}

//Отправка формы в профиль
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(profilePopup);
}

// передает подпись
function setPopupImageData(img) {
    openPopup(picturePopup);
    picture.src = img.link;
    picture.alt = img.name;
    popupCaption.textContent = img.name;
}

function renderCard(cardNewElement) {
    elementList.prepend(cardNewElement);
}

profileForm.addEventListener('submit', handleProfileFormSubmit); // открывает создание профиля

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened') || (evt.target.classList.contains('popup__close'))) {
            closePopup(popup)
        }
    })
})

// закрытие попапа по клавише
function closePopupByEsc(evt) {
    if (evt.code === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

// открытие попапа профиля  и сброс ошибок валидации
profilePlaceButton.addEventListener('click', function() {
    validateFormNewElement.resetVadlidation();
    validateFormNewElement.toggleButtonState();
    openPopup(newPlacePopup);
});

// Открытие редактирования профиля и сброс ошибок валидации
profileEditButton.addEventListener('click', function() {
    openPopup(profilePopup);
    validateProfileForm.resetVadlidation();
    nameInput.value = profileName.textContent; //перенос имя профия
    jobInput.value = profileAbout.textContent; //перенос работы профия
    validateProfileForm.toggleButtonState();
});




formNewElement.addEventListener('submit', submitFormHandlerPlace); // вызов функции создания карты по клику на кнопку "создать"
function createCardClass(card) { //функция создающая готовую карточку с данными
    return card.generateCard();
}

function submitFormHandlerPlace(e) {
    e.preventDefault();
    const link = placeUrl.value;
    const name = placeName.value;
    const card = new Card({
        name,
        link
    }, setPopupImageData, '#card_template');

    const cardNewElement = createCardClass(card); // Создаём карточку и возвращаем наружу
    renderCard(cardNewElement);
    closePopup(newPlacePopup);

}

initialCards.forEach((item) => {
    const card = new Card(item, setPopupImageData, '#card_template');
    const cardNewElement = card.generateCard();
    renderCard(cardNewElement);
})
