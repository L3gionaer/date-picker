import EventEmitter from '../../event-emitter.js';

import Text from '../text.js';
import Arrows from '../arrows.js';

class Calendar extends EventEmitter {
    constructor({year, startMonth}) {
        this._year = year;
        this._month = startMonth;

        this.component;
        //this.monthComponent;

        this._init();
    }

    _init() {
        this._render();
    }

    get year() {
        return this._year;
    }

    get month() {
        return this._month;
    }

    set month(number) {
        if(this.month == 0) {
            this.month = 11;
            this._year = this._year - 1;
        } else {
            this.month = number;
        }

        this.monthChanged();
    }

    _render() {
        this.component = document.createElement("div");

        this.text = new Text({textContent: `${getMonthFormatted(this.month)}, ${this.year}`});

        const arrows = new Arrows();
        arrows.on("clickPrevious", () => this.changeMonth(-1));
        arrows.on("clickNext", () => this.changeMonth(1));

        const header = document.createElement("div");
        header.style.display = "flex"; 
        header.append(this.text.component);
        header.append(arrows.component);

        this.calendarContainer = document.createElement("div");
        this._renderCalendar();
        
        this.component.append(header);
        this.component.append(this.calendarContainer);
    }

    _renderCalendar() {
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

    monthChanged() {
        this.text.setText(`${getMonthFormatted(this.month)}, ${this.year}`);
        this._renderCalendar();
    }
}

export default Calendar;