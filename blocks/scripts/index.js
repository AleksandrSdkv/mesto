let profileName = document.querySelector('.profile__name')
let profileAbout = document.querySelector('.profile__about')
let profile = document.querySelector('.profile__info');
let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.popup__form-container');
let nameInput = document.querySelector('.popup__form-input_name');
let jobInput = document.querySelector('.popup__form-input_about');

function closePopup() {
    popup.classList.remove('popup_opened');
}

function openPopup() {
    popup.classList.add('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup()
}


profileEditButton.addEventListener('click', function() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
})


profileEditButton.addEventListener('click', openPopup); {}

popupCloseButton.addEventListener('click', function(e) {
    if (e.target === e.currentTarget)
        closePopup()
})

formElement.addEventListener('submit', formSubmitHandler);
