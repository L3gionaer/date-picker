import EventEmitter from "../../event-emitter.js";

class Row extends EventEmitter {
  constructor() {
    super();

    this.component;

    this._init();
  }

  _init() {
    this._render();
  }

  append() {

  }

  _render() {
    this.component = document.createElement("tr");
    
  }

  /*onClick(day) {
    //const selectedDay = parseInt(e.currentTarget.dataset.day);
    const selectedDate = new Date(this.year, this.month, [day.dayCount]);

    this.days[day.dayCount].selectDay(true);
    console.log("day", day);

    this.emit("mouseOverDate", selectedDate);
  }

  onMouseOver(day) {
    //const selectedDate = new Date(this.year, this.month, [day.dayCount]);

    this.emit("mouseOverDate", day);
  }*/
}

export default Row;
