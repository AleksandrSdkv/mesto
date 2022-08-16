export const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profilePopup = document.querySelector('.popup_type_profile');
export const elementList = document.querySelector('.element-list');

export const profileForm = profilePopup.querySelector('.form');
export const nameInput = profilePopup.querySelector('.form__input_type_name');
export const jobInput = profilePopup.querySelector('.form__input_type_about');
export const newPlacePopup = document.querySelector('.popup_type_place');
export const formNewElement = newPlacePopup.querySelector('.form');

export const placeName = newPlacePopup.querySelector('.form__input_type_name');
export const placeUrl = newPlacePopup.querySelector('.form__input_type_about');

export const picturePopup = document.querySelector('.popup_type_pic');
export const profilePlaceButton = document.querySelector('.profile__place-button');
