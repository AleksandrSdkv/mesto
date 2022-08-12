export class Section {
    constructor({ data, renderer }, containerSelector) {
        this._renderedItems = data;
        this._functionRender = renderer;
        this._container = containerSelector;
    }

    renderItems() {
        console.log(this._renderedItems)
        this._renderedItems.forEach(item => {
            this._functionRender(item);
        });
    }
    addItem(element) {
        this._container.prepend(element);
    }
}
