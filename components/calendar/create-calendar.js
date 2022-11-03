import Calendar from "./calendar.js";
import { getDateAsISO } from '../../helpers/date.js'

function createCalendar({year, month, startDate, endDate}) {
    const calendar = new Calendar({ year, month });

    calendar.days.forEach((_, index) => {
        const calendarDate = getDateAsISO(new Date(year, month, [index + 1]));

        if(startDate && endDate) {
            if(getDateAsISO(startDate) == calendarDate) {
                calendar.days[index].select();
            }

            if(getDateAsISO(endDate) == calendarDate) {
                calendar.days[index].select();
            }
            
            if(getDateAsISO(startDate) < calendarDate && getDateAsISO(endDate) > calendarDate) {
                console.log("selectBetween", calendarDate);
                console.log("endDate", getDateAsISO(endDate))
                calendar.days[index].selectBetween();
            }
        } else if(startDate) {
            if(getDateAsISO(startDate) == calendarDate) {
                calendar.days[index].select();
            }
        }   

        if(getDateAsISO(new Date()) == calendarDate) {
            calendar.days[index].currentDate();
        }
    })

    return calendar;
}

export default createCalendar;