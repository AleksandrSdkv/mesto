let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.popup__form-container');
let nameInput = document.querySelector('.popup__form-input_type_name');
let jobInput = document.querySelector('.popup__form-input_type_about');

function tooglePopup() {
    popup.classList.toggle('popup_opened');
}



function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    tooglePopup();
}

profileEditButton.addEventListener('click', tooglePopup);

popupCloseButton.addEventListener('click', tooglePopup);

profileEditButton.addEventListener('click', function() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
});


formElement.addEventListener('submit', formSubmitHandler);
