import DatePicker from './components/date-picker.js';

let datePicker = new DatePicker({year: 2022, month: 9});

document.querySelector("#root").append(datePicker.component);