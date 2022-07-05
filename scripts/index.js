const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePlaceButton = document.querySelector('.profile__place-button');

const profilePopup = document.querySelector('.popup_type_profile');
const popups = document.querySelectorAll('.popup')

const elementList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card_template').content;



const profileForm = profilePopup.querySelector('.form');
const nameInput = profilePopup.querySelector('.form__input_type_name');
const jobInput = profilePopup.querySelector('.form__input_type_about');

const newPlacePopup = document.querySelector('.popup_type_place');
const formNewElement = newPlacePopup.querySelector('.form');
const newPlacePopupBtn = newPlacePopup.querySelector('.form__bottom-submit');

const placeName = newPlacePopup.querySelector('.form__input_type_name');
const placeUrl = newPlacePopup.querySelector('.form__input_type_about');
const formGroup = newPlacePopup.querySelector('.form__group');
const picturePopup = document.querySelector('.popup_type_pic');
const picture = picturePopup.querySelector('.popup__img');

const popupCaption = document.querySelector('.popup__caption');

// передает в модуль валидации(validate.js) объект находящиийся в файле config.js
enableValidation(config);

//удаление карточки
function removedCard(card) {
    card.remove();
}

//открытие попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
}

//закрытие попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
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
    picture.src = img.link;
    picture.alt = img.name;
    popupCaption.textContent = img.name;
}

function renderCard(cardNewElement) {
    elementList.prepend(cardNewElement);
}

profileForm.addEventListener('submit', handleProfileFormSubmit); // открывает создание профиля

popups.forEach((popup) => { // магический метод выполняющий закрытие выбранного попапа по клику на крестик и, внимание, на оверлей одновременно.
    popup.addEventListener('mousedown', (evt) => { // бесценный опыт!
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
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
    const form = newPlacePopup.querySelector('.form');
    resetVadlidation(config, form);
    openPopup(newPlacePopup);
});

// Открытие редактирования профиля и сброс ошибок валидации
profileEditButton.addEventListener('click', function() {
    const form = profilePopup.querySelector('.form');
    resetVadlidation(config, form);
    openPopup(profilePopup);
    nameInput.value = profileName.textContent; //перенос имя профия
    jobInput.value = profileAbout.textContent; //перенос работы профия
});

initialCards.forEach((item) => {
    const cardNewElement = createNewCard(item);
    renderCard(cardNewElement);
})

function createNewCard(item) {
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
    newPlacePopupBtn.disabled = true;
    newPlacePopupBtn.classList.add('form__bottom-submit_status_inactive');
}
