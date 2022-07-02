const isValid = (formItem, inputItem, config) => { //прячет или показывает ошибки в зависимости от валидности полей вызывает соотв. функцию
    if (!inputItem.validity.valid) {
        showInputError(formItem, inputItem, inputItem.validationMessage, config)
    } else {
        hideInputError(formItem, inputItem, config)
    }
}

const showInputError = (formItem, inputItem, errorMessage, config) => { // показывает ошибки
    const errorElement = formItem.querySelector(`.${inputItem.id}-error`);
    inputItem.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
}

const hideInputError = (formItem, inputItem, config) => { //прячет ошибки
    const errorElement = formItem.querySelector(`.${inputItem.id}-error`);
    inputItem.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

const toggleButtonState = (inputList, buttonElement, config) => { //регулирует состояние кнопки
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
}

const setEventListeners = (formItem, config) => { //принимает элементы формы и передает полям состояния
    const inputList = Array.from(formItem.querySelectorAll(config.inputSelector));
    const buttonElement = formItem.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);
    inputList.forEach((inputItem) => {
        inputItem.addEventListener('input', () => {
            isValid(formItem, inputItem, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

const resetErrorMessage = (config, form) => { //сбрасывает состояния ошибок, используется при закрытии попапов
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    form.reset();
    inputList.forEach((inputItem) => {
        const errorElement = document.querySelector(`.${inputItem.id}-error`);
        inputItem.classList.remove(config.inputErrorClass);
        errorElement.classList.remove(config.errorClass);
        errorElement.textContent = '';
    });
}

const enableValidation = (config) => { //принимает и обрабатывает все формы на странице
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formItem) => {
        formItem.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formItem, config);
    });
};

const hasInvalidInput = (inputList) => { // принимает массив полей формы и возвращает true, если в нём хотя бы одно поле не валидно, и false, если все валидны.
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}
