/* ----------------------------------------------------------------------------------------------------
§
§   * CALENDAR RENDERER:
$
§   * Use renderDashboardCalendar(inputArray) to render calendar
§   * Gets rendered to a div with ID "calendarContainer"
§
§   * The calendar consists of a grid with 24 columns for each day from today to the end of the last .endDate in the input array.
§   * Calendar items gets placed based on start date and time and with correct duration.
§
§   * HTML-tags:
§   -   Calendar container: id="calendarContainer"   MUST BE PREMADE BEFORE rendarCalendar() IS CALLED!
§   -   Task Items in calendar: class="calendarItem"
§   -   Date Item in calendar: class="calendarDate"
§   -   Current Date Item in calendar: class="calendarDateToday"
§
§   * DO NOT USE HTML-STYING TO STYLE THE ITEMS!
§   -   Must be styled via .CSS
§
---------------------------------------------------------------------------------------------------- */

// UTILITY FUNCTIONS:
// Formats a date as DD.MM for visual output
function calendarDateFormatter(date){
    return appendLeadingZeroes(date.getDate()) + "." + appendLeadingZeroes(date.getMonth() +1);
}

// Finds the first .startDate in the array.
function getCalendarStartDate(taskArray) {
    let currentDate = getStartOfDate(new Date());
    let firstStartDate = getStartOfDate(new Date());
    taskArray.forEach(task => {
        if(firstStartDate > task.startDate){
            firstStartDate = task.startDate;
        }
    });

    if (firstStartDate > currentDate) {
        firstStartDate = currentDate;
    }
    return firstStartDate;
}

// Finds the last .endDate in the array.
function getCalendarEndDate(taskArray) {
    let biggestEndDate = getStartOfDate(new Date());
    taskArray.forEach(task => {
        if(biggestEndDate < task.endDate){
            biggestEndDate = task.endDate;
        }
    });
    return biggestEndDate;
}

// Calculate the amount of days between two dates - does not count the last day
function calculateDaysBetween(firstDate, secondDate) {
    let msToDays = 1000 * 60 * 60 * 24;
    firstDate = getStartOfDate(firstDate);
    secondDate = getStartOfDate(secondDate);

    return (secondDate.getTime() - firstDate.getTime())/msToDays;
}

// MAIN RENDER CALENDAR TO DASHBOARD FUNCTION
function renderDashboardCalendar (taskArray) {

    // Remove tasks with status "Done" from array
    taskArray = taskArray.filter(task => task.status.toLowerCase() !== "done");
    // Sort taskArray on startDate
    taskArray = Array.from(taskArray);
    taskArray.sort(function (a, b) {
        return a.startDate - b.startDate;
    });

    let calendarDiv = document.getElementById("calendarContainer");
    let currentDate = getStartOfDate(new Date());
    let calendarStartDate = getCalendarStartDate(taskArray);
    let calendarEndDate = getCalendarEndDate(taskArray);

    // Clears calendar HTML-div
    calendarDiv.innerHTML = "";

    // Set grid rows and columns for calendar div
    let calendarTotalColumns = (calculateDaysBetween(calendarStartDate, calendarEndDate) + 1) * 24;
    let calendarTotalRows = taskArray.length + 1;
    let calendarStyle = "grid-template-columns: repeat(" + calendarTotalColumns + ", 3px); grid-template-rows: repeat(" + calendarTotalRows + ", auto);";
    calendarDiv.setAttribute("style", calendarStyle);

    // Render lines to calendar
    for (let i = 1; i <= calendarTotalColumns; i += 24) {
        let column = i;
        let endRow = calendarTotalRows + 1;
        let rowStyle = "grid-column-start: " + column + "; grid-column-end: " + column + "; grid-row-start: " + 1 + "; grid-row-end: " + endRow + ";";

        let rowLineDiv = document.createElement("div");
        rowLineDiv.classList.add("calendarRowLine");
        rowLineDiv.setAttribute("style", rowStyle);
        calendarDiv.appendChild(rowLineDiv);
    }

    // Render tasks to calendar
    taskArray.forEach((task, i) => {
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("calendarItem");
        taskDiv.setAttribute("taskID", task.ID);
        taskDiv.setAttribute("taskStatus", task.status.toLowerCase());

        // Add status to taskDiv
        let statusDiv = document.createElement("div");
        statusDiv.classList.add("calendarItemStatus");
        if (task.status.toLowerCase() === "todo") {
            statusDiv.classList.add("calendarItemStatusToDo");
        } else if (task.status.toLowerCase() === "inprogress") {
            statusDiv.classList.add("calendarItemStatusInProgress");
        } else if (task.status.toLowerCase() === "done") {
            statusDiv.classList.add("calendarItemStatusDone");
        } else {
            statusDiv.classList.add("calendarItemStatusUnknown");
        }
        taskDiv.appendChild(statusDiv);

        // Add title to taskDiv
        let titleDiv = document.createElement("div");
        titleDiv.classList.add("calendarItemTitle");
        titleDiv.innerText = task.title;
        taskDiv.appendChild(titleDiv);

        // Add users to taskDiv
        let userWrapDiv = document.createElement("div");
        userWrapDiv.classList.add("calendarUserWrap");
        task.owners.forEach(owner => {
            let div = document.createElement("div");
            div.classList.add("calendarItemUser");
            div.classList.add("calendarItemOwner");
            div.innerText = owner.shortName;
            userWrapDiv.appendChild(div);
        });
        task.members.forEach(member => {
            let div = document.createElement("div");
            div.classList.add("calendarItemUser");
            div.classList.add("calendarItemMember");
            div.innerText = member.shortName;
            userWrapDiv.appendChild(div);
        });
        taskDiv.appendChild(userWrapDiv);

        // Set task start- and end-column and row.
        let taskStartColumn = calculateDaysBetween(calendarStartDate, task.startDate) * 24 + task.startDate.getHours() + 1;
        let taskEndColumn = taskStartColumn + calculateDaysBetween(task.startDate, task.endDate) * 24 + task.endDate.getHours() - task.startDate.getHours();
        let taskRow = i + 1;
        let taskStyle = "grid-column-start: " + taskStartColumn + "; grid-column-end: " + taskEndColumn+ "; grid-row-start: " + taskRow + "; grid-row-end: " + taskRow + ";";
        taskDiv.setAttribute("style", taskStyle);

        calendarDiv.appendChild(taskDiv);
    });

    // Render dates to calendar
    let dateToPrint = new Date(calendarStartDate);
    for (let i = 1; i <= calendarTotalColumns; i += 24) {
        let startColumn = i;
        let endColumn = i + 24;
        let rowStyle = "grid-column-start: " + startColumn + "; grid-column-end: " + endColumn + "; grid-row-start: " + calendarTotalRows + "; grid-row-end: " + calendarTotalRows + ";";

        let calendarDateDiv = document.createElement("div");
        calendarDateDiv.classList.add("calendarDate");
        if (getStartOfDate(dateToPrint).getTime() === getStartOfDate(currentDate).getTime()) {
            calendarDateDiv.classList.add("calendarDateToday");
        }
        calendarDateDiv.setAttribute("style", rowStyle);
        calendarDateDiv.innerText = calendarDateFormatter(dateToPrint);
        calendarDiv.appendChild(calendarDateDiv);

        dateToPrint.setDate(dateToPrint.getDate() + 1);
    }
}
