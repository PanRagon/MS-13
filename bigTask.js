// UTILITY FUNCTIONS:
function bigTaskDateRender(date) {
    return appendLeadingZeroes(date.getDate()) + "." + appendLeadingZeroes(date.getMonth() + 1) + "." + date.getFullYear();
}

function renderBigTask(task) {

    let bigTaskWrapper = document.getElementById("renderContainer");
    bigTaskWrapper.innerHTML = "";

    let taskDiv = document.createElement("div");
    taskDiv.classList.add("bigTask");
    taskDiv.setAttribute("taskID", task.ID);
    bigTaskWrapper.appendChild(taskDiv);

    // Status:
    let statusDiv = document.createElement("select");
    statusDiv.classList.add("bigTaskStatus");
    statusDiv.setAttribute("taskID", task.ID);
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
    statusDiv.addEventListener("change", () => {
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

    // Compose
    statusDiv.appendChild(toDoOption);
    statusDiv.appendChild(inProgressOption);
    statusDiv.appendChild(doneOption);
    taskDiv.appendChild(statusDiv);

    // Priority:
    let priorityDiv = document.createElement("select");
    priorityDiv.classList.add("bigTaskPriority");
    priorityDiv.setAttribute("taskID", task.ID);
        // Create priority options
    let lowOption = document.createElement("option");
    lowOption.setAttribute("value", "1");
    lowOption.innerText = "Low priority";
    priorityDiv.appendChild(lowOption);
    let mediumOption = document.createElement("option");
    mediumOption.setAttribute("value", "2");
    mediumOption.innerText = "Medium priority";
    priorityDiv.appendChild(mediumOption);
    let highOption = document.createElement("option");
    highOption.setAttribute("value", "3");
    highOption.innerText = "High priority";
    priorityDiv.appendChild(highOption);
    if (task.priority === 1) {
        priorityDiv.classList.add("bigTaskPriorityLow");
        lowOption.setAttribute("selected", "");
    } else if (task.priority === 2) {
        priorityDiv.classList.add("bigTaskPriorityMedium");
        mediumOption.setAttribute("selected", "");
    } else if (task.priority === 3) {
        priorityDiv.classList.add("bigTaskPriorityHigh");
        highOption.setAttribute("selected", "");
    }
        // Update priority based on select
    priorityDiv.addEventListener("change", () => {
        if (priorityDiv.value === "1") {
            task.priority = 1;
            priorityDiv.classList.remove("bigTaskPriorityMedium", "bigTaskPriorityHigh");
            priorityDiv.classList.add("bigTaskPriorityLow");
        } else if (priorityDiv.value === "2") {
            task.priority = 2;
            priorityDiv.classList.remove("bigTaskPriorityLow", "bigTaskPriorityHigh");
            priorityDiv.classList.add("bigTaskPriorityMedium");
        } else if (priorityDiv.value === "3") {
            task.priority = 3;
            priorityDiv.classList.remove("bigTaskPriorityLow", "bigTaskPriorityMedium");
            priorityDiv.classList.add("bigTaskPriorityHigh");
        }
    });


    taskDiv.appendChild(priorityDiv);

    // Category:
    let categorySelect = document.createElement("select");
    categorySelect.classList.add("bigTaskCategory");
    categorySelect.classList.add("bigTaskCategory" + task.category.name);
    categorySelect.setAttribute("taskID", task.ID);
    // categoryDiv.innerText = task.category.name;

    TaskCategory.array.forEach(category => {
        let categoryOption = document.createElement("option");
        categoryOption.setAttribute("value", category.ID);
        categoryOption.innerText = category.name;
        categorySelect.appendChild(categoryOption);
    });
    categorySelect.addEventListener("change", () => {
        task.category = TaskCategory.array.find(category => category.ID === Number(categorySelect.value));
        categorySelect.className = "";
        categorySelect.classList.add("bigTaskCategory", "bigTaskCategory" + task.category.name);
    });

    taskDiv.appendChild(categorySelect);


    // Left bar:
    let leftBarDiv = document.createElement("div");
    leftBarDiv.classList.add("bigTaskLeftBar");
    // Title:
    let titleDiv = document.createElement("input");
    titleDiv.classList.add("bigTaskTitle");
    titleDiv.setAttribute("taskID", task.ID);
    titleDiv.setAttribute("type", "text");
    titleDiv.setAttribute("value", task.title);
    titleDiv.addEventListener("keyup", () => {
        task.title = titleDiv.value;
    });
    leftBarDiv.appendChild(titleDiv);

    // Description:
    let descriptionDiv = document.createElement("textarea");
    descriptionDiv.classList.add("bigTaskDescription");
    descriptionDiv.innerText = task.description;
    descriptionDiv.addEventListener("keyup", () => {
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
        let userID = owner.ID + " user";
        userDiv.classList.add("bigTaskUser");
        userDiv.id = userID;
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
        ownerDiv.addEventListener("click", () => {
            task.removeOwner(owner.ID);
            userDiv.parentElement.removeChild(userDiv);
        });
    });
    // Members:
    task.members.forEach(member => {
        let userDiv = document.createElement("div");
        let userID = member.ID + " user";
        userDiv.classList.add("bigTaskUser");
        userDiv.id = userID;
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
        memberDiv.addEventListener("click", () => {
            task.removeMember(member.ID);
            userDiv.parentElement.removeChild(userDiv);
        });
    });
    rightBarDiv.appendChild(usersDiv);

    // Countdown:
    let countdownDiv = document.createElement("div");
    countdownDiv.classList.add("bigTaskCountdown");
    let countdownDaysDiv = document.createElement("div");
    countdownDaysDiv.classList.add("bigTaskCountdownDaysUnit");

    let dayUnit = "DAYS";
    if (task.daysToDeadline() === 1) {dayUnit = "DAY"}
    let dayUnitDiv = document.createElement("div");
    dayUnitDiv.classList.add("bigTaskCountdownUnit");
    dayUnitDiv.innerText = dayUnit;

    let days = appendLeadingZeroes(task.daysToDeadline());
    let daysDiv = document.createElement("div");
    daysDiv.classList.add("bigTaskCountdownDays");
    daysDiv.innerText = days;

    countdownDaysDiv.appendChild(daysDiv);
    countdownDaysDiv.appendChild(dayUnitDiv);
    countdownDiv.appendChild(countdownDaysDiv);
    rightBarDiv.appendChild(countdownDiv);
    // Compose
    taskDiv.appendChild(rightBarDiv);

    let chartDiv = document.createElement("div");
    chartDiv.classList.add("bigTaskCountdownChart");
    countdownDiv.appendChild(chartDiv);
    buildChart(task, chartDiv);


    // Project:
    let project = Project.array.find(project => project.tasks.find(projectTask => projectTask.ID == task.ID));
    let projectDiv = document.createElement("div");
    projectDiv.classList.add("bigTaskProject");
    projectDiv.classList.add("pointer");
    projectDiv.setAttribute("taskID", task.ID);
    projectDiv.setAttribute("projectID", project.ID);
    projectDiv.innerText = task.getProject().title;
    projectDiv.addEventListener("click", () => {
        renderProjectView(project);
    });
    taskDiv.appendChild(projectDiv);

    // Start date:
    let startDateDiv = document.createElement("div");
    startDateDiv.classList.add("bigTaskStartDate");
    startDateDiv.setAttribute("taskID", task.ID);
    startDateDiv.innerText = "Start: " + bigTaskDateRender(task.startDate);
    taskDiv.appendChild(startDateDiv);

    let startDateEdit = document.createElement("input");
    startDateEdit.classList.add("bigTaskStartDate", "invisible");
    startDateEdit.setAttribute("TaskID", task.ID);
    startDateEdit.setAttribute("type", "date");
    taskDiv.appendChild(startDateEdit);
    startDateEdit.addEventListener("click", () => {
    startDateEdit.classList.remove("invisible");
    })

    // End date:
    let endDateDiv = document.createElement("div");
    endDateDiv.classList.add("bigTaskEndDate");
    endDateDiv.setAttribute("taskID", task.ID);
    endDateDiv.innerText = "End: " + bigTaskDateRender(task.endDate);
    taskDiv.appendChild(endDateDiv);
}
