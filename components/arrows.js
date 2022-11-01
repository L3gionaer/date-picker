import EventEmitter from '../event-emitter.js';

class Arrows extends EventEmitter {
    constructor() {
        super();

        this.component;

        this._init();
    }

    _init() {
        this._render();
    }

    _render() {
        this.component = document.createElement("div");
        this.component.style.display = "flex"; //remove

        const arrowLeft = document.createElement("div");
        arrowLeft.textContent = "<";

        arrowLeft.addEventListener("click", () => {
            this.emit("clickPrevious");
        })

        const arrowRight = document.createElement("div");
        arrowRight.textContent = ">";

        arrowRight.addEventListener("click", () => {
            this.emit("clickNext");
        })

        this.component.append(arrowLeft);
        this.component.append(arrowRight);
    }
}

export default Arrows;