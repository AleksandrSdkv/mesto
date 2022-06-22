const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePlaceButton = document.querySelector('.profile__place-button');

const popup = document.querySelector('.popup');


const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card_template').content;


const popupCloseButton = popup.querySelector('.popup__button-close');
const formElement = popup.querySelector('.form');
const nameInput = popup.querySelector('.form__input_type_name');
const jobInput = popup.querySelector('.form__input_type_about');

const newPlacePopup = document.querySelector('.popup_type_place');
const formNewElement = newPlacePopup.querySelector('.form');
const placeCloseButton = newPlacePopup.querySelector('.popup__button-close');
const placeName = newPlacePopup.querySelector('.form__input_type_name');
const placeUrl = newPlacePopup.querySelector('.form__input_type_about');
const formGroup = newPlacePopup.querySelector('.form__group');
const picturesPopup = document.querySelector('.popup_type_pic');
const pictures = picturesPopup.querySelector('.popup__img');
const picCloseButton = picturesPopup.querySelector('.popup__button-close');




const initialCards = [{
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
//удаление карточки
function removedCard(card) {
    card.remove();
}
//открытие попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');

}
//закрытие попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');

}
//Отправка формы в профиль
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popup);
}
// открытие изображения
function openPictures(img) {
    pictures.src = img.src;

}

// удаление карты
function removedCard(card) {
    card.remove();
}
// передает подпись
function captionNaming(img) {
    const popupCaption = document.querySelector('.popup__caption');
    popupCaption.textContent = img.textContent;
    popupCaption.alt = img.textContent;
}
// передает подпись
function captionNam(img) {
    const popupCaption = document.querySelector('.popup__caption');
    popupCaption.textContent = img.name;
    popupCaption.alt = img.name;
}

formElement.addEventListener('submit', formSubmitHandler); // открывает создание профиля

// закрытие модального окна создания карточки
placeCloseButton.addEventListener('click', function() {
    closePopup(newPlacePopup);
});
// открытие попапа
profilePlaceButton.addEventListener('click', function() {
    openPopup(newPlacePopup);
});

// Открытие редактирования профиля
profileEditButton.addEventListener('click', function() {
    openPopup(popup);
    nameInput.value = profileName.textContent; //перенос имя профия
    jobInput.value = profileAbout.textContent; //перенос работы профия
});
// закрытие окна профиля
popupCloseButton.addEventListener('click', function() {
    closePopup(popup);
});

// закрытие окна карточки
picCloseButton.addEventListener('click', function() {
    closePopup(picturesPopup);
});


const createNewCard = (e) => {
    e.preventDefault(); // прерывает стандартное действие
    const cardNewElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
    const cardPicture = cardNewElement.querySelector('.elements__mask-group');

    // передает информацию из окна создание карты в сами карточки
    cardPicture.src = placeUrl.value;
    cardPicture.alt = placeName.value;
    cardNewElement.querySelector('.elements__place-name').textContent = placeName.value;
    elementsList.prepend(cardNewElement);
    closePopup(newPlacePopup);

    // постановка лайка
    cardNewElement.querySelector('.elements__like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('elements__like_active');
    });
    // удаление карты
    cardNewElement.querySelector('.elements__btn-remove').addEventListener('click', () => {
        removedCard(cardNewElement);
    });

    // открытие карточки
    cardPicture.addEventListener('click', function() {
        openPopup(picturesPopup);
        openPictures(cardPicture);
        captionNaming(cardNewElement);
    })
    formNewElement.reset(); // очищает input
};
formNewElement.addEventListener('submit', createNewCard); // вызов функции создания карты по клику на кнопку "создать"

// перенос массива на страницу
initialCards.forEach((item) => {
    const cardNewElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
    const maskGroupImg = cardNewElement.querySelector('.elements__mask-group');

    // информация из массива переносится в шаблон карточки
    cardNewElement.querySelector('.elements__place-name').textContent = item.name;
    maskGroupImg.src = item.link;
    maskGroupImg.alt = item.name;
    elementsList.append(cardNewElement);

    // постановка лайка
    cardNewElement.querySelector('.elements__like').addEventListener('click', (evt) => {
        evt.target.classList.toggle('elements__like_active');
    });

    // удаление карты
    cardNewElement.querySelector('.elements__btn-remove').addEventListener('click', () => {
        removedCard(cardNewElement);
    });

    // открытие карточки
    maskGroupImg.addEventListener('click', function() {
        openPopup(picturesPopup);
        openPictures(maskGroupImg);
        captionNam(item);
    });
});
