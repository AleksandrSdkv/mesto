export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._functionRender = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._renderedItems.forEach(item => {
            this._functionRender(item);
        });
    }
    addItem(element) {
        this._container.prepend(element);
    }
}