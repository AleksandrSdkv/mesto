export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
        this._buttonElement = formElement.querySelector(config.submitButtonSelector);
    };

    _isValidity(inputElement) { //прячет или показывает ошибки в зависимости от валидности полей вызывает соотв. функцию
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _showInputError(inputElement) { // показывает ошибки
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._config.errorClass);
    };

    _hideInputError(inputElement) { //прячет ошибки
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
    };

    _toggleButtonState(inputList) { //регулирует состояние кнопки
        if (this._hasInvalidInput(inputList)) {
            this._setDisabledButton();
        } else {
            this._setEnabledButton()
        }
    }

    _setDisabledButton() { //регулирует состояние кнопки off
        this._buttonElement.classList.add(this._config.inactiveButtonClass);
        this._buttonElement.disabled = true;
    }

    _setEnabledButton() { //регулирует состояние кнопки on
        this._buttonElement.classList.remove(this._config.inactiveButtonClass)
        this._buttonElement.disabled = false;
    }

    resetVadlidation = () => { //сбрасывает состояния ошибок, используется при открытии попапов
        const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._formElement.reset();
        inputList.forEach((inputItem) => {
            const errorElement = this._formElement.querySelector(`.${inputItem.id}-error`);
            inputItem.classList.remove(this._config.inputErrorClass);
            errorElement.classList.remove(this._config.errorClass);
            errorElement.textContent = '';
        });
        this._toggleButtonState(this._inputList);
    }

    _setEventListeners = () => { // устанавливвает слушатели
        this._toggleButtonState(this._inputList);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    enableValidation() { // включает валидацию формы
        this._setEventListeners();
    };
};
