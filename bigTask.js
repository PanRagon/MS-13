// UTILITY FUNCTIONS:
function bigTaskDateRender(date) {
    return appendLeadingZeroes(date.getDate()) + "." + appendLeadingZeroes(date.getMonth() +1) + "." + date.getFullYear() + " " + appendLeadingZeroes(date.getHours()) + ":" + appendLeadingZeroes(date.getMinutes());
}

function renderBigTask(task) {
    let bigTaskWrapper = document.getElementById("bigTaskContainer");
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("bigTask");
    taskDiv.setAttribute("taskID", task.ID);

    // Status:
    let statusDiv = document.createElement("div");
    statusDiv.classList.add("bigTaskStatus");
    statusDiv.setAttribute("taskID", task.ID);
    if (task.status.toLowerCase() === "todo") {
        statusDiv.classList.add("bigTaskStatusToDo");
    } else if (task.status.toLowerCase() === "inprogress") {
        statusDiv.classList.add("bigTaskStatusInProgress");
    } else if (task.status.toLowerCase() === "done") {
        statusDiv.classList.add("bigTaskStatusDone");
    } else {
        statusDiv.classList.add("bigTaskStatusUnknown");
    }
    statusDiv.innerText = task.status;
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
    let titleDiv = document.createElement("div");
    titleDiv.classList.add("bigTaskTitle");
    titleDiv.setAttribute("taskID", task.ID);
    titleDiv.innerText = task.title;
    leftBarDiv.appendChild(titleDiv);

    // Description:
    let descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("bigTaskDescription");
    descriptionDiv.setAttribute("taskID", task.ID);
    descriptionDiv.innerText = task.description;
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
        let ownerDiv = document.createElement("div");
        ownerDiv.classList.add("bigTaskUser");
        ownerDiv.classList.add("bigTaskOwner");
        ownerDiv.setAttribute("taskID", task.ID);
        ownerDiv.innerText = owner.shortName;
        usersDiv.appendChild(ownerDiv);
    });
    // Members:
    task.members.forEach(member => {
        let memberDiv = document.createElement("div");
        memberDiv.classList.add("bigTaskUser");
        memberDiv.classList.add("bigTaskMember");
        memberDiv.setAttribute("taskID", task.ID);
        memberDiv.innerText = member.shortName;
        usersDiv.appendChild(memberDiv);
    });
    rightBarDiv.appendChild(usersDiv);

    // Countdown:
    let countdownDiv = document.createElement("div");
    let dayUnit = "DAYS";
    if(task.daysToDeadline() === 1) {dayUnit = "DAY"}
    countdownDiv.classList.add("bigTaskCountdown");
    countdownDiv.innerText = appendLeadingZeroes(task.daysToDeadline());
    let dayUnitDiv = document.createElement("div");
    dayUnitDiv.classList.add("bigTaskCountdownUnit");
    dayUnitDiv.innerText = dayUnit;
    countdownDiv.appendChild(dayUnitDiv);
    rightBarDiv.appendChild(countdownDiv);
    // Compose
    taskDiv.appendChild(rightBarDiv);

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
    startDateDiv.innerText = bigTaskDateRender(task.startDate);
    taskDiv.appendChild(startDateDiv);

    // End date:
    let endDateDiv = document.createElement("div");
    endDateDiv.classList.add("bigTaskEndDate");
    endDateDiv.setAttribute("taskID", task.ID);
    endDateDiv.innerText = bigTaskDateRender(task.endDate);
    taskDiv.appendChild(endDateDiv);

    bigTaskWrapper.appendChild(taskDiv);

}

renderBigTask(Task.array[0]);
