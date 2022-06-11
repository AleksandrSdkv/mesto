let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__input_type_name');
let jobInput = document.querySelector('.form__input_type_about');

profileEditButton.addEventListener('click', function tooglePopup() { //объявление открытие/закрытие попапа
    popup.classList.toggle('popup_opened'); //добавлением "паранжи"

    nameInput.value = profileName.textContent; //перенос имя профия
    jobInput.value = profileAbout.textContent; //перенос работы профия

    popupCloseButton.addEventListener('click', tooglePopup); //закрытие попапа

    function formSubmitHandler(evt) { //добавление нового имени и занятия
        evt.preventDefault();
        profileName.textContent = nameInput.value;
        profileAbout.textContent = jobInput.value;
        tooglePopup();
    }
    formElement.addEventListener('submit', formSubmitHandler);
});