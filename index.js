import DatePicker from './components/date-picker.js';

let datePicker = new DatePicker({year: new Date().getFullYear(), month: new Date().getMonth()});

datePicker.on("startDateChanged", (startDate) => console.log("startDate: ", startDate));
datePicker.on("endDateChanged", (endDate) => console.log("endDate: ", endDate));

document.querySelector("#root").append(datePicker.component);

/*class Test {
    constructor() {
        this._number = 10;
    }

    get count() {
        return this._number;
    }

    set count(number) {
        this._number = number;
    }
}

let test = new Test();

test.count += 1;

console.log(test.count);*/

// get set for "state management"
// Split Algorithm
