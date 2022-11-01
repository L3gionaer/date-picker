import EventEmitter from "../event-emitter";

class Checkbox extends EventEmitter {
  constructor(initialState) {
    super();

    this.component;
    this._state = initialState;

    this._init();
  }

  _init() {
    this._render();
  }

  _toggle(e) {
    const checked = e.currentTarget.checked;

    this._state = checked;
    this.emit("switch", this._state);
  }

  _render() {
    this.component = document.createElement("input");
    this.component.checked = this._state;
    this.component.addEventListener("click", (e) => this._toggle(e));
    this.component.setAttribute("type", "checkbox");
  }
}

export default Checkbox;
