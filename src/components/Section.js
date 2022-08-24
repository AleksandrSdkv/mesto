export class Section { /** @module класс отрисовки массива карточек.  */
    constructor({ renderer }, containerSelector) {

        this._functionRender = renderer;
        this._container = containerSelector;
    }

    renderItems(data) {

        data.forEach(item => this._functionRender(item));

    }
    addItem(element) {
        console.log(element)
        this._container.prepend(element);
    }
}
