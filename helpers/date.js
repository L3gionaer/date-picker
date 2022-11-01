export const getDateAsLocalString = (date) => {
    let day = date.getDate();

    let month = date.getMonth();

    if (String(day).length == 1) day = "0" + day;
    if (String(month).length == 1) month = "0" + month;

    let dateT = day + "." + month + "." + date.getFullYear();

    return dateT;
}

export const getDateAsISO = (date) => {
    let day = date.getDate();

    let month = date.getMonth();

    if (String(day).length == 1) day = "0" + day;
    if (String(month).length == 1) month = "0" + month;

    let dateT = date.getFullYear() + month + day;

    return dateT;
}

