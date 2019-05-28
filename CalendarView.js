/* ----------------------------------------------------------------------------------------------------
§
§   * CALENDAR RENDERER:
$
§   * Use renderCalendar(inputArray) to render calendar
§   * Gets rendered to a div with ID "calendarContainer"
§
§   * The calendar consists of a grid with 24 columns for each day from today to the end of the last .endDate in the input array.
§   * Calendar items gets placed based on start date and time and with correct duration.
§
§   * HTML-tags:
§   -   Calendar container:     class="calendarContainer"   MUST BE PREMADE BEFORE rendarCalendar() IS CALLED!
§   -   Task Items in calendar: class="calendarItem"
§   -   Date Item in calendar:  class="calendarDate"
§
§   * DO NOT USE HTML-STYING TO STYLE THE ITEMS!
§   -   Must be styled via .CSS
§
---------------------------------------------------------------------------------------------------- */

// TODO - Fix view if startDate.getDate() is > today.
// TODO - Fix length of last day in array. Now cuts early.
// TODO - Render information about each task inside "calendarTask"-div (renderTasksToCalendar()-method).

// Configuration
let currentDate = new Date();
let calendarDiv = document.getElementById("calendarContainer");

// Clears the innerHTML of calendar
function clearCalendar() {
    calendarDiv.innerHTML = "";
}

// Defines amount of grid columns and rows in the calendar
function setCalendarStyle(taskArray){
    let totalColumns = calculateTotalCalendarColumns(taskArray);
    let totalRows = taskArray.length + 1;

    let style =  "grid-template-columns: repeat(" + totalColumns + ", 3px); grid-template-rows: repeat(" + totalRows + ", auto);";
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

// Calculate the amount of dates between two dates. Does not include the full second date.
function calculateDaysBetween(firstDate, secondDate){
    let msToDays = 1000 * 60 * 60 * 24;
    firstDate = getStartOfDate(firstDate);
    secondDate = getStartOfDate(secondDate);

    return (secondDate.getTime() - firstDate.getTime())/msToDays;
}

// Calculate how many rows a task must fill.
function calculateCalendarColumns(task){
    let dayColumns = calculateDaysBetween(task.startDate, task.endDate) * 24;
    let hourColumns = task.endDate.getHours() - task.startDate.getHours();
    return dayColumns + hourColumns;
}

// Calculate total amount of grid rows needed in the calendar.
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

// Renders the calendarDates to the calendar
function renderDatesToCalendar (taskArray) {
    let date = new Date();
    let totalColumns = calculateTotalCalendarColumns(taskArray);
    let totalCalendarRows = taskArray.length + 1;

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

// Renders the calendarItems to the calendar
function renderTasksToCalendar (taskArray) {
    taskArray.forEach((e, i) => {
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("calendarItem");

        // Add status to taskDiv
        let statusDiv = document.createElement("div");
        statusDiv.classList.add("calendarItemStatus")
        if (e.status.toLowerCase() === "todo") {
            statusDiv.innerText = "T";
            statusDiv.classList.add("calendarItemStatusToDo");
        } else if (e.status.toLowerCase() === "inprogress") {
            statusDiv.innerText = "I";
            statusDiv.classList.add("calendarItemStatusInProgress");
        } else if (e.status.toLowerCase() === "done") {
            statusDiv.innerText = "D";
            statusDiv.classList.add("calendarItemStatusDone");
        } else {
            statusDiv.innerText = "?";
            statusDiv.classList.add("calendarItemStatusUnkown");
        }
        taskDiv.appendChild(statusDiv);

        // Add title to taskDiv
        let titleDiv = document.createElement("div");
        titleDiv.classList.add("calendarItemTitle");
        titleDiv.innerText = e.title;
        taskDiv.appendChild(titleDiv);

        // Add owners to taskDiv
        let ownersDiv = document.createElement("div");
        ownersDiv.classList.add("calendarItemOwners");
        e.owners.forEach(owner => {
            let div = document.createElement("div");
            div.classList.add("calendarOwner");
            div.innerText = owner.shortName;
            ownersDiv.appendChild(div);
        });
        taskDiv.appendChild(ownersDiv);

        // Add members to taskDiv
        let membersDiv = document.createElement("div");
        membersDiv.classList.add("calendarIteMembers");
        e.members.forEach(member => {
            let div = document.createElement("div");
            div.classList.add("calendarMember");
            div.innerText = member.shortName;
            membersDiv.appendChild(div);
        });
        taskDiv.appendChild(membersDiv);


        // Style taskDiv
        let startColumn = calculateStartRow(e);
        let endColumn = calculateCalendarColumns(e) + startColumn;
        let row = i + 1;
        let taskStyle = "grid-column-start: " + startColumn + "; grid-column-end: " + endColumn+ "; grid-row-start: " + row + "; grid-row-end: " + row + ";";
        taskDiv.setAttribute("style", taskStyle);


        calendarDiv.appendChild(taskDiv);
    })
}

// Renders a calendar based on input array to a div with ID "calendarContainer".
function renderCalendar(taskArray){

    // Non-destructively sorts input-array by startDate
    let localArray = Array.from(taskArray);
    localArray.sort(function (a,b) {
        return a.startDate - b.startDate;
    });

    clearCalendar();
    setCalendarStyle(localArray);
    renderTasksToCalendar(localArray);
    renderDatesToCalendar(localArray);
}