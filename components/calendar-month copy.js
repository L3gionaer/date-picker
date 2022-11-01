import EventEmitter from "../event-emitter.js";
import { getDateWithoutTime } from "../helpers/date.js";

import Day from './calendar/day.js';

class Month extends EventEmitter {
  constructor({ year, month }) {
    super();

    this.component;

    this.year = year;
    this.month = month;

    this.days = [];
    this.selectedDay;
    this.onMouseOverDay;

    this._init();
  }

  _init() {
    this.firstDayOfMonth = new Date(this.year, this.month, 1).getDay() || 7;
    this.daysOfMonth = new Date(this.year, this.month + 1, 0).getDate();

    this._render();
  }

  _render() {
    this.component = document.createElement("div");
    this.component.classList.add("month");

    const table = document.createElement("table");

    for (let r = 0; r < 6; r++) {
      let row = document.createElement("tr");

      for (let c = 0; c < 7; c++) {
        //let day = document.createElement("td");

        let count = c + r * 7;
        let dayCount = count + 1 - this.firstDayOfMonth + 1;

        if (dayCount > 0 && dayCount <= this.daysOfMonth) {
          //day.setAttribute("data-day", `${dayCount}`);
          //day.textContent = dayCount;
          const isCurrentDate = getDateWithoutTime(new Date(this.year, this.month, [dayCount])) === getDateWithoutTime(new Date())

          let day = new Day({dayCount, isCurrentDate});
          this.days.push(day);

          /*if (
            getDateWithoutTime(
              new Date(this.year, this.month, [dayCount])
            ) === getDateWithoutTime(new Date())
          )*/
            //day.style.backgroundColor = "blue";

          //How to change
          /*if (this.startDate) {
            if (
              getDateWithoutTime(
                new Date(this.year, this.month, [dayCount])
              ) === getDateWithoutTime(this.startDate)
            )
              day.style.backgroundColor = "red";
          }*/
          

          /*if (this.endDate) {
            if (
              getDateWithoutTime(
                new Date(this.year, this.month, [dayCount])
              ) === getDateWithoutTime(this.endDate)
            )
              day.style.backgroundColor = "red";
          }*/
          day.on("click", (dayCount) => {
            const selectedDay = parseInt(e.currentTarget.dataset.day);
            const selectedDate = new Date(this.year, this.month, [selectedDay]);

            this.emit("selectDate", selectedDate);
          })
          /*day.addEventListener("click", (e) => {
            const selectedDay = parseInt(e.currentTarget.dataset.day);
            const selectedDate = new Date(this.year, this.month, [selectedDay]);

            this.emit("selectDate", selectedDate);
          });*/
          day.on("mouseover", (dayCount) => {
            const selectedDay = parseInt(e.currentTarget.dataset.day);
            const selectedDate = new Date(this.year, this.month, [selectedDay]);

            this.emit("mouseOverDate", selectedDate);
          })
          
          /*day.addEventListener("mouseover", (e) => {
            const selectedDay = parseInt(e.currentTarget.dataset.day);
            const selectedDate = new Date(this.year, this.month, [selectedDay]);

            this.emit("mouseOverDate", selectedDate);
          });*/
          row.append(day.component);
        } else {
          //let day = new Day({dayCount: "+"});
          let day = document.createElement("td");
          day.textContent = "+";

          row.append(day);
        }
      }

      table.append(row);
    }

    /*const dateText = document.createElement("p");

    dateText.textContent = `${(
      this.month + 1
    ).toString()}.${this.year.toString()}`;

    this.component.append(dateText); */ //Ende
    this.component.append(table);
  }

  disableDays(startDay, endDay) {
    for (let i = startDay; i < endDay; i++) {
      this.days[i - 1].style.opacity = 0.5;
      this.days[i - 1].disabled = true;
    }
  }

  selectDay(day, color) {
    this.days[day - 1].style.backgroundColor = color;
  }

  selectDays(startDay, endDay, exceptions, color) {
    for (let i = startDay; i < endDay; i++) {
      console.log(i);
      if (
        !exceptions.some(
          (day) => this.days[i - 1].getAttribute("data-day") == day
        )
      ) {
        this.days[i - 1].style.backgroundColor = color;
      }
    }
  }

  deselectDay(day) {
    this.days[day - 1].style.backgroundColor = "transparent";
  }

  deselectDays(startDay, endDay, exceptions) {
    for (let i = startDay; i < endDay; i++) {
      if (
        !exceptions.some(
          (day) => this.days[i - 1].getAttribute("data-day") == day
        )
      ) {
        this.days[i - 1].style.backgroundColor = "transparent";
      }
    }
  }
}

export default Month;
