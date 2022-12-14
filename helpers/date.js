export const getDateAsLocalString = (date) => {
    let day = date.getDate();

    let month = date.getMonth();

    if (String(day).length == 1) day = "0" + day;
    if (String(month).length == 1) month = "0" + month;

    let dateT = day + "." + month + "." + date.getFullYear();

    return dateT;
}

export const getDateAsISO = (date) => {
    let day = date.getDate().toString();
    let month = date.getMonth().toString();
    let year = date.getFullYear().toString();

    if (String(day).length == 1) day = "0" + day;
    if (String(month).length == 1) month = "0" + month;

    let dateT = parseInt(year + month + day);

    return dateT;
}

export const getMonthFormatted = (month) => {
    month += 1;

    if (String(month).length == 1) month = "0" + month;

    return month;
}

export const compareTwoDates = (date1, date2) => {
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);

    const result = date1.getTime() == date2.getTime()

    return result;
}

