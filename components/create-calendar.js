import Calendar from "./calendar.js";
import { getDateAsISO, compareTwoDates } from '../helpers/date.js'

function createCalendar({year, month, startDate, endDate}) {
    const calendar = new Calendar({ year, month });

    calendar.days.forEach((_, index) => {
        const dateOfThisDay = new Date(year, month, [index + 1]);

        if(startDate && endDate) {
            if(compareTwoDates(startDate, dateOfThisDay)) {
                calendar.days[index].select();
            }

            if(compareTwoDates(endDate, dateOfThisDay)) {
                calendar.days[index].select();
            }
            
            if(startDate < dateOfThisDay && endDate > dateOfThisDay) {
                calendar.days[index].selectBetween();
            }
        } else if(startDate) {
            if(compareTwoDates(startDate, dateOfThisDay)) {
                calendar.days[index].select();
            }
        }   

        if(compareTwoDates(new Date(), dateOfThisDay)) {
            calendar.days[index].currentDate();
        }
    })

    return calendar;
}

export default createCalendar;