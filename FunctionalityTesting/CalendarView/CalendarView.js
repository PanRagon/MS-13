/*
    CalendarView / Linjalen
 */

var tasks = [];

//Task constructor
function Task(title) {
    this.ID = countIDTask();
    this.title = title;
    this.status = "TODO";
    this.log = [];
    //Push this task into array
    tasks.push(this);
}

var countIDTask = (function() {
    var id = 1;
    return function() {
        return id++;
    };
})();

function calculateDaysBetween(firstDate, secondDate){
    let msToDays = 1000 * 60 * 60 * 24;
    return (secondDate.getTime() - firstDate.getTime())/msToDays;
}

// Set up tasks
new Task("Egg");
tasks[0].startDate = new Date(2019, 4, 26, 20, 30);
tasks[0].endDate = new Date(2019, 5, 18, 20, 30);

new Task("Bread");
tasks[1].startDate = new Date(2019, 5, 12, 8, 0);
tasks[1].endDate = new Date(2019, 5, 22, 10, 30);

// Setup calendar:
var calendarDiv = document.getElementById("calendarContainer");
calendarDiv.setAttribute("style", setCalendarStyle(tasks));

function setCalendarStyle(taskArray){
    let totalColumns = Math.floor(calculateDaysBetween(new Date(), findBiggestEndDate(taskArray))) * 2;
    let totalRows = taskArray.length + 1;

    return "grid-template-columns: repeat(" + totalColumns + ", 30px); grid-template-rows: repeat(" + totalRows + ", auto);";
}

function findBiggestEndDate(array) {
    let biggestDate = 0;
    for (let i = 0; i < array.length; i++){
        if (biggestDate < array[i].endDate){
            biggestDate = array[i].endDate;
        }
    }
    return biggestDate;
}

// Render tasks
for(let i = 0; i < tasks.length; i++) {
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("calendarItem");

    let taskStyle = setTaskStyle(tasks[i], i);
    taskDiv.setAttribute("style", taskStyle);

    calendarDiv.appendChild(taskDiv);
}

function setTaskStyle(task, i) {
    let totalColumns = Math.floor(calculateDaysBetween(task.startDate, task.endDate)) * 2;
    let startColumn;
    let currentDate = new Date();
    let startOfCurrentDate = new Date(currentDate.getFullYear() + "-" + Number(currentDate.getMonth() + 1) + "-" + currentDate.getDate());
    startColumn = (Math.floor(calculateDaysBetween(startOfCurrentDate, task.startDate) * 2)) +1;

    //let startColumn = (Math.floor(calculateDaysBetween(new Date(), task.startDate))) * 2;
    let endColumn = totalColumns + startColumn;
    let row = Number(i) + 1;

    return "grid-column-start: " + startColumn + "; grid-column-end: " + endColumn+ "; grid-row-start: " + row + "; grid-row-end: " + row + ";";
}

var totalCalendarColumns = Math.floor(calculateDaysBetween(new Date(), findBiggestEndDate(tasks))) * 2;
var totalCalendarRows = tasks.length + 1;
let currentDate = new Date();

for (let i = 1; i <= totalCalendarColumns; i += 2){
    let startColumn = i;
    let endColumn = i + 2;
    let rowStyle = "grid-column-start: " + startColumn + "; grid-column-end: " + endColumn + "; grid-row-start: " + totalCalendarRows + "; grid-row-end: " + totalCalendarRows + ";";

    let calendarDateDiv = document.createElement("div");
    calendarDateDiv.classList.add("calendarDate");
    calendarDateDiv.setAttribute("style", rowStyle);

    calendarDateDiv.innerText = calendarDateFormatter(currentDate);

    calendarDiv.appendChild(calendarDateDiv);

    currentDate.setDate(currentDate.getDate() + 1);
}

function calendarDateFormatter(date){
    return appendLeadingZeroes(date.getDate()) + "." + appendLeadingZeroes(date.getMonth() +1);
}
function appendLeadingZeroes(n){
    if(n <= 9){
        return "0" + n;
    }
    return n
}



