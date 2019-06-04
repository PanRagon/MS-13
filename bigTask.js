// UTILITY FUNCTIONS:
function bigTaskDateRender(date) {
    return appendLeadingZeroes(date.getDate()) + "." + appendLeadingZeroes(date.getMonth() + 1) + "." + date.getFullYear();
}

function renderBigTask(task) {

    let bigTaskWrapper = document.getElementById("bigTaskContainer");
    bigTaskWrapper.innerHTML = "";

    let taskDiv = document.createElement("div");
    taskDiv.classList.add("bigTask");
    taskDiv.setAttribute("taskID", task.ID);
    bigTaskWrapper.appendChild(taskDiv);

    // Status:
    let statusDiv = document.createElement("select");
    statusDiv.classList.add("bigTaskStatus");
    statusDiv.setAttribute("taskID", task.ID);
    statusDiv.innerText = task.status;
    statusDiv.addEventListener("change", e => {
        task.status = statusDiv.value;
        // Update status-class on element
        if (task.status.toLowerCase() === "todo") {
            statusDiv.classList.remove('bigTaskStatusInProgress');
            statusDiv.classList.remove('bigTaskStatusDone');
            statusDiv.classList.add("bigTaskStatusToDo");
        } else if (task.status.toLowerCase() === "inprogress") {
            statusDiv.classList.remove("bigTaskStatusToDo");
            statusDiv.classList.remove('bigTaskStatusDone');
            statusDiv.classList.add("bigTaskStatusInProgress");
        } else if (task.status.toLowerCase() === "done") {
            statusDiv.classList.remove("bigTaskStatusToDo");
            statusDiv.classList.remove('bigTaskStatusInProgress');
            statusDiv.classList.add("bigTaskStatusDone");
            confetti.start();
            setTimeout(function () {
                confetti.stop()
            }, 2000);

        } else {
            statusDiv.classList.remove("bigTaskStatusToDo");
            statusDiv.classList.remove('bigTaskStatusInProgress');
            statusDiv.classList.remove('bigTaskStatusDone');
            statusDiv.classList.add("bigTaskStatusUnknown");
        }
    });
    // Add status-options to select-element
    let toDoOption = document.createElement("option");
    toDoOption.setAttribute("value", "toDo");
    toDoOption.innerText = "To do";
    let inProgressOption = document.createElement("option");
    inProgressOption.setAttribute("value", "inProgress");
    inProgressOption.innerText = "In progress";
    let doneOption = document.createElement("option");
    doneOption.setAttribute("value", "done");
    doneOption.innerText = "Done";

    if (task.status.toLowerCase() === "todo") {
        toDoOption.setAttribute("selected", "");
        statusDiv.classList.add("bigTaskStatusToDo");
    } else if (task.status.toLowerCase() === "inprogress") {
        inProgressOption.setAttribute("selected", "");
        statusDiv.classList.add("bigTaskStatusInProgress");
    } else if (task.status.toLowerCase() === "done") {
        doneOption.setAttribute("selected", "");
        statusDiv.classList.add("bigTaskStatusDone");
    } else {
        statusDiv.classList.add("bigTaskStatusUnknown");
    }
    // Compose
    statusDiv.appendChild(toDoOption);
    statusDiv.appendChild(inProgressOption);
    statusDiv.appendChild(doneOption);

    taskDiv.appendChild(statusDiv);

    // Priority:
    let priorityDiv = document.createElement("div");
    priorityDiv.classList.add("bigTaskPriority");
    priorityDiv.classList.add("bigTaskPriority" + task.priority);
    priorityDiv.setAttribute("taskID", task.ID);
    priorityDiv.innerText = task.priority;
    taskDiv.appendChild(priorityDiv);

    // Category:
    let categoryDiv = document.createElement("div");
    categoryDiv.classList.add("bigTaskCategory");
    categoryDiv.classList.add("bigTaskCategory" + task.category.name);
    categoryDiv.setAttribute("taskID", task.ID);
    categoryDiv.innerText = task.category.name;
    taskDiv.appendChild(categoryDiv);


    // Left bar:
    let leftBarDiv = document.createElement("div");
    leftBarDiv.classList.add("bigTaskLeftBar");
    // Title:
    let titleDiv = document.createElement("input");
    titleDiv.classList.add("bigTaskTitle");
    titleDiv.setAttribute("taskID", task.ID);
    titleDiv.setAttribute("type", "text");
    titleDiv.setAttribute("value", task.title);
    titleDiv.addEventListener("keyup", e => {
        task.title = titleDiv.value;
    });
    leftBarDiv.appendChild(titleDiv);

    // Description:
    let descriptionDiv = document.createElement("input");
    descriptionDiv.classList.add("bigTaskDescription");
    descriptionDiv.setAttribute("taskID", task.ID);
    descriptionDiv.setAttribute("type", "text");
    descriptionDiv.setAttribute("value", task.description);
    descriptionDiv.addEventListener("keyup", e => {
        task.description = descriptionDiv.value;
    });
    leftBarDiv.appendChild(descriptionDiv);
    taskDiv.appendChild(leftBarDiv);

    // Right bar:
    let rightBarDiv = document.createElement("div");
    rightBarDiv.classList.add("bigTaskRightBar");
    // Users:
    let usersDiv = document.createElement("div");
    usersDiv.classList.add("bigTaskUserWrap");
    usersDiv.setAttribute("taskID", task.ID);
    // Owners:
    task.owners.forEach(owner => {
        let userDiv = document.createElement("div");
        userDiv.classList.add("bigTaskUser");
        let ownerDiv = document.createElement("div");
        ownerDiv.classList.add("bigTaskUserIcon");
        ownerDiv.classList.add("bigTaskOwner");
        ownerDiv.innerText = owner.shortName;
        let ownerNameDiv = document.createElement("div");
        ownerNameDiv.classList.add("bigTaskUserName");
        ownerNameDiv.innerText = owner.fullName;
        userDiv.appendChild(ownerDiv);
        userDiv.appendChild(ownerNameDiv);
        usersDiv.appendChild(userDiv);
    });
    // Members:
    task.members.forEach(member => {
        let userDiv = document.createElement("div");
        userDiv.classList.add("bigTaskUser");
        let memberDiv = document.createElement("div");
        memberDiv.classList.add("bigTaskUserIcon");
        memberDiv.classList.add("bigTaskMember");
        memberDiv.innerText = member.shortName;
        let memberNameDiv = document.createElement("div");
        memberNameDiv.classList.add("bigTaskUserName");
        memberNameDiv.innerText = member.fullName;
        userDiv.appendChild(memberDiv);
        userDiv.appendChild(memberNameDiv);
        usersDiv.appendChild(userDiv);
    });
    rightBarDiv.appendChild(usersDiv);

    // Countdown:
    let countdownDiv = document.createElement("div");
    let dayUnit = "DAYS";
    if (task.daysToDeadline() === 1) {
        dayUnit = "DAY"
    }
    countdownDiv.innerText = appendLeadingZeroes(task.daysToDeadline());

    countdownDiv.classList.add("bigTaskCountdown");
    let dayUnitDiv = document.createElement("div");
    dayUnitDiv.classList.add("bigTaskCountdownUnit");
    dayUnitDiv.innerText = dayUnit;
    let chartDiv = document.createElement("div");
    countdownDiv.appendChild(dayUnitDiv);
    countdownDiv.appendChild(chartDiv)
    rightBarDiv.appendChild(countdownDiv);
    // Compose
    taskDiv.appendChild(rightBarDiv);
    buildChart(task, chartDiv);


    // Project:
    let projectDiv = document.createElement("div");
    projectDiv.classList.add("bigTaskProject");
    projectDiv.setAttribute("taskID", task.ID);
    projectDiv.innerText = task.getProject().title;
    taskDiv.appendChild(projectDiv);

    // Start date:
    let startDateDiv = document.createElement("div");
    startDateDiv.classList.add("bigTaskStartDate");
    startDateDiv.setAttribute("taskID", task.ID);
    startDateDiv.innerText = "Start: " + bigTaskDateRender(task.startDate);
    taskDiv.appendChild(startDateDiv);

    // End date:
    let endDateDiv = document.createElement("div");
    endDateDiv.classList.add("bigTaskEndDate");
    endDateDiv.setAttribute("taskID", task.ID);
    endDateDiv.innerText = "End: " + bigTaskDateRender(task.endDate);
    taskDiv.appendChild(endDateDiv);

   // bigTaskWrapper.appendChild(taskDiv);
    //let countdownDiv = document.createElement("div");
   // bigTaskWrapper.appendChild(countdownDiv);
    //buildChart(task, countdownDiv);

}

renderBigTask(Task.array[0]);
