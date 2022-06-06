let button = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popap__close-button');
let formElement = document.querySelector('.form__input-container');

let submitBottom = formElement.querySelector('.submit__bottom');
let profile = document.querySelector('.profile__info');
let nameInput = document.querySelector('.form__name');
let jobInput = document.querySelector('.form__about');



function openPopup() {
    popup.classList.remove('popup_hidden');
}

function closePopup() {

    popup.classList.add('popup_hidden');
}
button.addEventListener('click', function() {
    openPopup()

})
popupCloseButton.addEventListener('click', function() {
    if (e.target === e.currentTarget)
        closePopup()

})

function formSubmitHandler(evt) {
    evt.preventDefault();

    nameInput.textContent = $ { nameInput.value }
    jobInput.textContent = $ { jobInput.value }
    `;
    closePopup()

}
button.addEventListener('click', function() {
    openPopup()

})
submitBottom.addEventListener('click', formSubmitHandler);
