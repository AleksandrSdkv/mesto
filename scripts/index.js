import { initialCards } from './cards.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { config } from './config.js';
import { Section } from '../src/Section.js';
import { PopupWithImage } from '../src/PopupWithImage.js';

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

const cardList = new Section({
        data: initialCards,
        renderer: (item) => {
            const element = createCardClass(item.name, item.link)
            cardList.addItem(element)
        },
    },
    elementList
);
cardList.renderItems()


const popupPice = new PopupWithImage(picturePopup)

function createCardClass(name, link) { //функция создающая готовую карточку с данными
    const card = new Card({
        name,
        link
    }, () => {
        popupPice.open({ name, link });
    }, '#card_template');
    const cardNewElement = card.generateCard();
    return cardNewElement

}
console.log(elementList)





// //закрытие попапа
// function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', closePopupByEsc);
//     clearInput(popup);
// }

// function clearInput(popup) {
//     const form = popup.querySelector('.form');
//     if (form !== null) {
//         form.reset();
//     }
// }

// //Отправка формы в профиль
// function handleProfileFormSubmit(evt) {
//     evt.preventDefault();
//     profileName.textContent = nameInput.value;
//     profileAbout.textContent = jobInput.value;
//     closePopup(profilePopup);
// }

// // передает подпись


// function renderCard(cardNewElement) {
//     elementList.prepend(cardNewElement);
// }



// function submitFormHandlerPlace(e) {
//     e.preventDefault();
//     const link = placeUrl.value;
//     const name = placeName.value;
//     createCardClass(name, link);
//     closePopup(newPlacePopup);
// }
// profileForm.addEventListener('submit', handleProfileFormSubmit); // открывает создание профиля

// popups.forEach((popup) => {
//     popup.addEventListener('mousedown', (evt) => {
//         if (evt.target.classList.contains('popup_opened') || (evt.target.classList.contains('popup__close'))) {
//             closePopup(popup)
//         }
//     })
// })

// // закрытие попапа по клавише
// function closePopupByEsc(evt) {
//     if (evt.code === 'Escape') {
//         const popup = document.querySelector('.popup_opened');
//         closePopup(popup);
//     }
// }

// // открытие попапа профиля  и сброс ошибок валидации
// profilePlaceButton.addEventListener('click', function() {
//     validateFormNewElement.resetVadlidation();
//     validateFormNewElement.toggleButtonState();
//     openPopup(newPlacePopup);
// });

// // Открытие редактирования профиля и сброс ошибок валидации
// profileEditButton.addEventListener('click', function() {
//     openPopup(profilePopup);
//     validateProfileForm.resetVadlidation();
//     nameInput.value = profileName.textContent; //перенос имя профия
//     jobInput.value = profileAbout.textContent; //перенос работы профия
//     validateProfileForm.toggleButtonState();
// });

// formNewElement.addEventListener('submit', submitFormHandlerPlace); // вызов функции создания карты по клику на кнопку "создать"
