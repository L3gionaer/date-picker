import EventEmitter from "../event-emitter";

class Button extends EventEmitter {
  constructor(text) {
    super();

    this.text = text;
    this.component;

    this._init();
  }

  _init() {
    this._render();
  }

  _render() {
    this.component = document.createElement("button");
    this.component.addEventListener("click", () => {
      this.emit("click");
    });
    this.component.textContent = this.text;
  }
}

export default Button;
