function appendLeadingZeroes(n){
    if(n <= 9 && n >= 0){
        return "0" + n;
    }
    return n
}

// Sets time to YYYY.MM.DD 00:00
function getStartOfDate(date) {
    return new Date(date.getFullYear() + "-" + Number(date.getMonth() + 1) + "-" + date.getDate());
}

function calculateDaysBetween(firstDate, secondDate) {
    let msToDays = 1000 * 60 * 60 * 24;
    firstDate = getStartOfDate(firstDate);
    secondDate = getStartOfDate(secondDate);

    return (secondDate.getTime() - firstDate.getTime())/msToDays;
}

// Formats a date as DD.MM for visual output
function calendarDateFormatter(date){
    return appendLeadingZeroes(date.getDate()) + "." + appendLeadingZeroes(date.getMonth() +1);
}
// Formats a date as DD MMM
function dayMonthDateFormatter(date) {
    let months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return appendLeadingZeroes(date.getDate()) + " " + months[date.getMonth()];
}

//Get the percentage of days remaining
function getPercentageLeft(task) {
    let totalDays = calculateDaysBetween(task.startDate, task.endDate);
    let daysLeft = task.daysToDeadline();
    let daysLeftPercent = (daysLeft / totalDays) * 100;
    if(daysLeftPercent <= 0) {
        daysLeftPercent = 0;
    } else if(daysLeftPercent >= 100) {
        daysLeftPercent = 100;
    }
    return daysLeftPercent;
}

//Dependancies - Chartist.js
//Import following in to HTML
//<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/chartist/0.11.1/chartist.min.css">
//<script src="https://cdnjs.cloudflare.com/ajax/libs/chartist/0.11.1/chartist.js"></script>

//Builds the countdown clock
function buildChart(task, div) {
    let chartID = "chart" + task.ID;
    let chartDiv = document.createElement("div");
    chartDiv.className = "ct-chart ct-golden-section";
    chartDiv.id = chartID;
    chartDiv.style.width = "190px";
    chartDiv.style.margin = "auto";
    div.appendChild(chartDiv);

    let daysLeftPercent = getPercentageLeft(task);
    let totalDaysPercent = 100 - daysLeftPercent;
    let chart = new Chartist.Pie("#" + chartID, {
    series: [{value: totalDaysPercent, className: "chartistColor1"},
    {value: daysLeftPercent, className: "chartistColor2"}],
    },
    {
        donut: true,
        donutWidth: 19,
        donutSolid: false,
        startAngle: 0,
        showLabel: false,
    })
}

//Algorithm to determine position of tasks in the reccommended tasks
function findPriorityRating(task) {
    let ttd = task.endDate - new Date();
    let priority = 0;
    if(task.priority == 1) {
        priority = 1.25;
    } else if(task.priority == 2) {
        priority = 1;
    } else if(task.priority == 3) {
        priority = 0.75; 
    }
    return (ttd * priority) / 10000000;
}

function removeUserTask(e){
    let elemID = e.target.id;
    let elem = document.getElementById(elemID);
    let userID = parseInt(elem.id);
    elem.parentNode.removeChild(elem);

    let taskID = elem.parentElement.getAttribute("taskid");
    Task.array[taskID].removeOwners(userID);
    Task.array[taskID].removeMembers(userID);
}

function removeUserProject(e){
    let elemID = e.target.id;
    let elem = document.getElementById(elemID);
    let userID = parseInt(elem.id);
    elem.parentNode.removeChild(elem);

    let projectID = elem.getAttribute("projectID");
    let project = Project.array[projectID];
    if(project.owners.includes(userID)) {
        project.removeOwner(userID);
    } else if(project.members.includes(userID)) {
        project.removeMember(userID);
    }
}


//Create Drag and Drop functionality on project view page
class DragDrop {
    static init() {

        DragDrop.taskCards = document.getElementsByClassName("projectViewTask");

        //Add drag event listeners to the task cards
        for(const taskCard of DragDrop.taskCards) {
            taskCard.addEventListener("dragstart", DragDrop.dragstart);
            taskCard.addEventListener("dragend", DragDrop.dragend);
        }
        const containers = document.getElementsByClassName("projectViewStatusWrap");

        //Add drag event listeners to the status containers
        for(const container of containers) {
            container.addEventListener("dragover", DragDrop.dragover);
            container.addEventListener("dragenter", DragDrop.dragenter);
            container.addEventListener("dragleave", DragDrop.dragleave);
            container.addEventListener("drop", DragDrop.drop);
        }
    }

    static card = "";

    //Start the drag and make the card invisible
    static dragstart() {
        DragDrop.card = this;
        this.classList.add("held");
        setTimeout(() => this.classList.add("invisible"), 0);
    }

    //When the drag stops, make the card visible again.
    static dragend() {
        this.classList.remove("held", "invisible");
        updateProjectViewCounters();
    }

    static dragover(e) {
        e.preventDefault();
    }

    static dragenter(e) {
        e.preventDefault();
    }

    static dragleave(e) {
        e.preventDefault();
    }

    //Append card to new statusdiv; if status is done, run confetti.
    static drop() {
        this.append(DragDrop.card);
        DragDrop.card.classList.remove("projectViewTaskToDo", "projectViewTaskInProgress", "projectViewTaskDone");
        DragDrop.card.classList.add("projectViewTask" + this.getAttribute("status"));
        Task.array.find(task => task.ID === Number(DragDrop.card.getAttribute("taskid"))).status = this.getAttribute("status");
        if(this.getAttribute("status") == "Done") {
            confetti.start();
            setTimeout(function () {
                confetti.stop()
            }, 2000);
        }
    }
}

document.addEventListener("DOMContentLoaded", DragDrop.init);