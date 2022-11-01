import EventEmitter from "../../event-emitter.js";

// is Current Date? Auslagern

class Day extends EventEmitter {
  constructor({dayCount, isCurrentDate}) {
    super();

    this.component;
    this.isCurrentDate = isCurrentDate;
    this.dayCount = dayCount;

    this._init();
  }

  _init() {
    this._render();
  }

  disable() {
    this.component.style.color = "grey"
  }

  select() {
    this.component.style.backgroundColor = "red";
  }

  selectBetween() {
    this.component.style.backgroundColor = "yellow";
  }

  deselect() {
    this.component.style.backgroundColor = "transparent";
  }

  highlight() {
    this.component.style.outline = "1px solid red"
  }

  removeHighlight() {
    this.component.style.outline = "none"
  }

  currentDate() {
    this.component.style.backgroundColor = "blue";
  }

  _render() {
    this.component = document.createElement("td");
    this.component.setAttribute("data-day", this.dayCount);
    this.component.textContent = this.dayCount;

    if(this.isCurrentDate) {
      this.currentDate();
    }

    this.component.addEventListener("click", e => {
      this.emit("click", this);
    });

    this.component.addEventListener("mouseover", e => {
      this.emit("mouseover", this);
    });

    this.component.addEventListener("mouseleave", e => {
      this.emit("mouseleave", this);
    })
  }
}

export default Day;
