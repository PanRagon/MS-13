/*  ----------------------------------------
    REMIX av CalendarView
----------------------------------------    */

// TASKS:
var tasks = [];

var countIDTask = (function() {
    var id = 1;
    return function() {
        return id++;
    };
})();

function Task (title) {
    this.ID = countIDTask();
    this.title = title;
    this.status = "TODO";
    this.log = [];
    tasks.push(this);

}

// CALENDAR Functions

let currentDate = new Date();
let calendarDiv = document.getElementById("calendarContainer");

function setCalendarStyle(taskArray){
    let totalColumns = calculateTotalCalendarColumns(taskArray);
    let totalRows = taskArray.length + 1;

    let style =  "grid-template-columns: repeat(" + totalColumns + ", 5px); grid-template-rows: repeat(" + totalRows + ", auto);";
    calendarDiv.setAttribute("style", style);
}

// Formats a date as DD.MM
function calendarDateFormatter(date){
    return appendLeadingZeroes(date.getDate()) + "." + appendLeadingZeroes(date.getMonth() +1);
}

// Adds a 0 if number is >=9
function appendLeadingZeroes(n){
    if(n <= 9){
        return "0" + n;
    }
    return n
}

// Sets the date to DD:MM:YY 00:00:00 for easier calculations.
function getStartOfDate(date){
    return new Date(date.getFullYear() + "-" + Number(date.getMonth() + 1) + "-" + date.getDate());
}

// Finds the biggest .endDate-property in the array.
function getBiggestEndDate(array){
    let biggestEndDate = new Date();
    array.forEach(e => {
        if(biggestEndDate < e.endDate){
            biggestEndDate = e.endDate;
        }
    });
    return biggestEndDate;
}

// Used to calculate the amount of dates between two dates. Does not include the full second date.
function calculateDaysBetween(firstDate, secondDate){
    let msToDays = 1000 * 60 * 60 * 24;
    firstDate = getStartOfDate(firstDate);
    secondDate = getStartOfDate(secondDate);

    return (secondDate.getTime() - firstDate.getTime())/msToDays;
}

// Used to calculate how many rows a task must fill.
function calculateCalendarColumns(task){
    let dayColumns = calculateDaysBetween(task.startDate, task.endDate) * 24;
    let hourColumns = task.endDate.getHours() - task.startDate.getHours();
    return dayColumns + hourColumns;
}

// Used to calculate total amount of grid rows needed in the calendar.
function calculateTotalCalendarColumns(array) {
    // Days between today and biggest date multiplied by two for amount of rows. Add 2 rows for last day.
    return (calculateDaysBetween(currentDate, getBiggestEndDate(array)) + 1) * 24;
}

// Calculates what row a task should start on.
function calculateStartRow(task){
    let dayColumns = calculateDaysBetween(currentDate, task.startDate) * 24;
    let hourColumns = task.startDate.getHours();
    return dayColumns + hourColumns;
}

function renderDatesToCalendar (taskArray) {
    let date = new Date();
    let totalColumns = calculateTotalCalendarColumns(taskArray);
    let totalCalendarRows = tasks.length + 1;

    for (let i = 1; i <= totalColumns; i += 24){
        let startColumn = i;
        let endColumn = i + 24;
        let rowStyle = "grid-column-start: " + startColumn + "; grid-column-end: " + endColumn + "; grid-row-start: " + totalCalendarRows + "; grid-row-end: " + totalCalendarRows + ";";

        let calendarDateDiv = document.createElement("div");
        calendarDateDiv.classList.add("calendarDate");
        calendarDateDiv.setAttribute("style", rowStyle);
        calendarDateDiv.innerText = calendarDateFormatter(date);
        calendarDiv.appendChild(calendarDateDiv);

        date.setDate(date.getDate() + 1);
    }
}

function renderTasksToCalendar (taskArray) {
    taskArray.forEach((e, i) => {
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("calendarItem");
        let startColumn = calculateStartRow(e);
        let endColumn = calculateCalendarColumns(e) + startColumn;
        let row = i + 1;
        let taskStyle = "grid-column-start: " + startColumn + "; grid-column-end: " + endColumn+ "; grid-row-start: " + row + "; grid-row-end: " + row + ";";

        taskDiv.setAttribute("style", taskStyle);
        calendarDiv.appendChild(taskDiv);
    })
}

function renderCalendar(taskArray){
    setCalendarStyle(taskArray);
    renderTasksToCalendar(taskArray);
    renderDatesToCalendar(taskArray);
}

// TEST:
// Set up tasks

new Task("Egg");
tasks[0].startDate = new Date(2019, 4, 28, 10, 30);
tasks[0].endDate = new Date(2019, 4, 30, 20, 30);


new Task("Bread");
tasks[1].startDate = new Date(2019, 5, 12, 8, 0);
tasks[1].endDate = new Date(2019, 5, 22, 10, 30);

console.table(tasks);

// Render the calendar
renderCalendar(tasks);