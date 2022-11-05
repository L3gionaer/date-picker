import Text from './text.js';
import Arrows from './arrows.js';

import createCalendar from './create-calendar.js';
import EventEmitter from '../event-emitter.js';
import { getMonthFormatted, compareTwoDates } from '../helpers/date.js';

class DatePicker extends EventEmitter {
    #year;
    #month;
    #component;
    #text;
    #calendar;
    #calendarContainer;
    #startDate;
    #endDate;


    constructor({ year, month }) {
        super();

        this.#year = year;
        this.#month = month;

        this.#component;
        this.#text;
        this.#calendar;
        this.#calendarContainer;

        this.#startDate;
        this.#endDate;

        this.#init();
    }

    get year() {
        return this.#year;
    }

    get month() {
        return this.#month;
    }

    set month(number) {
        if(this.month == 0) {
            this.#month = 11;
            this.#year = this.#year - 1;
        } else {
            this.#month = number;
        }
    }

    get component() {
        return this.#component;
    }

    get startDate() {
        return this.#startDate;
    }

    get endDate() {
        return this.#endDate;
    }

    #init() {
        this.#render();
        this.#registerListeners();
    }

    #render() {
        this.#component = document.createElement("div");

        this.#text = new Text({textContent: `${getMonthFormatted(this.month)}, ${this.#year}`});

        const arrows = new Arrows();
        arrows.on("clickPrevious", () => this.emit("monthChange", -1));
        arrows.on("clickNext", () => this.emit("monthChange", 1));

        const header = document.createElement("div");
        header.style.display = "flex"; //remove
        header.append(this.#text.component);
        header.append(arrows.component);

        this.#calendarContainer = document.createElement("div");
        this.#renderCalendar();
        
        this.#component.append(header);
        this.#component.append(this.#calendarContainer);
    }

    #registerListeners() {
        this.on("monthChange", number => this.#onMonthChange.call(this, number));
        this.on("startDateChange", date => this.#onStartDateChange.call(this, date));
        this.on("endDateChange", date => this.#onEndDateChange.call(this, date));
    }

    #renderCalendar() {
        this.#calendar = createCalendar({
            year: this.#year, 
            month: this.month, 
            startDate: this.startDate, 
            endDate: this.endDate
        });

        this.#calendar.on("clickOnDay", (day) => this.selectDay(day));
        this.#calendar.on("mouseOverDay", (day) => this.mouseOverDay(day));
        this.#calendar.on("mouseLeaveDay", (day) => this.mouseLeaveDay(day));

        this.#calendarContainer.replaceChildren(this.#calendar.component);
    }

    #onMonthChange(number) {
        this.month += number;

        this.#text.setText(`${getMonthFormatted(this.month)}, ${this.#year}`);
        this.#renderCalendar();
    }

    #onStartDateChange(date) {
        this.#startDate = date;
        this.#endDate = null;
    }   

    #onEndDateChange(date) {
        this.#endDate = date;
    }

    selectDay(day) {
        const selectedDate = new Date(this.#year, this.month, [day.dayCount]);
        
        if(this.startDate) {
            if(this.endDate) {
                if(selectedDate >= new Date()) {
                    this.deselectAllDays();
                    
                    day.select();

                    this.emit("startDateChange", selectedDate);
                }
            } else {
                if(selectedDate >= this.startDate) {
                    day.select();

                    this.emit("endDateChange", selectedDate);
                } else {
                    this.deselectAllDays();
                    
                    day.select();

                    this.emit("startDateChange", selectedDate);
                }
            }
        } else {
            if(selectedDate >= new Date()) {
                day.select();

                this.emit("startDateChange", selectedDate);
            }
        }
    }

    deselectAllDays() {
        this.#calendar.days.forEach((_, index) => { 
            this.#calendar.days[index].deselect.call(this.#calendar.days[index])
        });
    }
    
    mouseOverDay(day) {
        if(
            (this.startDate && !this.endDate) && 
            (this.startDate < new Date(this.#year, this.month, [day.dayCount]))
        ) {
            this.#calendar.days.forEach((_, index) => {
                const dateOfThisDay = new Date(this.#year, this.month, [(index + 1)]); 
               
                if(
                    !compareTwoDates(dateOfThisDay, this.startDate) && 
                    !compareTwoDates(dateOfThisDay, new Date())
                ) { 
                    this.#calendar.days[index].deselect(); 
                }

                if(
                    (dateOfThisDay > this.startDate) && 
                    (dateOfThisDay < new Date(this.#year, this.month, [day.dayCount]))
                ) {
                    this.#calendar.days[index].selectBetween();
                } 
            })
        } else {
            day.highlight();
        }
    }

    mouseLeaveDay(day) {
        day.removeHighlight();
    }
}

export default DatePicker;