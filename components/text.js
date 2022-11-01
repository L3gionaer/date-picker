import EventEmitter from '../event-emitter.js';

class Text extends EventEmitter {
    constructor({ textContent }) {
        super();

        this.component;
        this.textContent = textContent;

        this._init();
    }

    _init() {
        this._render();
    }

    setText(text) {
        this.component.textContent = text;
    }

    _render() {
        this.component = document.createElement("p");
        this.component.textContent = this.textContent;
    }
}

export default Text;