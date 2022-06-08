let button = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.popup__form-container');
let profileName = document.querySelector('.profile__name')
let profileAbout = document.querySelector('.profile__about')
let submitBottom = document.querySelector('.popup__bottom-submit')
let profile = document.querySelector('.profile__info');
let nameInput = document.querySelector('.popup__form-name');
let jobInput = document.querySelector('.popup__about-form');



function openPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
    popup.classList.remove('popup_opened');
}

function closePopup() {
    popup.classList.add('popup_opened');
}

button.addEventListener('click', function() {
    openPopup()

})
popupCloseButton.addEventListener('click', function(e) {
    if (e.target === e.currentTarget)
        closePopup()
    e.preventDefault();
})


function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup()

}
button.addEventListener('click', function() {
    openPopup()
})

submitBottom.addEventListener('click', formSubmitHandler);