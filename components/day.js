import EventEmitter from "../event-emitter.js";

// is Current Date? Auslagern

class Day extends EventEmitter {
  #component;
  #isCurrentDate;
  #date;

  constructor({date, isCurrentDate}) {
    super();

    this.#component;
    this.#isCurrentDate = isCurrentDate;
    this.#date = date;

    this.#init();
  }

  get component() {
    return this.#component;
  }

  get date() {
    return this.#date;
  }

  #init() {
    this.#render();
  }

  disable() {
    this.#component.style.color = "grey"
  }

  select() {
    this.#component.style.backgroundColor = "red";
  }

  selectBetween() {
    this.#component.style.backgroundColor = "yellow";
  }

  deselect() {
    this.#component.style.backgroundColor = "transparent";
  }

  highlight() {
    this.#component.style.outline = "1px solid red"
  }

  removeHighlight() {
    this.#component.style.outline = "none"
  }

  currentDate() {
    this.#component.style.backgroundColor = "blue";
  }

  #render() {
    this.#component = document.createElement("td");
    this.#component.setAttribute("data-day", this.#date);
    this.#component.textContent = this.#date;

    if(this.#isCurrentDate) {
      this.currentDate();
    }

    this.#component.addEventListener("click", e => {
      this.emit("click", this);
    });

    this.#component.addEventListener("mouseover", e => {
      this.emit("mouseover", this);
    });

    this.#component.addEventListener("mouseleave", e => {
      this.emit("mouseleave", this);
    })
  }
}

export default Day;
