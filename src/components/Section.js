export class Section { /** @module класс отрисовки массива карточек.  */
    constructor({ data, renderer }, containerSelector) {
        this._renderedItems = data;
        this._functionRender = renderer;
        this._container = containerSelector;
    }

    renderItems() {
        this._renderedItems.forEach(this._functionRender.bind(this));
    }
    addItem(element) {
        this._container.prepend(element);
    }
}