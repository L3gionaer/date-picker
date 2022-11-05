import DatePicker from './components/date-picker.js';

let datePicker = new DatePicker({year: new Date().getFullYear(), month: new Date().getMonth()});

datePicker.on("startDateChange", (startDate) => console.log("startDate: ", startDate));
datePicker.on("endDateChange", (endDate) => console.log("endDate: ", endDate));

document.querySelector("#root").append(datePicker.component);

// Select doesnt work after first selection

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

let number = test.count;

number = 14;

test.count = 20;

console.log("numberLocal", number);
console.log(test.count);*/

// get set for "state management"
// Split Algorithm
