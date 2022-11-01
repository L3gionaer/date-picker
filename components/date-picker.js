import Text from './text.js';
import Arrows from './arrows.js';
//import Calendar from './calendar/calendar.js';
import createCalendar from './calendar/create-calendar.js';
import EventEmitter from '../event-emitter.js';
import { getDateAsISO } from '../helpers/date.js';

class DatePicker extends EventEmitter {
    constructor({ year, month }) {
        super();

        this.year = year;
        this.month = month;

        this.component;
        this.text;
        this.calendar;
        this.calendarContainer;

        this.startDate;
        this.endDate;
        //this.selectedDays;

        this._init();
    }

    _init() {
        this._render();
    }

    _render() {
        this.component = document.createElement("div");

        this.text = new Text({textContent: `${this.month}, ${this.year}`});

        const arrows = new Arrows();
        arrows.on("clickPrevious", () => this.previousMonth());
        arrows.on("clickNext", () => this.nextMonth());

        const header = document.createElement("div");
        header.style.display = "flex"; //remove
        header.append(this.text.component);
        header.append(arrows.component);

        this.calendarContainer = document.createElement("div");
        this.addCalendar();
        
        this.component.append(header);
        this.component.append(this.calendarContainer);
    }

    addCalendar() {
        this.calendar = createCalendar({
            year: this.year, 
            month: this.month, 
            startDate: this.startDate, 
            endDate: this.endDate
        });

        this.calendar.on("clickOnDay", (day) => this.selectDay(day));
        this.calendar.on("mouseOverDay", (day) => this.mouseOverDay(day));
        this.calendar.on("mouseLeaveDay", (day) => this.mouseLeaveDay(day));

        this.calendarContainer.replaceChildren(this.calendar.component);
    }

    previousMonth() {
        this.month -= 1;

        if(this.month == 1) {
            this.month = 12;
            this.year = this.year - 1;
        }

        this.text.setText(`${this.month}, ${this.year}`);
        this.addCalendar();
    }

    nextMonth() {
        this.month += 1;

        if(this.month == 12) {
            this.month = 1;
            this.year = this.year + 1;
        }

        this.text.setText(`${this.month}, ${this.year}`);
        this.addCalendar();
    }

    selectDay(day) {
        const selectedDate = new Date(this.year, this.month, [day.dayCount]);
        
        if(this.startDate) {
            if(this.endDate) {
                if(selectedDate >= new Date(2022, 9, [2])) {
                    this.calendar.days.forEach((_, index) => this.calendar.days[index].deselect.call(this.calendar.days[index]));
                    day.select();
                    //this.calendar.days[this.startDate.getDate() - 1].deselect.call(this.calendar.days[this.startDate.getDate() - 1]);
                    //this.calendar.days[this.endDate.getDate() - 1].deselect.call(this.calendar.days[this.endDate.getDate() - 1]);

                    this.startDate = selectedDate;
                    this.endDate = null;
                }
            } else {
                if(selectedDate >= this.startDate) {
                    day.select();

                    this.endDate = selectedDate;
                } else {
                    //this.calendar.days[this.startDate.getDate() - 1].deselect.call(this.calendar.days[this.startDate.getDate() - 1]);
                    this.calendar.days.forEach((_, index) => this.calendar.days[index].deselect.call(this.calendar.days[index]));
                    
                    day.select();

                    this.startDate = selectedDate;
                }
            }
        } else {
            if(selectedDate >= new Date(2022, 9, [2])) {
                day.select();

                this.startDate = selectedDate;
            }
        }
        
    }

    mouseOverDay(day) {
        if(
            (this.startDate && !this.endDate) && 
            (this.startDate < new Date(this.year, this.month, [day.dayCount]))
        ) {
            console.log("this");
            this.calendar.days.forEach((_, index) => {
                const date = new Date(this.year, this.month, [(index + 1)]);
                const dateWithoutTime = getDateAsISO(date);
                
                // dateOfThisDay -> var name
                if(
                    dateWithoutTime != getDateAsISO(this.startDate) && 
                    //dateWithoutTime != getDateAsISO(this.endDate) && 
                    dateWithoutTime != getDateAsISO(new Date())
                ) { 
                    this.calendar.days[index].component.style.backgroundColor = "transparent";
                }

                if(date > this.startDate && date < new Date(this.year, this.month, [day.dayCount])) {
                    this.calendar.days[index].selectBetween();
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