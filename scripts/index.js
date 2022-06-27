const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePlaceButton = document.querySelector('.profile__place-button');

const profilePopup = document.querySelector('.popup_type_profile');


const elementList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card_template').content;


const popupCloseButton = profilePopup.querySelector('.popup__button-close');
const formElement = profilePopup.querySelector('.form');
const nameInput = profilePopup.querySelector('.form__input_type_name');
const jobInput = profilePopup.querySelector('.form__input_type_about');

const newPlacePopup = document.querySelector('.popup_type_place');
const formNewElement = newPlacePopup.querySelector('.form');
const placeCloseButton = newPlacePopup.querySelector('.popup__button-close');
const placeName = newPlacePopup.querySelector('.form__input_type_name');
const placeUrl = newPlacePopup.querySelector('.form__input_type_about');
const formGroup = newPlacePopup.querySelector('.form__group');
const picturePopup = document.querySelector('.popup_type_pic');
const picture = picturePopup.querySelector('.popup__img');
const picCloseButton = picturePopup.querySelector('.popup__button-close');
const popupCaption = document.querySelector('.popup__caption');

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
function submitFormHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(profilePopup);
}

// передает подпись
function setPopupImageData(img) {
    picture.src = img.link;
    picture.alt = img.name;
    popupCaption.textContent = img.name;
}

function renderCard(cardNewElement) {
    elementList.prepend(cardNewElement);
}
formElement.addEventListener('submit', submitFormHandler); // открывает создание профиля

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
    nameInput.value = profileName.textContent; //перенос имя профия
    jobInput.value = profileAbout.textContent; //перенос работы профия
    openPopup(profilePopup);
});
// закрытие окна профиля
popupCloseButton.addEventListener('click', function() {
    closePopup(profilePopup);
});

// закрытие окна карточки
picCloseButton.addEventListener('click', function() {
    closePopup(picturePopup);
});

initialCards.forEach((item) => {
    const cardNewElement = createNewCard(item);
    renderCard(cardNewElement);
})

function createNewCard(item) {
    console.log(item);
    const cardNewElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
    const maskGroupImg = cardNewElement.querySelector('.elements__mask-group');
    const maskGroupName = cardNewElement.querySelector('.elements__place-name');
    maskGroupName.textContent = item.name;
    maskGroupImg.src = item.link;
    maskGroupImg.alt = item.link;
    //постановка лайка
    cardNewElement.querySelector('.elements__like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('elements__like_active');
    });
    //удаление карты
    const buttonRemove = cardNewElement.querySelector('.elements__btn-remove');
    buttonRemove.addEventListener("click", function() {
        cardNewElement.remove();
    });
    // открытие карточки
    maskGroupImg.addEventListener('click', function() {
        openPopup(picturePopup);
        setPopupImageData(item);
    });
    return cardNewElement
}

formNewElement.addEventListener('submit', submitFormHandlerPlace); // вызов функции создания карты по клику на кнопку "создать"
function submitFormHandlerPlace(e) {
    e.preventDefault();
    const link = placeUrl.value;
    const name = placeName.value;
    const cardNewElement = createNewCard({
        name,
        link
    });
    renderCard(cardNewElement);
    closePopup(newPlacePopup);
    formNewElement.reset();
}