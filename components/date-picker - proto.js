import Text from './text.js';
import Arrows from './arrows.js';
//import Calendar from './calendar/calendar.js';
import createCalendar from './create-calendar.js';
import EventEmitter from '../event-emitter.js';
import { getDateAsISO, getMonthFormatted } from '../helpers/date.js';

class DatePicker extends EventEmitter {
    constructor() {
        super();

        this.component;

        this._startDate;
        this._endDate;

        this._init();
    }

    get startDate() {
        return this._startDate;
    }

    set startDate(date) {
        this._stateDate = date;
        this._endDate = null;

        this.emit("startDateChanged", this.startDate);
    }

    get endDate() {
        return this._startDate;
    }

    set endDate(date) {
        this._stateDate = date;

        this.emit("endDateChanged", this.startDate);
    }

    _init() {
        this._render();
    }

    _render() {
        
    }

    selectDay(day) {
        const selectedDate = new Date(this.year, this.month, [day.dayCount]);
        
        if(this.startDate) {
            if(this.endDate) {
                if(selectedDate >= new Date()) {
                    this.deselectAllDays();
                    
                    day.select();

                    this.startDate = selectedDate;
                }
            } else {
                if(selectedDate >= this.startDate) {
                    day.select();

                    this.endDate = selectedDate;
                } else {
                    this.deselectAllDays();
                    
                    day.select();

                    this.startDate = selectedDate;
                }
            }
        } else {
            if(selectedDate >= new Date()) {
                day.select();

                this.startDate = selectedDate;
            }
        }
    }

    deselectAllDays() {
        this.calendar.days.forEach((_, index) => { 
            this.calendar.days[index].deselect.call(this.calendar.days[index])
        });
    }
    //Look here
    mouseOverDay(day) {
        if(
            (this.startDate && !this.endDate) && 
            (this.startDate < new Date(this.year, this.month, [day.dayCount]))
        ) {
            console.log("this");
            this.calendar.days.forEach((_, index) => {
                const date = new Date(this.year, this.month, [(index + 1)]); // dateOfThisDay -> var name
                const dateWithoutTime = getDateAsISO(date);
                
                
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