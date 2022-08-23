export const config = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__bottom-submit',
    inactiveButtonClass: 'form__bottom-submit_status_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active',
};
export const apiConfig = {
    url: "https://mesto.nomoreparties.co/v1/cohort-48",
    headers: {
        authorization: '25ce2e8c-2a55-4b07-a594-407cca6a6dd7',
        "content-type": "application/json"
    }
};
