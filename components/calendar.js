import EventEmitter from "../../event-emitter.js";
import { getDateAsISO } from "../../helpers/date.js";

import Day from './day.js';

class Calendar extends EventEmitter {
  #component;
  #year;
  #month;
  #firstDayOfMonth;
  #daysOfMonth;

  constructor({ year, month }) {
    super();

    this.#component;

    this.#year = year;
    this.#month = month;

    this.days = [];

    this.#init();
  }

  get component() {
    return this.#component;
  }

  #init() {
    this.#firstDayOfMonth = new Date(this.#year, this.#month, 1).getDay() || 7;
    this.#daysOfMonth = new Date(this.#year, this.#month + 1, 0).getDate();

    this.#render();
  }

  #render() {
    this.#component = document.createElement("div");
    this.#component.classList.add("month");

    const table = document.createElement("table");

    for (let r = 0; r < 6; r++) {
      let row = document.createElement("tr");

      for (let c = 0; c < 7; c++) {
        let count = c + r * 7;
        let dayCount = count + 1 - this.#firstDayOfMonth + 1;

        if (dayCount > 0 && dayCount <= this.#daysOfMonth) {
          const dayAsDate = new Date(this.#year, this.#month, [dayCount]);

          const isCurrentDate = getDateAsISO(dayAsDate) === getDateAsISO(new Date());

          let day = new Day({dayCount, isCurrentDate});
          this.days.push(day);

          if(dayAsDate >= new Date()) {
            day.on("click", day => this.emit("clickOnDay", day));
            day.on("mouseover", day => this.emit("mouseOverDay", day));
            day.on("mouseleave", day => this.emit("mouseLeaveDay", day));
          } else {
            day.disable();
          }
          
          row.append(day.component);
        } else {
          let placeHolder = document.createElement("td");
          placeHolder.textContent = "+";

          row.append(placeHolder);
        }
      }

      table.append(row);
    }

    this.#component.append(table);
  }
}

export default Calendar;
